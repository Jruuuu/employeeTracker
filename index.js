const inquirer = require("inquirer");
const { allowedNodeEnvironmentFlags } = require("process");
const { start } = require("repl");
const LocalDB = require("./db/db.js");
require("console.table");

const newDepartments = [];



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
                "Add Employee",
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
            case "Add Department":
                addDepartments();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
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

const viewRoles = () => {
    LocalDB.findRoles().then((data) => {
        console.table(data);
        startApp();
    });
}

const viewDepartments = () => {
    LocalDB.findDepartments().then((data) => {
        console.table(data);
        startApp();
    });
}

const addDepartments = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What Department would you like to add?"
        }
    ]).then((answer) => {
        LocalDB.insertDepartments(answer.name).then(() => {
            console.log("department successfully added");
            startApp();
        });

    });
}
const addRole = async () => {
    const departments = await LocalDB.findDepartments();
    console.log(departments);
    const choices = departments.map(department => ({
        name: department.department,
        value: department.id
    })
    );
    console.log(choices);
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What Role would you like to add?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for this Role?"
        },
        {
            type: "list",
            name: "department_id",
            message: "What department does this role belong?",
            choices: choices
        }
    ]).then((answer) => {
        console.log(answer);
        LocalDB.insertRole(answer).then(() => {
            console.log("role successfully added");
            startApp();
        });
    });
};
const addEmployee = async () => {
    const employee = await LocalDB.findAllEmployees();
    console.log(employee);
    let choicesManager = employee.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.manager_id
    })
    );
    choicesManager = choicesManager.filter((employee) => employee.value !== null);

    const role = await LocalDB.findRoles();

    console.log(role);

    const choicesRole = role.map(role => ({
        name: role.title,
        value: role.id
    })
    );
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What Role would you like to add?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the salary for this Role?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What department does this role belong?",
            choices: choicesRole
        },
        {
            type: "list",
            name: "manager_id",
            message: "What department does this role belong?",
            choices: choicesManager
        }
    ]).then((answer) => {
        console.log(answer);
        LocalDB.insertEmployee(answer).then(() => {
            console.log("employee successfully added");
            startApp();
        });
    });
}


