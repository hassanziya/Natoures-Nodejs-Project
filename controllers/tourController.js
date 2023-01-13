const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req, res, next) => {
  console.log('checking Body');
  if (!req.body || !req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please Enter Name and Price Of Tour',
    });
  }
  next();
};

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  const id = req.params.id * 1;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  next();
};

// Get All Tours
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

//Get Single Tour
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  // if (id >= tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

//Create New Tours
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// Updating tours
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour Here....>',
    },
  });
};

// Deleteing tours
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
