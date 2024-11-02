// SIMPLE API WITH NODE.JS 

// Initialize Express Server
const express = require("express");
const app = express();

// Specify a PORT
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// In-memory list of users (for demonstration)
let users = [
  { id: 1, name: "John Smilga", email: "john_s@yahoo.com" },
  { id: 2, name: "Brad Traversey", email: "brad_t@hotmail.com" },
];

// Root route: Displays a welcome message
app.get("/", (request, response) => {
  response.send("WELCOME TO THE SIMPLE NODE.JS API");
});

// APIs
// GET /users: Returns a list of users in JSON format
app.get("/users", (request, response) => {
  response.json(users);
});

// POST /users: Add a new user to the List
app.post("/users", (request, response) => {
  const { name, email } = request.body;

  //Error handling for invalid input
  if (!name || !email) {
    return response
      .status(400)
      .json({ error: "Name and Email are both required" });
  }

  // Create a new user object
  const newUser = {
    id: users.length + 1,
    name: name,
    email: email,
  };

  // Add the new user to the List
  users.push(newUser);

  // Respond with the added user
  app.use((request, response) => {
    response.status(201).json(newUser);
  });
});

// Handle 404(Not Found) routes
app.use((request, response) => {
  response.status(404).json({ error: "Not Found" });
});

//Start the server
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});

/****** 
A BRIEF CODE SUMMARY 

1. Setup and Configuration:
    a. Creates an Express app and sets up middleware to parse JSON requests.
    b. Defines an in-memory list of users.

2. Endpoints:
    a. Root (/): Returns a welcome message.
    b. GET /users: Responds with the list of users in JSON format.
    c. POST /users: Adds a new user to the list if name and email are provided in the equest body; returns an error otherwise.

3. Error Handling:
    a. Returns a 400 error if name or email is missing in the POST request.
    b. Catches unmatched routes and responds with a 404 error.

4. Start Server:
    a. Starts the server on localhost:3000.
    b. This setup creates a basic API with simple data handling and error responses for common issues.

******/
