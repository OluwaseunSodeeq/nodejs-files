// ES6 Module Syntax
import Tour from "../models/tourModel.js";
import APIFeatures from "../utils/apiFeatures.js";

const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

// Read the tours data file using URL(Locally)
// const tours01 = readFileSync(
//   new URL("../dev-data/data/tours-simple.json", import.meta.url),
//   "utf-8"
// );
// const tours = JSON.parse(tours01);

// ALL THE CRUD OPERATION FUNCTIONS (ROUTES HANDLERS)

const getAllTours = async (req, res) => {
  try {
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));

    // 4) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 5) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error("This page does not exist");
    }

    // 6) Execute the query
    // const allTours = await query;
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    const allTours = await features.query;

    res.status(200).json({
      status: "success",
      results: allTours.length,
      data: { tours: allTours },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getTourById = async (req, res) => {
  const newId = req.params.id;
  try {
    const tour = await Tour.findById(newId);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
  // const tour = tours.find((tour) => tour.id === id);

  // if (!tour) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "Tour not found",
  //   });
  // }

  // const updatedTour = Object.assign(tour, req.body);

  // writeFile(
  //   new URL("../dev-data/data/tours-simple.json", import.meta.url),
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(200).json({
  //       status: "success",
  //       data: { tour: updatedTour },
  //     });
  //   }
  // );
};

const deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTour = await Tour.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }

  // const tourIndex = tours.findIndex((tour) => tour.id === id);

  // if (tourIndex === -1) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "Tour not found",
  //   });
  // }

  // tours.splice(tourIndex, 1);

  // writeFile(
  //   new URL("../dev-data/data/tours-simple.json", import.meta.url),
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(204).json({
  //       status: "success",
  //       data: null,
  //     });
  //   }
  // );
};

// const checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//     });
//   }
//   next();
// };

// To validate the body
// const checkBody = (res, req, next) => {
//   if (req.body.name || req.body.price) {
//     return res.status(400).json({
//       status: "fail",
//       message: "Missing name or price",
//     });
//   }
//   next();
// };

export {
  getTourById,
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
};
