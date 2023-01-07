const fs = require('fs');
const express = require("express");
const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello From server side', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You Post was Sauccesful');
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
// Get All Tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  })
})

//Get Single Tour
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el => el.id === id));
  // if (id >= tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id'
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  })
})


//Create New Tours
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      }
    })
  })
})

// Updating tours
app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id'
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour Here....>'
    }
  })
})

// Deleteing tours
app.delete('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id'
    })
  }
  res.status(204).json({
    status: 'success',
    data: null
  })
})

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
})

