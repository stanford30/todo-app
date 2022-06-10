const express = require('express');
const noteController = require('../controllers/noteController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.post('/', noteController.createNote);
router.get('/', noteController.getAllNotes);
router.patch('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.get('/:id', noteController.getNote);

module.exports = router;
