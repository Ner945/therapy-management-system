const express = require('express');
const router = express.Router();
const therapistController = require('../controllers/TherapistController');

// GET all therapists
router.get('/', therapistController.getAllTherapists);
// GET therapist by id
router.get('/:id', therapistController.getTherapistById);
// POST create a therapist
router.post('/', therapistController.createTherapist);
// PUT update a therapist
router.put('/:id', therapistController.updateTherapist);
// DELETE a therapist
router.delete('/:id', therapistController.deleteTherapist);

module.exports = router;
