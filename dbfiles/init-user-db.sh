#!/bin/bash

mysql -u root -p$MYSQL_ROOT_PASSWORD <<EOF
CREATE DATABASE IF NOT EXISTS ticketreserve;
USE ticketreserve;
GRANT ALL PRIVILEGES ON ticketreserve.* TO 'mysql'@'%';

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

CREATE TABLE salas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  capacity INT NOT NULL,
  type VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

CREATE TABLE peliculas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  synopsis TEXT NOT NULL,
  duration INT NOT NULL,
  director VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  imageUrl VARCHAR(255) NOT NULL
);

CREATE TABLE butacas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  \`row\` CHAR(1) NOT NULL,
  \`column\` INT NOT NULL,
  id_Sala INT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (id_Sala) REFERENCES salas(id)
);

CREATE TABLE proyecciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  horario TIME NOT NULL,
  id_Pelicula INT NOT NULL,
  id_Sala INT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (id_Pelicula) REFERENCES peliculas(id),
  FOREIGN KEY (id_Sala) REFERENCES salas(id)
);

CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha VARCHAR(255) NOT NULL,
  id_Usuario INT NOT NULL,
  id_Butaca INT NOT NULL,
  id_Proyeccion INT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (id_Usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_Butaca) REFERENCES butacas(id),
  FOREIGN KEY (id_Proyeccion) REFERENCES proyecciones(id)
);

INSERT INTO salas (name, capacity, type, location, createdAt, updatedAt)
VALUES
  ('A1', 30, 'Conferencia', 'Edificio A, Piso 1', '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B1', 15, 'Reunión', 'Edificio B, Piso 2', '2025-02-20 10:10:00', '2025-02-20 10:10:00'),
  ('C1', 20, 'Auditorio', 'Edificio C, Piso 3', '2025-02-20 10:20:00', '2025-02-20 10:20:00');

INSERT INTO peliculas (name, synopsis, duration, director, createdAt, updatedAt, imageUrl)
VALUES
  ('Spider-Man: No Way Home', 'Peter Parker se enfrenta a las consecuencias de su identidad secreta siendo revelada al mundo. En su búsqueda por revertir esta situación, se encuentra con el multiverso y versiones alternas de Spider-Man.', 148, 'Jon Watts', '2025-02-20 10:00:00', '2025-02-20 10:00:00', 'https://resizing.flixster.com/wouDuoTzmfpwzvVDiTldrBHkbTo=/206x305/v2/https://resizing.flixster.com/8PNiwC2bpe9OecfYZSOVkvYC5vk=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2U5NGM0Y2Q1LTAyYTItNGFjNC1hNWZhLWMzYjJjOTdjMTFhOS5qcGc='),
  ('Gladiator', 'Un general romano es traicionado y obligado a convertirse en gladiador para vengarse del emperador que destruyó su vida y la de su familia.', 155, 'Ridley Scott', '2025-02-20 10:10:00', '2025-02-20 10:10:00', 'https://resizing.flixster.com/um6UX8kKm2JWxoG47ZogdzdQao4=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p24674_p_v13_bc.jpg'),
  ('Star Wars: El Imperio Contraataca', 'Los rebeldes son atacados por las fuerzas del Imperio en el planeta Hoth. Luke Skywalker continúa su entrenamiento con Yoda, mientras que Darth Vader persigue a los héroes a través del espacio.', 124, 'Irvin Kershner', '2025-02-20 10:20:00', '2025-02-20 10:20:00', 'https://resizing.flixster.com/2ar70IKTPwefa8vgxjBifauQf54=/206x305/v2/https://resizing.flixster.com/niYFsSzM4ZUEajogMi8Voh5cDc8=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzg5OWFjODY5LTdmZDctNDk2My04ZGRkLTYyZmRkZGYzMTQxMC53ZWJw');

INSERT INTO proyecciones (horario, id_Pelicula, id_Sala, createdAt, updatedAt)
VALUES
  ('15:00', 1, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('15:00', 2, 2, '2025-02-20 10:10:00', '2025-02-20 10:10:00'),
  ('17:00', 3, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('20:00', 3, 2, '2025-02-20 10:10:00', '2025-02-20 10:10:00'),
  ('18:30', 2, 3, '2025-02-20 10:20:00', '2025-02-20 10:20:00'),
  ('22:00', 2, 3, '2025-02-20 10:20:00', '2025-02-20 10:20:00');

INSERT INTO butacas (\`row\`, \`column\`, id_Sala, createdAt, updatedAt)
VALUES
  ('A', 1, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 2, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 3, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 4, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 5, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 6, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 7, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 8, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 9, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 10, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 1, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 2, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 3, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 4, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 5, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 6, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 7, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 8, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 9, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 10, 1, '2025-02-20 10:00:00', '2025-02-20 10:00:00');

INSERT INTO butacas (\`row\`, \`column\`, id_Sala, createdAt, updatedAt)
VALUES
  ('A', 1, 2, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 2, 2, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 3, 2, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 4, 2, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 5, 2, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 1, 2, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 2, 2, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 3, 2, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 4, 2, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 5, 2, '2025-02-20 10:00:00', '2025-02-20 10:00:00');

INSERT INTO butacas (\`row\`, \`column\`, id_Sala, createdAt, updatedAt)
VALUES
  ('A', 1, 3, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 2, 3, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 3, 3, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 4, 3, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('A', 5, 3, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 1, 3, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 2, 3, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 3, 3, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 4, 3, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
  ('B', 5, 3, '2025-02-20 10:00:00', '2025-02-20 10:00:00');

FLUSH PRIVILEGES;
EOF