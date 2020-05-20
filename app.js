const inquirer = require("inquirer");
//const mysql = require("mysql");
var figlet = require('figlet');

init();

async function init(){

    figlet('Employee Tracker', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        //appProcess(); 

    });
}