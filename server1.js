import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [];

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) res.json({ msg: "Login successful", token: "dummy-jwt-token" });
  else res.status(400).json({ msg: "Invalid credentials" });
});

// Register
app.post("/api/register", (req, res) => {
  const { fullname, email, password } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).json({ msg: "User already exists" });
  users.push({ fullname, email, password });
  res.json({ msg: "User registered successfully" });
});

// Home API
app.get("/api/home", (req, res) => {
  res.json({ msg: "Welcome to ShopEase Home Page" });
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
