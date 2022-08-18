const express = require("express");
const morgan = require("morgan");
const usersRouter = require("./src/routes/usersRouter");
const walletRouter = require("./src/routes/walletRouter");
const swaggerRouter = require("./src/routes/swagger/index.js");
const { errorHandler } = require("./src/helpers/apiHelpes");
const { connectMongo } = require("./src/db/connection");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/users", usersRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/", swaggerRouter);

app.use(errorHandler);

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) console.error("Error at server laush", err);
      console.log(`Server works at port ${PORT}!`);
    });
  } catch (error) {
    console.error(`Failed to launch plication with error: ${error.message}`);
  }
};

start();

module.exports = { app };
