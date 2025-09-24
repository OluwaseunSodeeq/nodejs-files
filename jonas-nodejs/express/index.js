import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import toursRouter from "./routes/tourRoutes.js";
import usersRouter from "./routes/userRoutes.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

// Re-create __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mount routers
app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on the server! `, 404));
});
app.use (globalErrorHandler)


export default app;
