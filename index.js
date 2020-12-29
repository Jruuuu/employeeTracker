const inquirer = require("inquirer");
const { start } = require("repl");
const LocalDB = require("./db/db.js");
require("console.table");

const startApp = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What do you want to do?",
            choices: [
                "View Employees",
                "View Roles",
                "View Departments",
                "Add Department",
                "Add Role",
                "Add Emplyee",
                "Update Role"
            ]
        }
    ]).then((answer) => {
        switch (answer.choice) {
            case "View Employees":
                viewEmployees();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Departments":
                viewDepartments();
                break;        
        
            default:
                break;
        }
    });
}

startApp();

const viewEmployees = () => {
    LocalDB.findAllEmployees().then((data) => {
        console.table(data);
        startApp();
    });
}

const viewRoles = () =>{
    LocalDB.findRoles().then((data) =>{
        console.table(data);
        startApp();
    });
}

const viewDepartments = () =>{
    LocalDB.findDepartments().then((data)=> {
        console.table(data);
        startApp();
    });
}