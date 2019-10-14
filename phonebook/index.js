const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');

const Person = require('./models/person');

app.use(bodyParser.json());
const cors = require('cors');

app.use(cors());

const morgan = require('morgan');

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time :data'),
);

// let persons = [
//   {
//     name: 'Arto Hellas',
//     number: '040-123456',
//     id: 1,
//   },
//   {
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//     id: 2,
//   },
//   {
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//     id: 3,
//   },
//   {
//     name: 'Cesar Jimenez',
//     number: '44-44-4444',
//     id: 4,
//   },
//   {
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//     id: 5,
//   },
// ];

app.use(express.static('build'));

const errorMessage = {
  error: '',
  code: 0,
};

const now = new Date();

// Fetch home (could be a landing page)
app.get('/', (req, res) => {
  res.send('<h1>Hello!</h1>');
});

// Add a resource
app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON());
    })
    .catch(err => {
      console.log(err);
      return res.status(409).json({ error: 'duplicate names are not allowed' });
    });
});

// Fetch list of all resources
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

// Fetch a single resource
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

// Modify a resource
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

// Fetch info
app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people.</p><p>${now}</p>`,
  );
});

// Delete a resource
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

const unkownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unkownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformed id' });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
