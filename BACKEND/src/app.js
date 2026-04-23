const express = require("express");
const cors = require("cors");
const resepRoutes = require("./routes/resep.route");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/", resepRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Resep Makanan Nusantara aktif." });
});

module.exports = app;
