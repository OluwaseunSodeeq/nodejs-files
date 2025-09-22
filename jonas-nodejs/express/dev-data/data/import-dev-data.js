import fs from "fs";
import Tour from "../../models/tourModel.js";

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful"));

//   READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(
    new URL("../data/tours-simple.json", import.meta.url),
    "utf-8"
  )
);

//   IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded");
    console.log(tours);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//  DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

console.log(process.argv);

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
