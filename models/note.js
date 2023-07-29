const mongoose = require("mongoose");

const noteScheme = mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 5,
  },
  important: Boolean,
});

mongoose.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.date;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("Note", noteScheme);

module.exports = Note;
