import { Cost } from '../models/cost.js';

/**
 * Retrieves all cost entries
 */
const getCosts = async (req, res) => {
  try {
    const costs = await Cost.find();
    res.json(costs);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

/**
 * Adds a new cost entry
 */
const addCost = async (req, res) => {
  try {
    let { description, category, userid, sum, createdAt } = req.body;

    if (!description || !category || !userid || sum === undefined) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newCost = new Cost({ 
      description, 
      category, 
      userid, 
      sum, 
      createdAt: createdAt ? new Date(createdAt) : new Date() // Default to current date if not provided
    });

    await newCost.save();
    res.status(201).json(newCost);
  } catch (error) {
    res.status(500).json({ message: 'Error adding cost item: ' + error.message });
  }
};

/**
 * Generates a monthly cost report for a given user
 */
const getMonthlyReport = async (req, res) => {
  const { id, year, month } = req.query;
  if (!id || !year || !month) {
    return res.status(400).json({ error: "Please provide id, year, and month." });
  }

  try {
    const costs = await Cost.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ["$userid", parseInt(id)] },
              { $eq: [{ $year: "$createdAt" }, parseInt(year)] },
              { $eq: [{ $month: "$createdAt" }, parseInt(month)] }
            ]
          }
        }
      },
      {
        $group: {
          _id: "$category",
          costs: {
            $push: {
              sum: "$sum",
              description: "$description",
              day: { $dayOfMonth: "$createdAt" }
            }
          }
        }
      }
    ]);

    const categories = ["food", "education", "health", "housing"];
    const report = {};

    categories.forEach(category => {
      report[category] = [];
    });

    costs.forEach(cost => {
      report[cost._id] = cost.costs;
    });

    return res.json({
      userid: id,
      year,
      month,
      costs: Object.entries(report).map(([category, items]) => ({
        [category]: items
      }))
    });

  } catch (error) {
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};


export default { getCosts, addCost, getMonthlyReport };
