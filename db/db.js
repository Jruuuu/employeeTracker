const connection = require("./connection.js");

class LocalDB {

    //LocalDB constructor
    constructor(connection) {
        this.connection = connection;
    }

    //here we will write our query methods
    findAllEmployees() {
        return this.connection.query(`
            SELECT
                employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                role.salary,
                department.name AS department,
                CONCAT(manager.first_name,' ',manager.last_name) AS manager
            FROM
                employee 
                    LEFT JOIN role ON employee.role_id = role.id 
                    LEFT JOIN department ON role.department_id = department.id
                    LEFT JOIN employee manager ON manager.id = employee.manager_id;
        `);
    }

    findRoles(){
        return this.connection.query(`
        SELECT 
             role.title
        FROM
             employee
                LEFT JOIN role ON employee.role_id = role.id 
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON manager.id = employee.manager_id;
        
        `);
    }
    findDepartments(){
        return this.connection.query(`
        SELECT 
			department.name AS department
		FROM
			employee
					LEFT JOIN role ON employee.role_id = role.id 
                    LEFT JOIN department ON role.department_id = department.id
                    LEFT JOIN employee manager ON manager.id = employee.manager_id;
        `);
    }
    
    postDepartments(){
        return this.connection.query(`
        

        `);
    }


}

module.exports = new LocalDB(connection);