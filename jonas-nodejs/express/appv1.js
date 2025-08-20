const fs = require("fs");
const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// app.get("/",(req, res) => {
//   res.status(200).json({message: "Hello, World!",app:"Natours"});
// });

// app.post("/", (req, res) => {
//   res.send({message: "Data POST successfully!"});
// });
const tours01 = fs.readFileSync(
  `${__dirname}/dev-data/data/tours-simple.json`,
  "utf-8"
);
const tours = JSON.parse(tours01);

// ALL THE CRUD OPERATION FUNCTIONS
function getAllTours(req, res) {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
}
function getTourById(req, res) {
  const newId = Number(req.params.id) + 1;
  console.log(newId, tours.length);

  if (newId > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",

    data: {
      tour: tours.find((tour) => tour.id === Number(req.params.id)),
    },
  });
}
function createTour(req, res) {
  const newId = Number(tours.length + 1);
  console.log(newId, tours.length);

  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );

  // res.send("Data received successfully!");
}
function updateTour(req, res) {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found",
    });
  }

  const updatedTour = Object.assign(tour, req.body);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          tour: updatedTour,
        },
      });
    }
  );
}
function deleteTour(req, res) {
  const id = Number(req.params.id);

  const tourIndex = tours.findIndex((tour) => tour.id === id);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found",
    });
  }
  tours.splice(tourIndex, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
}

// Handling Get Request for getting all tours
app.get("/api/v1/tours", getAllTours);
// Handling Post Request(Creating Tour
app.post("/api/v1/tours", createTour);
// getting a single tour by ID
app.get("/api/v1/tours/:id", getTourById);
// Handling Patch Request for updating a tour
app.patch("/api/v1/tours/:id", updateTour);
// Handling Delete Request for deleting a tour
app.delete("/api/v1/tours/:id", deleteTour);

// Starting the server
const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
