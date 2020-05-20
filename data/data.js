const connection = require("./connection");


class Data {
    constructor (connection){
        this.connection = connection;
        console.log("MySQL connected")
    };
    
    viewAllEmployees() {
        return this.connection.query(`select concat(e.first_name,' ', e.last_name) Name, r.title Title, 
         r.salary Salary, d.name Department
         from employee e 
         inner join role r on e.role_id = r.id
         inner join department d on r.department_id = d.id 
         order by e.last_name;`)
    };

    viewAllDepartments() {
        return this.connection.query(`select name Name 
        from department 
        order by name;`)
    };

    viewAllRoles() {
        return this.connection.query(`select title Title, salary Salary, d.name Department
        from role r
        inner join department d on r.department_id = d.id
        order by r.title;`)
    };   
    
    getManagerList() {
        return this.connection.query(`select e.id, concat(e.first_name,' ', e.last_name) Name, r.title Title
        from employee e
        inner join role r on e.role_id = r.id
        where e.manager_id is null;`)
    };  

    viewEmployeesByManagerID(id) {
        return this.connection.query(`select concat(e.first_name,' ', e.last_name) Name, r.title Title, 
        r.salary Salary, d.name Department
        from employee e
        inner join role r on e.role_id = r.id
        inner join department d on r.department_id = d.id
        where e.manager_id = ?
        order by e.last_name;`,id)
    };  
    
    getRoles() {
        return this.connection.query(`select id, title
        from role r
        order by r.title;`)
    };

    addEmployee(answer) {
        return this.connection.query("insert into employee SET ?", answer)
    }

    addRole(answer) {
        return this.connection.query("insert into role SET ?", answer)
    }    

    getDepartments() {
        return this.connection.query(`select id, name from department order by name;`)
    };

    addDepartment(answer) {
        return this.connection.query("insert into department SET ?", answer)
    }

    getEmployeeNamesAndIds() {
        return this.connection.query(`select id, concat(e.first_name,' ', e.last_name) Name
        from employee e
        order by e.last_name;`)        
    }
    
    deleteEmployee(id) {
        return this.connection.query(`delete from employee where id = ?;`,id)                
    }

    updateEmployeeRole(answer) {
        //console.log(answer.id + " " + answer.role_id)
        return this.connection.query("update employee SET role_id = ? where id = ?", [answer.role_id,answer.id])
    }
}

module.exports = new Data(connection);