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
                "Exit"
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
            case "Exit":
                stopApp()    
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
    // console.log(departments);
    const choices = departments.map(department => ({
        name: department.department,
        value: department.id
    })
    );
    // console.log(choices);
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
        // console.log(answer);
        LocalDB.insertRole(answer).then(() => {
            console.log("role successfully added");
            startApp();
        });
    });
};

const addEmployee = async () => {
    const role = await LocalDB.findDepartments();

    // console.log(role);

    const choicesRole = role.map(role => ({
        name: role.department,
        value: role.id
    })
    );
    const employee = await LocalDB.findAllEmployees();
    console.table(employee);
    let choicesManager = employee.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    })
    )
     choicesManager = choicesManager.filter((employee) => employee.value !== null);

    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the First Name of the Employee you would like to add"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the Last Name of the Employee you would like to add"
        },
        {
            type: "list",
            name: "role_id",
            message: "What Role Id  does this belong to?",
            choices: choicesRole
        },
        {
            type: "list",
            name: "manager_id",
            message: "What Manager does this employee  belong too?",
            choices: choicesManager
        }
    ]).then((answer) => {
        // console.log(choicesManager)
        // console.log(choicesRole)
        // console.log(answer);
        LocalDB.insertEmployee(answer).then(() => {
            console.log("employee successfully added");
            startApp();
        });
    });

};
const stopApp=()=>{
    LocalDB.stop();
    console.log("You have Exited the employee Tracker")
};


