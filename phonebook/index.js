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

app.use(express.static('build'));

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Cesar Jimenez',
    number: '44-44-4444',
    id: 4,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 5,
  },
];

const errorMessage = {
  error: '',
  code: 0,
};

const now = new Date();

// Fetch home
app.get('/', (req, res) => {
  res.send('<h1>Hello!</h1>');
});

// Fetch list of all persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

// Fetch info
app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people.</p><p>${now}</p>`,
  );
});

// Fetch single resources
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person.toJSON());
  });
});

// Delete an entry
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);

  res.status(204).end();
});

// Add an entry
app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON());
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
