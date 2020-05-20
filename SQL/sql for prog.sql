select * from employee;

-- view all employees
select concat(e.first_name,' ', e.last_name), r.title, r.salary, d.name
from employee e
inner join role r on e.role_id = r.id
inner join department d on r.department_id = d.id
order by e.last_name;