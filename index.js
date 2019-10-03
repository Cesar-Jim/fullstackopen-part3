const express = require("express");
const app = express();

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Cesar Jimenez",
    number: "44-44-4444",
    id: 4
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 5
  }
];

const now = new Date();

// Fetch home
app.get("/", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

// Fetch list of all persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// Fetch info
app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people.</p><p>${now}</p>`
  );
});

// Fetch single resources
app.get("/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
