import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/clients';

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    regularity: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchClients = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setEditingId(null);
        setFormData({
          name: '',
          email: '',
          phone_number: '',
          regularity: '',
        });
        fetchClients();
      } else {
        console.error("Error in submission.");
      }
    } catch (err) {
      console.error("Error creating/updating client:", err);
    }
  };

  const handleEdit = (client) => {
    setEditingId(client.id);
    setFormData({
      name: client.name,
      email: client.email,
      phone_number: client.phone_number,
      regularity: client.regularity,
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchClients();
      } else {
        console.error("Error deleting client");
      }
    } catch (err) {
      console.error("Error deleting client:", err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Client Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
        <input type="text" placeholder="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
        <select name="regularity" value={formData.regularity} onChange={handleChange} required>
          <option value="">Select Regularity</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
        </select>
        <button type="submit">{editingId ? 'Update Client' : 'Add Client'}</button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setFormData({
              name: '',
              email: '',
              phone_number: '',
              regularity: '',
            });
          }}>Cancel</button>
        )}
      </form>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>phone_number</th>
            <th>Regularity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone_number}</td>
              <td>{client.regularity}</td>
              <td>
                <button onClick={() => handleEdit(client)}>Edit</button>
                <button onClick={() => handleDelete(client.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {clients.length === 0 && (
            <tr>
              <td colSpan="6">No clients available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientPage;
