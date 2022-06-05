const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Note requires a user'],
  },
});

noteSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
