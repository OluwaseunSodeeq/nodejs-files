import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import app from "./index.js";
// Start server


const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"));

// mongoose.connect(DB,
//   { useNewUrlParser:true, useCreateIndex:true, useFindAndModify:false})
//   .then(() => console.log("DB connection successful"));

// // Use to describe and validate tourSchema
// const tourSchema =  new mongoose.Schema({
//   name: {type: String,
//     required: [true,"A tour must have a name"],},
//     unique: true,
//     rating: {Number, default: 4.5},
//     price: {type:Number, required: [true,"A tour must have a price"]},
// })
// const Tour = mongoose.model("Tour", tourSchema);

// testTour.save().then(doc => {
//   console.log(doc);
// }).catch(err => {
//   console.log("Error: ", err);
// });

// console.log(app.get("env"));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

// BEFORE ADDINF MONGO AND MONGOOSE

// import dotenv from "dotenv";
// import app from "./index.js";
// // Start server

// dotenv.config({ path: "./config.env" });

// // console.log(app.get("env"));
// console.log(process.env);
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log("Server is running on port 3000");
// });
