const db = require('../db');

// get all clients
exports.getAllClients = (req, res) => {
  const query = 'SELECT * FROM clients';
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching clients:", err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};

// get client by ID
exports.getClientById = (req, res) => {
  const query = 'SELECT * FROM clients WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("Error fetching client:", err);
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(results[0]);
  });
};

// make new client
exports.createClient = (req, res) => {
  const { name, email, phone_number, regularity } = req.body;
  const query = 'INSERT INTO clients (name, email, phone_number, regularity) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, phone_number, regularity], (err, result) => {
    if (err) {
      console.error("Error creating client:", err);
      return res.status(500).json({ error: err });
    }
    res.status(201).json({
      id: result.insertId,
      name,
      email,
      phone_number,
      regularity
    });
  });
};

// update client
exports.updateClient = (req, res) => {
  const { name, email, phone_number, regularity } = req.body;
  const query = 'UPDATE clients SET name = ?, email = ?, phone_number = ?, regularity = ? WHERE id = ?';
  db.query(query, [name, email, phone_number, regularity, req.params.id], (err, result) => {
    if (err) {
      console.error("Error updating client:", err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json({ message: "Client updated successfully" });
  });
};

// delete client
exports.deleteClient = (req, res) => {
  const query = 'DELETE FROM clients WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error("Error deleting client:", err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json({ message: "Client deleted successfully" });
  });
};
