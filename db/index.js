const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    createE(employee) {
        return this.connection.promise().query('INSERT INTO employee SET ?', employee);
    }

    createD(department) {
        return this.connection.promise().query('INSTERT INTO department SET ?', department);
    }

    createR(role) {
        return this.connection.promise().query('INSERT INTO role SET ?', role);
    }

    
}