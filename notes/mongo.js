const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const uri = `mongodb+srv://cesar:${password}@cluster0-ihtyc.mongodb.net/test?retryWrites=true&w=majority`;
const options = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true
};

mongoose
  .connect(uri, options)
  .then(() => console.log("connected"))
  .catch(error => console.log(error));

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is Easy",
  date: new Date(),
  important: true
});

note.save().then(response => {
  console.log("note saved!");
  mongoose.connection.close();
});
