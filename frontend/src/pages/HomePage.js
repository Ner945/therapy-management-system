import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Therapy Management App</h1>
      <div style={{ marginTop: "20px" }}>
        <Link to="/therapists">
          <button style={{ margin: "10px", padding: "10px 20px" }}>Therapists</button>
        </Link>
        <Link to="/clients">
          <button style={{ margin: "10px", padding: "10px 20px" }}>Clients</button>
        </Link>
        <Link to="/sessions">
          <button style={{ margin: "10px", padding: "10px 20px" }}>Sessions</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
