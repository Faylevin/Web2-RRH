create database veterinaria;
use veterinaria;

CREATE TABLE animales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    especie VARCHAR(50),
    raza VARCHAR(50),
    edad INT,
    propietario VARCHAR(100),
    email_propietario VARCHAR(100)
);

INSERT INTO animales (nombre, especie, raza, edad, propietario, email_propietario) VALUES
('Firulais', 'Perro', 'Labrador', 5, 'Carlos Méndez', 'carlos.mendez@example.com'),
('Michi', 'Gato', 'Siames', 6, 'Ana López', 'ana.lopez@gmail.com'),
('Rocky', 'Perro', 'Bulldog', 2, 'Luis Torres', 'luis.torres@gmail.com'),
('Nieve', 'Gato', 'Persa', 4, 'María Díaz', 'maria.diaz@gmail.com'),
('Toby', 'Conejo', 'Enano', 2, 'Jorge Herrera', 'jorge.herrera@gmail.com');

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE,
    password VARCHAR(255)
);

INSERT INTO usuarios (nombre, password) VALUES
('admin', '1234');
