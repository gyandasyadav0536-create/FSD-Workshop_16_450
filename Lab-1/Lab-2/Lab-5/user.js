import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/users", (req, res) => {
  const { id, name, email } = req.body;

  console.log("ID:", id);
  console.log("Name:", name);
  console.log("Email:", email);

  res.json({
    message: "User received successfully",
    user: {
      id,
      name,
      email,
    },
  });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});