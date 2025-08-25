import express from "express";
import morgan from "morgan";
import toursRouter from "./routes/tourRoutes.js";
import usersRouter from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("Middleware is running ✔");
  next();
});

// Mount routers
app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);

export default app;
