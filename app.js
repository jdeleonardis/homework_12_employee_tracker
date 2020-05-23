const inquirer = require("inquirer");
const mysql = require("mysql");
var figlet = require('figlet');
const connection = require("./data/connection");
const data = require("./data/data");
const cTable = require('console.table');


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
                "Update Employee's Role", 
                "Update Employee's Manager",
                "View Budget of Department",
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
                viewEmployeesByManager();
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

async function viewAllEmployees(){
    const viewEmp = await data.viewAllEmployees();
    console.table(viewEmp);
    appProcess();
}

async function viewAllDepartments(){
    const viewDept = await data.viewAllDepartments();
    console.table(viewDept);
    appProcess();
}

async function viewAllRoles(){
    const viewRoles = await data.viewAllRoles();
    console.table(viewRoles);
    appProcess();
}

async function viewEmployeesByManager(){
    const getManagerList = await data.getManagerList();
    //console.log(getManagerList); //id/Name/Title
    const managerList = getManagerList.map(({ Name, Title, id }) => ({    
        name: Name + ", " + Title,
        value: id
    }));
    
    await inquirer.prompt([
        {
            type: "list",
            name: "managerID",
            message: "Which manager's employees would you like to view?",
            choices: managerList
        }
    ]
    )
    .then(async function(answers) {
        let managerID = answers.managerID;        
        const employeesByManagerID = await data.viewEmployeesByManagerID(managerID);
        console.table(employeesByManagerID);
        appProcess();     
    })    
}

async function addEmployee(){
    let getRoles = await data.getRoles();
    //console.log(getRoles);
    const roleChoices = getRoles.map(({ title, id }) => ({
        name: title,
        value: id
    }));

    const getManagerList = await data.getManagerList();    
    let managerList = getManagerList.map(({ Name, Title, id }) => ({    
        name: Name + ", " + Title,
        value: id
    }));  

    //added if no manager is necessary
    const newManager = {name: "No Manager", value: 999};
    managerList.push(newManager);

    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name",
            validate: validateEmptyString,
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name",
            validate: validateEmptyString,            
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roleChoices         
        },
        {
            type: "list",
            name: "manager_id",
            message: "Which manager?",
            choices: managerList
        },        
    ])
    .then(function(answer) {        
        //if user selected 'no manager', send to a slightly different function that includes null for the manager id        
        if (answer.manager_id == 999) {            
             data.addEmployeeNoManager(answer);                    
        }
        else {
             data.addEmployee(answer);        
        }

        // console.log("Employee has been added to the employee tracker database.")
        appProcess();     
    }) 
}

async function addRole(){
    let getDepartments = await data.getDepartments();
    const departmentChoice = getDepartments.map(({ name, id }) => ({
        name: name,
        value: id
    }));

    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the role?",
            validate: validateEmptyString,
        },  
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
            validate: validateEmptyAndNumeric,            
        },
        {
            type: "list",
            name: "department_id",
            message: "What department is the role in?",
            choices: departmentChoice
        },
    ])
    .then(function(answer) {
        data.addRole(answer);        
        console.log("Role has been added to the employee tracker database.")
        appProcess();     
    }) 
}

async function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department?",
            validate: validateEmptyString,            
        },  
    ])
    .then(function(answer) {
        data.addDepartment(answer);        
        console.log("Department has been added to the employee tracker database.")
        appProcess();     
    })    
}

async function deleteEmployee(){
    let getEmployees = await data.getEmployeeNamesAndIds();
    const employeeChoice = getEmployees.map(({ Name, id }) => ({
        name: Name,
        value: id
    }));

    inquirer.prompt([
        {
            type: "list",
            name: "id",
            message: "Which employee would you like to delete?",
            choices: employeeChoice
        },
    ])
    .then(function(answer) {
        data.deleteEmployee(answer.id);        
        console.log("Employee has been deleted from the employee tracker database.")
        appProcess();     
    }) 
}

async function updateEmployeeRole(){
    let getEmployees = await data.getEmployeeNamesAndIds();
    const employeeChoice = getEmployees.map(({ Name, id }) => ({
        name: Name,
        value: id
    }));

    let getRoles = await data.getRoles();
    const roleChoices = getRoles.map(({ title, id }) => ({
        name: title,
        value: id
    }));    

    inquirer.prompt([
        {
            type: "list",
            name: "id",
            message: "Which employee would you like to update?",
            choices: employeeChoice
        },
        {
            type: "list",
            name: "role_id",
            message: "Which role would you like to give the employee?",
            choices: roleChoices
        },        
    ])
    .then(function(answer) {
        data.updateEmployeeRole(answer);        
        console.log("Employee's role has been updated in the employee tracker database.")
        appProcess();     
    })    
}

async function updateEmployeeManager(){
    let getEmployees = await data.getEmployeeNamesAndIds();
    const employeeChoice = getEmployees.map(({ Name, id }) => ({
        name: Name,
        value: id
    }));

    const getManagerList = await data.getManagerList();    
    const managerList = getManagerList.map(({ Name, Title, id }) => ({    
        name: Name + ", " + Title,
        value: id
    }));    

    inquirer.prompt([
        {
            type: "list",
            name: "id",
            message: "Which employee would you like to update?",
            choices: employeeChoice
        },
        {
            type: "list",
            name: "manager_id",
            message: "Which manager?",
            choices: managerList
        },        
    ])
    .then(function(answer) {
        // console.log(answer.id + " " + answer.manager_id);
        data.updateEmployeeManager(answer);        
        console.log("Employee's role has been updated in the employee tracker database.")
        appProcess();     
    })  
}

async function viewBudgetByDepartment() {
    let getDepartments = await data.getDepartments();
    const departmentChoice = getDepartments.map(({ name, id }) => ({
        name: name,
        value: id
    }));

    //console.log(departmentChoice);

    inquirer.prompt([
        {
            type: "list",
            name: "id",
            message: "What department would you like budget information?",
            choices: departmentChoice
        },
    ])
    .then(async function(answer) {
        //console.log(answer);
        const returnValue = await data.viewBudgetByDepartment(answer.id); 
        // console.log(returnValue)
        const mappedReturn = returnValue.map(({ name, totalSalary }) => ({    
             name: name,
             total: totalSalary
         })); 
        
        console.log(`The ${mappedReturn[0].name} department's total budget is $ ${mappedReturn[0].total}.`)
        appProcess();     
    }) 
}

function validateEmptyString(name){
    if (name == '') {
        return 'Please enter a value';
    }
    else {
        return true;
    }
}    

const validateEmptyAndNumeric = (value) => {
    if (value == '') {
        return 'Please enter a value';
    }
    else if (isNaN(value)) {
        return 'Please enter number'
    }
    else {
        return true;
    }
}