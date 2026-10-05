import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});
app.get('/api/students', (req, res) => {
});
app.get('/api/students/:id', (req, res) => {
});
app.post('/api/students/:id', (req, res) => {
});
app.put('/api/students/:id', (req, res) => {
});
app.delete('/api/students/:id', (req, res) => {
});
app.listen(PORT, () => {
  console.log(`Server running on port 3000`);
});

