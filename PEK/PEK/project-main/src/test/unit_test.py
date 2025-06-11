import unittest
import requests

BASE_URL = "http://localhost:5000/"

class TestCostManagerAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # יצירת משתמש לפני כל הטסטים
        payload = {
            "id": 999999,
            "first_name": "Test",
            "last_name": "User",
            "birthday": "1995-05-05",
            "marital_status": "single"
        }
        response = requests.post(f"{BASE_URL}/api/users", json=payload)
        print("setUpClass - create user status:", response.status_code)
        print("setUpClass - response:", response.text)

    # === USER ROUTER TESTS ===

    def test_get_user(self):
        response = requests.get(f"{BASE_URL}/api/users/999999")
        print("test_get_user:", response.status_code, response.text)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["id"], 999999)

    def test_get_nonexistent_user(self):
        response = requests.get(f"{BASE_URL}/api/users/123456789")
        print("test_get_nonexistent_user:", response.status_code, response.text)
        self.assertEqual(response.status_code, 404)

    # === COST ROUTER TESTS ===

    def test_add_cost(self):
        payload = {
            "userid": 999999,
            "description": "unit test milk",
            "category": "food",
            "sum": 15,
            "createdAt": "2025-06-10T12:00:00.000Z"
        }
        response = requests.post(f"{BASE_URL}/api/costs/add", json=payload)
        print("test_add_cost:", response.status_code, response.text)
        self.assertEqual(response.status_code, 201)
        self.assertIn("_id", response.json())

    def test_add_cost_missing_field(self):
        payload = {
            "userid": 999999,
            "description": "missing sum",
            "category": "food",
            "createdAt": "2025-06-10T12:00:00.000Z"
        }
        response = requests.post(f"{BASE_URL}/api/costs/add", json=payload)
        print("test_add_cost_missing_field:", response.status_code, response.text)
        self.assertEqual(response.status_code, 400)

    def test_get_costs_by_user(self):
        response = requests.get(f"{BASE_URL}/api/costs/999999")
        print("test_get_costs_by_user:", response.status_code, response.text)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        if data:
            self.assertEqual(data[0]["userid"], 999999)

    def test_get_report(self):
        response = requests.get(f"{BASE_URL}/api/report?id=999999&year=2025&month=6")
        print("test_get_report:", response.status_code, response.text)
        self.assertEqual(response.status_code, 200)
        self.assertIn("userid", response.json())
        self.assertEqual(response.json()["userid"], "999999")

    # === GENERAL ===

    def test_about_endpoint(self):
        response = requests.get(f"{BASE_URL}/api/about")
        print("test_about_endpoint:", response.status_code)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

if __name__ == "__main__":
    unittest.main()
