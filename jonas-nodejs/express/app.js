const fs = require('fs');
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// app.get("/",(req, res) => {
//   res.status(200).json({message: "Hello, World!",app:"Natours"});
// });

// app.post("/", (req, res) => {
//   res.send({message: "Data POST successfully!"});
// });
const tours01  = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8');
const tours = JSON.parse(tours01);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
        tours: tours
    }
     });
});
// getting a single tour by ID
app.get("/api/v1/tours/:id", (req, res) => {
    const newId = Number(req.params.id) + 1;
    console.log(newId, tours.length);

    if (newId > tours.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid ID'
            });
    }
    res.status(200).json({
    status: 'success',

    data: {
        tour: tours.find(tour => tour.id === Number(req.params.id))
    }
    });
});

// Handling Post Request
app.post("/api/v1/tours", (req, res) => {
    const newId =  Number(tours.length + 1);
    console.log(newId,tours.length);

    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });

    // res.send("Data received successfully!");

    // const newTour = req.body;
    // tours.push(newTour);
    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    //     res.status(201).json({
    //         status: 'success',
    //         data: {
    //             tour: newTour
    //         }
    //     });
    // });
});


const port = 3000;
app.listen(port, () => {
  console.log('Server is running on port 3000');
});