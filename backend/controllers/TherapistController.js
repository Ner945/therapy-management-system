const db = require('../db');

// get all therapists
exports.getAllTherapists = (req, res) => {
  const query = 'SELECT * FROM therapists';
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching therapists:", err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};

// get therapist by ID
exports.getTherapistById = (req, res) => {
  const query = 'SELECT * FROM therapists WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("Error fetching therapist:", err);
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Therapist not found" });
    }
    res.json(results[0]);
  });
};

// create therapist
exports.createTherapist = (req, res) => {
  const { title, name, email, location, years_of_practice, availability } = req.body;
  const query = 'INSERT INTO therapists (title, name, email, location, years_of_practice, availability) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [title, name, email, location, years_of_practice, availability], (err, result) => {
    if (err) {
      console.error("Error creating therapist:", err);
      return res.status(500).json({ error: err });
    }
    res.status(201).json({
      id: result.insertId,
      title,
      name,
      email,
      location,
      years_of_practice,
      availability
    });
  });
};

// update therapist
exports.updateTherapist = (req, res) => {
  const { title, name, email, location, years_of_practice, availability } = req.body;
  const query = 'UPDATE therapists SET title = ?, name = ?, email = ?, location = ?, years_of_practice = ?, availability = ? WHERE id = ?';
  db.query(query, [title, name, email, location, years_of_practice, availability, req.params.id], (err, result) => {
    if (err) {
      console.error("Error updating therapist:", err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Therapist not found" });
    }
    res.json({ message: "Therapist updated successfully" });
  });
};

// delete therapist
exports.deleteTherapist = (req, res) => {
  const query = 'DELETE FROM therapists WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error("Error deleting therapist:", err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Therapist not found" });
    }
    res.json({ message: "Therapist deleted successfully" });
  });
};
