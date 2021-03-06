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

    getRolesByDepartment(id) {
        return this.connection.query(`select id
        from role r
        where department_id = ?;`,id)
    };    

    addEmployee(answer) {
        return this.connection.query("insert into employee SET ?", answer)
    }

    addEmployeeNoManager(answer) {        
        return this.connection.query("insert into employee (first_name, last_name, role_id) values (?,?,?)", [ answer.first_name, answer.last_name, answer.role_id ] )
        //insert into employee(first_name, last_name, role_id)
        //values ("test","test",1);
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

    deleteEmployeByRole(id) {
        return this.connection.query(`delete from employee where role_id = ?;`,id)                        
    }

    // deleteEmployeByMultiRole(ids) {
    //     console.log(ids);
    //     return this.connection.query(`delete from employee where role_id in (?);`,ids)                        
    // }    

    deleteRolesByDepartment(id) {
        return this.connection.query(`delete from role where department_id = ?;`,id)                        
    }
    
    deleteDepartment(id) {
        return this.connection.query(`delete from department where id = ?;`,id)                        
    }    

    deleteRole(id) {
        return this.connection.query(`delete from role where id = ?;`,id)                        
    }    

    updateEmployeeRole(answer) {
        //console.log(answer.id + " " + answer.role_id)
        return this.connection.query("update employee SET role_id = ? where id = ?", [answer.role_id,answer.id])
    }

    updateEmployeeManager(answer) {
        return this.connection.query("update employee SET manager_id = ? where id = ?", [answer.manager_id,answer.id])
    }

    viewBudgetByDepartment(id) {
        return this.connection.query(`select d.name, sum(r.salary) totalSalary
        from department d
        inner join role r on d.id = r.department_id
        inner join employee e on r.id = e.role_id
        where d.id = ?`,id) 
    }
}

module.exports = new Data(connection);