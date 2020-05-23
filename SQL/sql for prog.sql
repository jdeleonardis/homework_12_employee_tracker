select * from employee;

-- view all employees
select concat(e.first_name,' ', e.last_name) Name, r.title Title, r.salary Salary, d.name Department
from employee e
inner join role r on e.role_id = r.id
inner join department d on r.department_id = d.id
order by e.last_name;

-- view all departments
select name Name from department order by name;

-- view all roles
select title Title, salary Salary, d.name Department
from role r
inner join department d on r.department_id = d.id
order by r.title;

-- list managers
select e.id, concat(e.first_name,' ', e.last_name) Name, r.title Title
from employee e
inner join role r on e.role_id = r.id
where e.manager_id is null;

-- employees by manager
select concat(e.first_name,' ', e.last_name) Name, r.title Title, r.salary Salary, d.name Department
from employee e
inner join role r on e.role_id = r.id
inner join department d on r.department_id = d.id
where e.manager_id = 1
order by e.last_name;

-- get roles
select id, title
from role r
order by r.title;

-- get departments
select id, name from department order by name;

-- get employees names
select id, concat(e.first_name,' ', e.last_name) Name from employee e
order by e.last_name;

-- delete employee
delete from employee where id = 11;

-- update employee role
-- update employee
-- set role = 
-- where id = 

select * from employee;
select * from role;

-- salary for a department
select sum(r.salary)
from department d
inner join role r on d.id = r.department_id
inner join employee e on r.id = e.role_id
where d.id = 3;


insert into employee(first_name, last_name, role_id)
values ("test","test",1);

select * from employee


