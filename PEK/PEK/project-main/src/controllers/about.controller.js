/**
 * Controller function to retrieve team details
 */
export const getAbout = async (req, res) => {
  try {
    // Static team members data
    const team = [
      { first_name: "Eden", last_name: "Dzanashvili" },
      { first_name: "Karina", last_name: "Haimov" }
    ];
    
    res.json(team); // Send response with team details
  } catch (error) {
    res.status(500).json({ error: "Server error" }); // Handle server error
  }
};