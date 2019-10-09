const mongoose = require('mongoose');

console.log('\n== WELCOME to the PhoneBook app! ==\n');

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const nameSpace = 'phonebook-app';

const url = `mongodb+srv://cesar:${password}@cluster0-ihtyc.mongodb.net/${nameSpace}?retryWrites=true&w=majority`;
const options = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true
};

mongoose.connect(url, options);

// Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

// Model
const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: name,
  number: number
});

// Save a new item in a collection:
const saveData = item => {
  item.save().then(response => {
    console.log(`Added ${name} number ${number} to phonebook.`);
    mongoose.connection.close();
  });
};

// Fetch persons from the persons collection:
const fetchData = model => {
  model.find().then(result => {
    result.forEach(note => {
      console.log(note);
    });

    mongoose.connection.close();
  });
};

if (process.argv.length < 3 || process.argv.length > 5) {
  console.log(
    'Remember: \na) Add the password to retrieve all phonebook data. \nOR\nb) Add a new record by typing: node mongo.js <thePassword> "John Doe" 11-11-111 to add a new record.\n\nTERMINATING PROGRAM...'
  );
  process.exit(1);
}

if (process.argv.length === 3) {
  console.log(
    'To add a new record please type: "node mongo.js <password> <name> <number>"\n\nFETCHING DATA...\n\n'
  );

  fetchData(Person);
}

if (process.argv.length === 5) {
  saveData(person);
}
