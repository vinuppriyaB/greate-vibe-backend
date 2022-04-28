const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./connection.js");
const movieRouter = require("./routes/MovieRoute.js");
const userRouter = require("./routes/userRoute.js");

const app = express();

app.use(express.json({ limit: "50mb" }));
dotenv.config();
connectDB();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api/movie", movieRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`server start at ${PORT}`);
});
