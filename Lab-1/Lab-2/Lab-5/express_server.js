
import express from "express";

const app = express();

app.use(express.json());

const userdata = [
  {
    id: 1,
    name: "cm",
    email: "c.m@abes.ac.in"
  }
];

// GET message
app.get("/msg", (req, res) => {
  res.status(200).json({
    message: "Welcome user"
  });
});

// GET all users
app.get("/user", (req, res) => {
  res.status(200).json({
    message: "Data received",
    userdata
  });
});

// POST create user
app.post("/create", (req, res) => {
  try {
    const { id, name, email } = req.body;

    const newuser = {
      id,
      name,
      email
    };

    userdata.push(newuser);

    res.status(201).json({
      message: "User created successfully",
      newuser
    });
  } catch (err) {
    console.error("Error:", err.message);

    res.status(500).json({
      message: "Internal server error"
    });
  }
});

// PUT edit user
app.put("/edit/:id", (req, res) => {
  const id = req.params.id;

  const index = userdata.findIndex((u) => u.id == id);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const { name, email } = req.body;

  userdata[index] = {
    id: userdata[index].id,
    name,
    email
  };

  res.status(200).json({
    message: "User updated successfully",
    user: userdata[index]
  });
});

// Start server
app.listen(4005, () => {
  console.log("Server is running on port 4005");
});