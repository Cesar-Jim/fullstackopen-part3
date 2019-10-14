const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

console.log(`Connecting to ${url}`);

mongoose.set('useFindAndModify', false);

const options = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(url, options)
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB: ', error.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: String, required: true },
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
