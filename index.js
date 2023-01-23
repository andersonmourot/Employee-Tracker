const db = reuquire('./db');
const logo = require('asciiart-logo');
const { ADDRCONFIG } = require('dns');
const { prompt } = require('inquirer');
const { removeListener } = require('process');
require('console.table');
init();

function init() {
    const text = logo({ name: 'Employee Manager' }).render();
    console.log(text);
    loadPrompts();
}

function loadPrompts() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Employees By Department',
                    vaule: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
                },
                {
                    name: 'View All Employees By Manager',
                    value: 'VIEW_EMPLOYEES_BY_MANAGER'
                },
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update Employee Manager',
                    value: 'UPDATE_EMPLOYEE_MANAGER'
                },
                {
                    name: 'Update Eomployee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
                {
                    name: 'Remove Employee',
                    value: 'REMOVE_EMPLOYEE'
                },
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Remove Department',
                    value: 'REMOVE_DEPARTMENT'
                },
                {
                    name: 'View Total Utilized Budget By Department',
                    value: 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Remove Role',
                    value: 'REMOVE_ROLE'
                },
                {
                    name: 'Quit',
                    value: 'QUIT'
                },
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
                viewEByD();
                break;
            case 'VIEW_EMPLOYEES_BY_MANAGER':
                viewEByM();
                break;
            case 'VIEW_EMPLOYEES':
                viewE();
                break;
            case 'ADD_EMPLOYEE':
                addE();
                break;
            case 'UPDATE_EMPLOYEE_MANAGER':
                updateEmployeeM();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeR();
                break;
            case 'REMOVE_EMPLOYEE':
                removeE();
                break;
            case 'VIEW_DEPARTMENTS':
                viewD();
                break;
            case 'ADD_DEPARTMENT':
                addD();
                break;
            case 'REMOVE_DEPARTMENT':
                removeD();
                break;
            case 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT':
                viewUtilizedBudgetByD();
                break;
            case 'VIEW_ROLES':
                viewR();
                break;
            case 'ADD_ROLE':
                addR();
                break;
            case 'REMOVE_ROLE':
                removeR();
                break;
            default:
                quit();
        }
    })
}


function viewR() {
    db.findAllR().then(([rows]) => {
        let roles = rows;
        console.log('\n');
        console.table(roles);
    }).then(() => loadPrompts());
}

function viewD() {
    db.findAllD().then(([rows]) => {
        let departments = rows;
        console.log('\n');
        console.table(departments);
    }).then(() => loadPrompts());
}

function viewE() {
    db.findAllE().then(([rows]) => {
        let employees = rows;
        console.log('\n');
        console.table(employees);
    }).then(() => loadPrompts());
}

function addR() {
    db.findAllD().then(([rows]) => {
        let departments = rows;
        const dChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }));
        prompt([
            {
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department does the role belong to?'
            }
        ])
            .then(role => {
                db.createR(role).then(() => console.log(`Added ${role.title} to the database`)).then(() => loadPrompts())
            })
    })
}