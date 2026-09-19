const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/SessionController');

// GET all sessions
router.get('/', sessionController.getAllSessions);
// GET session by id
router.get('/:id', sessionController.getSessionById);
// POST create a session
router.post('/', sessionController.createSession);
// PUT update a session
router.put('/:id', sessionController.updateSession);
// DELETE a session
router.delete('/:id', sessionController.deleteSession);

module.exports = router;
