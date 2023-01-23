const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    createD(department) {
        return this.connection.promise().query('INSTERT INTO department SET ?', department);
    }
    
    createE(employee) {
        return this.connection.promise().query('INSERT INTO employee SET ?', employee);
    }

    createR(role) {
        return this.connection.promise().query('INSERT INTO role SET ?', role);
    }

    removeD(departmentID) {
        return this.connection.promise().query('DELETE FROM department WHERE id = ?', departmentID);
    }

    removeE(employeeID) {
        return this.connection.promise().query('DELETE FROM employee WHERE id = ?', employeeID);
    }

    removeR(roleID) {
        return this.connection.promise().query('DELETE FROM role WHERE id = ?', roleID);
    }

    findAllD() {
        return this.connection.promise().query('SELECT department.id, department.name FROM department;');
    }

    findAllE() {
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = departmnet.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
    }
    findAllR() {
        return this.connection.promise().query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;');
    }

    updateEmployeeM(employeeId, managerId) {
        return this.connection.promise().query('UPDATE employee SET manager_id = ? WHERE id = ?', [managerId, employeeId]);
    }

    updateEmployeeR(employeeId, roleId) {
        return this.connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?' [roleId, employeeId]);
    }

    findAllEmployeesByD(department) {
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = ?;', departmentId);
    }

    findAllEmployeesByM(managerId) {
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, department.anme AS departmnet, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;', managerId);
    }

    findAllPossibleM(employeeId) {
        return this.connection.promise().query('SELECT id, first_name, last_name, FROM employee WHERE id != ?', employeeId);
    }

    viewDBudgets() {
        return this.connection.promise().query('SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;');
    }
}

module.exports = new DB(connection);