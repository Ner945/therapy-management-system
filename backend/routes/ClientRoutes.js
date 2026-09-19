const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');

// GET all clients
router.get('/', clientController.getAllClients);
// GET client by id
router.get('/:id', clientController.getClientById);
// POST create a client
router.post('/', clientController.createClient);
// PUT update a client
router.put('/:id', clientController.updateClient);
// DELETE a client
router.delete('/:id', clientController.deleteClient);

module.exports = router;
