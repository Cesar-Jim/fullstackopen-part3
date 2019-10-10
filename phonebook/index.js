const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const morgan = require('morgan');
const cors = require('cors');

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(bodyParser.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time :data'),
);
app.use(cors());
app.use(express.static('build'));

// DB related code
const url =
  'mongodb+srv://cesar:soccer002@cluster0-ihtyc.mongodb.net/phonebook-app?retryWrites=true&w=majority';
const options = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(url, options);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// End of DB related code

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
    res.json(persons);
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
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }

  res.json(person);
});

// Delete an entry
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);

  res.status(204).end();
});

// Add an entry
app.post('/api/persons', (req, res) => {
  const newName = req.body.name;
  const newNumber = req.body.number;
  const nameExists = persons.find(p => p.name === newName) ? true : false;

  if (nameExists) {
    // Error handling if name already exists. Error code 422 is thrown...
    errorMessage.code = 422;
    errorMessage.error = 'Unprocessable entity. Duplicate data.';
    console.log(errorMessage);

    return res.status(422).end();
  } else if (newName === '' || newNumber === '') {
    // Error handling if name or number fields are empty. Error code 422 is thrown...
    errorMessage.code = 422;
    errorMessage.error =
      'Unprocessable entity. Empty fields are not acceptable.';
    console.log(errorMessage);

    return res.status(422).end();
  } else {
    // Successful data processing
    const person = req.body;

    person.id = Math.floor(Math.random() * 1000);
    persons = persons.concat(person);
    res.json(person);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
