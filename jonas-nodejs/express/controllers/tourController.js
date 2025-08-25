// ES6 Module Syntax
import { readFileSync, writeFile } from "fs";

// Read the tours data file using URL
const tours01 = readFileSync(
  new URL("../dev-data/data/tours-simple.json", import.meta.url),
  "utf-8"
);

const tours = JSON.parse(tours01);

// ALL THE CRUD OPERATION FUNCTIONS (ROUTES HANDLERS)
function getAllTours(req, res) {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
}

function getTourById(req, res) {
  const newId = Number(req.params.id) + 1;
  console.log(newId, tours.length);

  // if (newId > tours.length) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "Invalid ID",
  //   });
  // }

  res.status(200).json({
    status: "success",
    data: {
      tour: tours.find((tour) => tour.id === Number(req.params.id)),
    },
  });
}

function createTour(req, res) {
  const newId = tours.length + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  writeFile(
    new URL("../dev-data/data/tours-simple.json", import.meta.url),
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: { tour: newTour },
      });
    }
  );
}

function updateTour(req, res) {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);

  // if (!tour) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "Tour not found",
  //   });
  // }

  const updatedTour = Object.assign(tour, req.body);

  writeFile(
    new URL("../dev-data/data/tours-simple.json", import.meta.url),
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        data: { tour: updatedTour },
      });
    }
  );
}

function deleteTour(req, res) {
  const id = Number(req.params.id);
  const tourIndex = tours.findIndex((tour) => tour.id === id);

  // if (tourIndex === -1) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "Tour not found",
  //   });
  // }

  tours.splice(tourIndex, 1);

  writeFile(
    new URL("../dev-data/data/tours-simple.json", import.meta.url),
    JSON.stringify(tours),
    (err) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
}

const checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

const checkBody = (res, req, next) => {
  if (req.body.name || req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};

export {
  getTourById,
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
};
