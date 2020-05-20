const inquirer = require("inquirer");
//const mysql = require("mysql");
var figlet = require('figlet');
const connection = require("./data/connection");
const data = require("./data/data");

//require('console.table');



init();

async function init(){

    figlet('Employee Tracker', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        appProcess(); 

    });
}

async function appProcess() {
    inquirer.prompt([{
        type: "list",
        name: "task",
        message: "What task would you like to perform?",
        choices: 
            [
                "View All Employees", 
                "View All Departments",
                "View All Roles",
                "View Employees By Manager", 
                "Add Employee", 
                "Add Role",
                "Add Department",
                "Delete Employee",
                "Delete Role",
                "Delete Department",                                                
                "Update Employee's Role", 
                "Update Employee's Manager",
                "View Budget Of Department",
                "Exit"
            ],
        }, 
    ])
    .then(function(answer){
        switch (answer.task) {
            case "View All Employees":
                viewAllEmployees();                 
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View Employees By Manager":
                employeesByManager();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;                
            case "Delete Role":
                deleteRole(); //gonna need extra code
                break;
            case "Delete Department":
                deleteDepartment(); //gonna need extra code
                break;
            case "Update Employee's Role":
                updateEmployeeRole();
                break;
            case "Update Employee's Manager":
                updateEmployeeManager();
                break;
            case "View Budget of Department":
                viewBudgetByDepartment();
                break;                                                                                                
            case "Exit":
                connection.end();
                break;
        }
    });
}