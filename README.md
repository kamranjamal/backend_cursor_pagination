🚀 API Testing Guidebook: Task Pagination API
This guide provides step-by-step instructions to test and verify all functionalities of the Node.js Task API.

1. Prerequisites Checklist
Before you begin, ensure you have completed the following setup:

[ ] Node.js & npm: Installed on your system.

[ ] MongoDB: Installed and running.

[ ] Project Ready: You have the project code and have run npm install.

[ ] Database Seeded: You have successfully run the seeder script with npm run seed. This populates the database with 30 tasks.

[ ] Server Running: The API server is running. Start it with npm run dev. You should see 🚀 Server running... in your terminal.

2. Tools for Testing
You can use any API client, but we'll focus on these two popular options.

Postman: A powerful and easy-to-use GUI for API testing. Recommended for a visual experience.



All test requests will be GET requests to the base URL: http://localhost:3000/api/tasks

3. Testing Scenarios
Follow these scenarios in order to test each feature systematically.

Scenario 1: Basic Fetch (First Page)
Objective: Get the first page of tasks using the default limit.

What This Verifies: The API is running, the default limit of 10 works, and the response shape { items, nextCursor } is correct.

How to Test:

Postman:

Create a new GET request.

Enter the URL: http://localhost:3000/api/tasks

Click "Send".

cURL:

curl "http://localhost:3000/api/tasks"

✅ Expected Result:
You will receive a JSON object containing:

An items array with 10 task objects.

A nextCursor string (e.g., "60d..."). Copy this cursor value for the next test.

Scenario 2: Pagination (Fetching the Second Page)
Objective: Use the cursor from the previous request to fetch the next set of tasks.

What This Verifies: The core cursor pagination logic is working correctly.

How to Test:

Postman:

In the "Params" tab, add a key cursor.

Paste the nextCursor value you copied from Scenario 1 into the value field.

The URL will update to: http://localhost:3000/api/tasks?cursor=<YOUR_CURSOR_VALUE>

Click "Send".

cURL:

# Replace <YOUR_CURSOR_VALUE> with the actual cursor
curl "http://localhost:3000/api/tasks?cursor=<YOUR_CURSOR_VALUE>"

✅ Expected Result:

An items array with the next 10 task objects. These should be different from the first 10.

A new nextCursor value.

Scenario 3: Filtering by Status
Objective: Fetch only tasks that have a specific status (e.g., "done").

What This Verifies: The status query parameter is filtering the results correctly.

How to Test:

Postman:

Add a query parameter: status with a value of done.

URL: http://localhost:3000/api/tasks?status=done

Click "Send".

cURL:

curl "http://localhost:3000/api/tasks?status=done"

✅ Expected Result:

An items array where every task object has "status": "done".

The number of items will be 10 (since our seed data has 10 tasks for each status).

Scenario 4: Combining Limit and Filtering
Objective: Test multiple query parameters at once.

What This Verifies: The logic can handle combined filtering and custom limits.

How to Test:

Postman:

Add a query parameter: limit with a value of 4.

Add a query parameter: status with a value of todo.

URL: http://localhost:3000/api/tasks?limit=4&status=todo

Click "Send".

cURL:

curl "http://localhost:3000/api/tasks?limit=4&status=todo"

✅ Expected Result:

An items array with exactly 4 task objects.

Each task object must have "status": "todo".

A nextCursor value to get the next page of "todo" tasks.

Scenario 5: Reaching the End of Data
Objective: Verify that the API correctly indicates when there are no more results.

What This Verifies: The nextCursor becomes null on the last page.

How to Test:

Perform a request that gets you to the last page. With 30 seeded items and a limit of 10, the third page is the last one.

Use the cursor from your second request (Scenario 2) to fetch the third page.

✅ Expected Result:

An items array with the final 10 tasks.

The nextCursor property will have a value of null.

Scenario 6: Input Validation (Testing for Errors)
Objective: Ensure the API rejects invalid input and returns a 400 Bad Request error.

What This Verifies: The express-validator middleware is working as expected.

Test A: Limit Too High

URL: http://localhost:3000/api/tasks?limit=101

✅ Expected: A 400 status code and a JSON error message like: "Limit must be an integer between 1 and 50."

Test B: Invalid Status

URL: http://localhost:3000/api/tasks?status=pending

✅ Expected: A 400 status code and a JSON error message like: "Status must be one of: todo, doing, done."

Test C: Invalid Cursor

URL: http://localhost:3000/api/tasks?cursor=not-a-real-id

✅ Expected: A 400 status code and a JSON error message like: "Cursor must be a valid MongoDB ObjectId."

You have now successfully tested every requirement of the task!
