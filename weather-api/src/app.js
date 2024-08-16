const express = require("express");
const cors = require("cors");
require("dotenv").config();
const weatherRoutes = require("./routes/weatherRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Authentication Routes
app.use("api/auth", authRoutes.router);

// Weather Routes (Protected)
app.use("/api/weather", authRoutes.authenticateToken, weatherRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
