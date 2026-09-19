CREATE DATABASE IF NOT EXISTS therapy_system;
USE therapy_system;

CREATE TABLE therapists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    years_of_practice INT NOT NULL,
    availability VARCHAR(30) NOT NULL
);

CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    regularity VARCHAR(20) NOT NULL
);

CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    therapist_id INT NOT NULL,
    client_id INT NOT NULL,
    notes TEXT,
    session_date DATETIME NOT NULL,
    length INT NOT NULL,
    CONSTRAINT fk_sessions_therapist
        FOREIGN KEY (therapist_id) REFERENCES therapists(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_sessions_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
