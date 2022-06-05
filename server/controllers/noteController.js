const Note = require('../models/noteModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createNote = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;

  const note = await Note.create(req.body);

  res.status(201).json({
    status: 'success',
    note,
  });
});

exports.getAllNotes = catchAsync(async (req, res, next) => {
  const notes = await Note.find();

  res.status(200).json({
    status: 'success',
    notes,
  });
});

exports.updateNote = catchAsync(async (req, res, next) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (note.user.id !== req.user.id) {
    return next(
      new AppError('You do not have permission to edit this note', 403)
    );
  }

  if (!note) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    note,
  });
});
exports.deleteNote = catchAsync(async (req, res, next) => {
  await Note.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.getNote = catchAsync(async (req, res, next) => {});
