// ES6 Module Syntax
import { readFileSync, writeFile } from "fs";
import express from "express";
import morgan from "morgan";
const app = express();

// MIDDLEWARE THIRD PARTY
app.use(morgan("dev"));

// Creating our Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  console.log("Middleware is running ✔ ");
  next();
});

//////////////////////////////////////////////////////
//////////TOURS ROUTES HANDLERS///////////////////////
// ///////////////////////////////////////////////////

const tours01 = readFileSync(
  `${__dirname}/dev-data/data/tours-simple.json`,
  "utf-8"
);
const tours = JSON.parse(tours01);

// ALL THE CRUD OPERATION FUNCTIONS (ROUTES HANDLERS)
function getAllTours(req, res) {
  console.log(req.requestTime);
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

  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  writeFile(
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
  writeFile(
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
  writeFile(
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

// ROUTES DEFINITION
// Handling  getting all tours and creating a tour
app.route("/api/v1/tours").get(getAllTours).post(createTour);

// Handling Get Request for getting a tour by ID and updating a tour
app
  .route("/api/v1/tours/:id")
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

//////////////////////////////////////////////////////
//////////USERS ROUTES HANDLERS///////////////////////
// ///////////////////////////////////////////////////

// USERS DATA
const users = JSON.parse(
  readFileSync(`${__dirname}/dev-data/data/users.json`, "utf-8")
);

// ROUTES HANDLERS
function getAllUsers(req, res) {
  res.status(200).json({
    status: "success",
    data: {
      users: [...users], // Placeholder for user data
    },
  });
}
function getUserById(req, res) {
  res.status(200).json({
    status: "success",
    data: {
      user: { name: "Oluwaseun Sodeeq" },
    },
  });
}
function createUser(req, res) {
  res.status(201).json({
    status: "success",
    data: {
      user: req.body,
    },
  });
}
function updateUser(req, res) {
  res.status(200).json({
    status: "success",
    data: {
      user: Object.assign({}, req.body),
    },
  });
}
function deleteUser(req, res) {
  res.status(204).json({
    status: "success",
    data: null,
  });
}

// ROUTES DEFINITION
app.route("/api/v1/users").get(getAllUsers).post(createUser);
app
  .route("/api/v1/users/:id")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

// Starting the server
const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
