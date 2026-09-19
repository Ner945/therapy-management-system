import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/therapists';

const TherapistPage = () => {
  const [therapists, setTherapists] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    email: '',
    location: '',
    years_of_practice: '',
    availability: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTherapists = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTherapists(data);
    } catch (err) {
      console.error("Error fetching therapists:", err);
    }
  };

  useEffect(() => {
    fetchTherapists();
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
        body: JSON.stringify({
          ...formData,
          years_of_practice: parseInt(formData.years_of_practice, 10)
        })
      });
      if (res.ok) {
        setEditingId(null);
        setFormData({
          title: '',
          name: '',
          email: '',
          location: '',
          years_of_practice: '',
          availability: ''
        });
        fetchTherapists();
      } else {
        console.error("Error in submission.");
      }
    } catch (err) {
      console.error("Error creating/updating therapist:", err);
    }
  };

  const handleEdit = (therapist) => {
    setEditingId(therapist.id);
    setFormData({
      title: therapist.title,
      name: therapist.name,
      email: therapist.email,
      location: therapist.location,
      years_of_practice: therapist.years_of_practice.toString(),
      availability: therapist.availability
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchTherapists();
      } else {
        console.error("Error deleting therapist");
      }
    } catch (err) {
      console.error("Error deleting therapist:", err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Therapist Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Title" name="title" value={formData.title} onChange={handleChange} required />
        <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
        <input type="text" placeholder="Location" name="location" value={formData.location} onChange={handleChange} required />
        <input type="number" placeholder="Years of Practice" name="years_of_practice" value={formData.years_of_practice} onChange={handleChange} required />
        <select name="availability" value={formData.availability} onChange={handleChange} required>
          <option value="">Select Availability</option>
          <option value="TAKING CLIENTS">Taking Clients</option>
          <option value="NOT TAKING CLIENTS">Not Taking Clients</option>
        </select>
        <button type="submit">{editingId ? 'Update Therapist' : 'Add Therapist'}</button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setFormData({
              title: '',
              name: '',
              email: '',
              location: '',
              years_of_practice: '',
              availability: ''
            });
          }}>Cancel</button>
        )}
      </form>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Years of Practice</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {therapists.map(therapist => (
            <tr key={therapist.id}>
              <td>{therapist.id}</td>
              <td>{therapist.title}</td>
              <td>{therapist.name}</td>
              <td>{therapist.email}</td>
              <td>{therapist.location}</td>
              <td>{therapist.years_of_practice}</td>
              <td>{therapist.availability}</td>
              <td>
                <button onClick={() => handleEdit(therapist)}>Edit</button>
                <button onClick={() => handleDelete(therapist.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {therapists.length === 0 && (
            <tr>
              <td colSpan="8">No therapists available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TherapistPage;
