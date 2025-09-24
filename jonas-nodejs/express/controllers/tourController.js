// ES6 Module Syntax
import Tour from "../models/tourModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

// ALL THE CRUD OPERATION FUNCTIONS (ROUTES HANDLERS)

const getAllTours = catchAsync(async (req, res, next) => {
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
});

const getTourById = catchAsync(async (req, res, next) => {
  const newId = req.params.id;
  const tour = await Tour.findById(newId);

  if (!tour) {
    next(new AppError("No tour  found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

const createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: "success",
    data: { tour: newTour },
  });
});

const updateTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tour.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: { tour },
  });


});

const deleteTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deletedTour = await Tour.findByIdAndDelete(id);

  if (!deleteTour) {
    next(new AppError("No tour  found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgratings: { $avg: "$ratingsAverage" },
        avgprice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // We can have multiples stages
    // { $match: { _id: { $ne: "Easy" } } },
  ]);

  res.status(200).json({
    status: "success",
    data: { stats },
  });
});

const getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { month: "$startDates" },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    { $addFields: { month: "$_id" } },
    {
      $project: {
        _id: 0,
      },
    },
    { $sort: { numTourStarts: -1 } },
    {
      $limit: 6,
    },
  ]);
  res.status(200).json({
    status: "success",
    data: { plan },
  });
});

export {
  getTourById,
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
};
