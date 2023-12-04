import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectMongoDB } from "./src/config/dbConfig.js";

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectMongoDB();

// routers
import userRouter from "./src/router/userRouter.js";
app.use("/api/v1/user", userRouter);

import factsRouter from "./src/router/factsRouter.js";
app.use("/api/v1/fact", factsRouter);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "server is running well!",
  });
});

// error handling
app.use((error, req, res, next) => {
  const errorCode = error.errorCode || 500;

  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});
