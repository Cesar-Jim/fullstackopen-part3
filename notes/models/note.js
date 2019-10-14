const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const url = process.env.MONGODB_URI;

console.log(`Conecting to ${url}`);

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

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', noteSchema);
