import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import toursRouter from "./routes/tourRoutes.js";
import usersRouter from "./routes/userRoutes.js";

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
  console.log("Middleware is running ✔");
  next();
});

// Mount routers
app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);

export default app;


// import express from "express";
// import morgan from "morgan";
// import toursRouter from "./routes/tourRoutes.js";
// import usersRouter from "./routes/userRoutes.js";

// const app = express();

// // Middleware
// app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   console.log("Middleware is running ✔");
//   next();
// });

// // Mount routers
// app.use("/api/v1/tours", toursRouter);
// app.use("/api/v1/users", usersRouter);

// export default app;
