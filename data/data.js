const connection = require("./connection");


class Data {
    constructor (connection){
        this.connection = connection;
        console.log("MySQL connected")
    };
    viewAllEmployees() {
        return this.connection.query(`select concat(e.first_name,' ', e.last_name) Name, r.title Title, r.salary Salary, d.name Department
         from employee e 
         inner join role r on e.role_id = r.id
         inner join department d on r.department_id = d.id 
         order by e.last_name;`)
    };

}

module.exports = new Data(connection);