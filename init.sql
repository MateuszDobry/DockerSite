CREATE DATABASE IF NOT EXISTS usersdb;

CREATE USER IF NOT EXISTS 'user@github.com'@'%' IDENTIFIED BY 'OPEN';
CREATE USER IF NOT EXISTS 'mateusz@gmail.com'@'%' IDENTIFIED BY 'Mati123';

GRANT ALL PRIVILEGES ON usersdb.* TO 'user@github.com'@'%';
GRANT ALL PRIVILEGES ON usersdb.* TO 'mateusz@gmail.com'@'%';


USE usersdb;
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (email)
);



INSERT INTO users (email, password) VALUES ('user@github.com', 'OPEN');
INSERT INTO users (email, password) VALUES ('mateusz@gmail.com', 'Mati123');

FLUSH PRIVILEGES;
