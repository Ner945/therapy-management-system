import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/sessions';
const API_THERAPISTS = 'http://localhost:5000/api/therapists';
const API_CLIENTS = 'http://localhost:5000/api/clients';


const formatDateAndTime = (isoString) => {
  const dateObj = new Date(isoString);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const formattedTime = dateObj.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  return `${formattedDate} ${formattedTime}`;
};


const SessionPage = () => {
  const [sessions, setSessions] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    therapist_id: '',
    client_id: '',
    notes: '',
    session_date: '',
    length: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchSessions = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSessions(data);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  };

  const fetchTherapists = async () => {
    try {
      const res = await fetch(API_THERAPISTS);
      const data = await res.json();
      setTherapists(data);
    } catch (err) {
      console.error("Error fetching therapists:", err);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch(API_CLIENTS);
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchTherapists();
    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          therapist_id: parseInt(formData.therapist_id, 10),
          client_id: parseInt(formData.client_id, 10),
          length: parseInt(formData.length, 10)
        })
      });
      if (res.ok) {
        setEditingId(null);
        setFormData({
          therapist_id: '',
          client_id: '',
          notes: '',
          session_date: '',
          length: '',
        });
        fetchSessions();
      } else {
        console.error("Error in session submission.");
      }
    } catch (err) {
      console.error("Error creating/updating session:", err);
    }
  };

  const handleEdit = (session) => {
    setEditingId(session.id);
    setFormData({
      therapist_id: session.therapist_id.toString(),
      client_id: session.client_id.toString(),
      notes: session.notes,
      session_date: session.session_date,
      length: session.length.toString(),
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchSessions();
      } else {
        console.error("Error deleting session");
      }
    } catch (err) {
      console.error("Error deleting session:", err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Session Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <select name="therapist_id" value={formData.therapist_id} onChange={handleChange} required>
          <option value="">Select Therapist</option>
          {therapists.map((therapist) => (
            <option key={therapist.id} value={therapist.id}>
              {therapist.name}
            </option>
          ))}
        </select>
        <select name="client_id" value={formData.client_id} onChange={handleChange} required>
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <input type="text" placeholder="Notes" name="notes" value={formData.notes} onChange={handleChange} />
        <input type="datetime-local" placeholder="session_date" name="session_date" value={formData.session_date} onChange={handleChange} required />
        <input type="number" placeholder="Length (minutes)" name="length" value={formData.length} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update Session' : 'Add Session'}</button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setFormData({
              therapist_id: '',
              client_id: '',
              notes: '',
              session_date: '',
              length: '',
            });
          }}>Cancel</button>
        )}
      </form>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Therapist</th>
            <th>Client</th>
            <th>Notes</th>
            <th>session_date</th>
            <th>Length</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(session => (
            <tr key={session.id}>
              <td>{session.id}</td>
              <td>{session.therapist_name || session.therapist_id}</td>
              <td>{session.client_name || session.client_id}</td>
              <td>{session.notes}</td>
              <td>{formatDateAndTime(session.session_date)}</td>
              <td>{session.length}</td>
              <td>
                <button onClick={() => handleEdit(session)}>Edit</button>
                <button onClick={() => handleDelete(session.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {sessions.length === 0 && (
            <tr>
              <td colSpan="7">No sessions available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SessionPage;
