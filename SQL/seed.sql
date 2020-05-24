INSERT INTO department (name) 
VALUES ('Sales'),
('Accounting'),
('Warehouse'),
('Human Resources'),
('Department Im Gonna Delete');

INSERT INTO role (title, salary, department_id)
 VALUES ('Salesperson',80000.00, 1),
 ('Accountant',70000, 2),
 ('Warehouse Guy',50000, 3),
 ('Human Resources Tech',70000, 4),
 ('Manager Sales',120000, 1),
 ('Manager Human Resources',120000, 4),
 ('Role Im Gonna Delete',10000,3),
 ('Another Role To Delete',10000,5);

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
('Darryl','Philbin',3,1),
('Scott','Johnson',7,1),
('Bob','Scarlett',8,1);

