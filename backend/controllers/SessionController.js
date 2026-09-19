const db = require('../db');

// all sessions joining therapists and clients
exports.getAllSessions = (req, res) => {
  const query = `SELECT sessions.*, therapists.name AS therapist_name, clients.name AS client_name 
                 FROM sessions 
                 LEFT JOIN therapists ON sessions.therapist_id = therapists.id 
                 LEFT JOIN clients ON sessions.client_id = clients.id`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching sessions:", err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};

// session by ID
exports.getSessionById = (req, res) => {
  const query = `SELECT sessions.*, therapists.name AS therapist_name, clients.name AS client_name 
                 FROM sessions 
                 LEFT JOIN therapists ON sessions.therapist_id = therapists.id 
                 LEFT JOIN clients ON sessions.client_id = clients.id
                 WHERE sessions.id = ?`;
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("Error fetching session:", err);
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json(results[0]);
  });
};

// make new session
exports.createSession = (req, res) => {
  const { therapist_id, client_id, notes, session_date, length } = req.body;
  const query = 'INSERT INTO sessions (therapist_id, client_id, notes, session_date, length) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [therapist_id, client_id, notes, session_date, length], (err, result) => {
    if (err) {
      console.error("Error creating session:", err);
      return res.status(500).json({ error: err });
    }
    res.status(201).json({
      id: result.insertId,
      therapist_id,
      client_id,
      notes,
      session_date,
      length
    });
  });
};

// update session
exports.updateSession = (req, res) => {
  const { therapist_id, client_id, notes, session_date, length } = req.body;
  const query = 'update sessions SET therapist_id = ?, client_id = ?, notes = ?, session_date = ?, length = ? WHERE id = ?';
  db.query(query, [therapist_id, client_id, notes, session_date, length, req.params.id], (err, result) => {
    if (err) {
      console.error("Error updating session:", err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json({ message: "Session updated successfully" });
  });
};

// delete session
exports.deleteSession = (req, res) => {
  const query = 'DELETE FROM sessions WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error("Error deleting session:", err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json({ message: "Session deleted successfully" });
  });
};
