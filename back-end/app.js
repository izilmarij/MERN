const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors("*"));

app.use("/app/v1", cors(), userRouter);
// app.use('/', userRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Invalid URL",
  });
});

app.use(globalErrorHandler);

module.exports = app;
