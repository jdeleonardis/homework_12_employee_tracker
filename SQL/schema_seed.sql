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

INSERT INTO department (name) 
VALUES ('Sales'),
('Accounting'),
('Warehouse'),
('Human Resources');

INSERT INTO role (title, salary, department_id)
 VALUES ('Salesperson',80000.00, 1),
 ('Accoutant',70000, 2),
 ('Warehouse Guy',50000, 3),
 ('Human Resources Tech',70000, 4),
 ('Manager Sales',120000, 1),
 ('Manager Human Resources',120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Michael','Scott',5,null),
('Toby','Flenderson',6,null),
('Dwight','Schrute',1,1),
('Jim','Halpert',1,1),
('Pam','Beesly',1,1),
('Angela','Austin',2,1),
('Stanley','Hudson',2,1),
('Kevin','Malone',2,1),
('Kelly','Kapoor',4,2),
('Darryl','Philbin',3,1);

