-- Drops the employeetracker_db
DROP DATABASE IF EXISTS employeetracker_db;

-- Create the database
CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary decimal(8,2) NOT NULL,
  department_id INT,
  PRIMARY KEY (id),
  CONSTRAINT department FOREIGN KEY (department_id)
  REFERENCES department(id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  CONSTRAINT role FOREIGN KEY (role_id)
  REFERENCES role(id)
);