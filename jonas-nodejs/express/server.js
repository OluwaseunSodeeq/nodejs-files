import dotenv from "dotenv";
import app from "./index.js";
// Start server

dotenv.config({ path: "./config.env" });

// console.log(app.get("env"));
console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
