const db = reuquire("./db");
const logo = require("asciiart-logo");
const { prompt } = require("inquirer");
require("console.table");
init();

function init() {
  const text = logo({ name: "Employee Manager" }).render();
  console.log(text);
  loadPrompts();
}

function loadPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees By Department",
          vaule: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "Update Eomployee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "View Total Utilized Budget By Department",
          value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEByD();
        break;
      case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEByM();
        break;
      case "VIEW_EMPLOYEES":
        viewE();
        break;
      case "ADD_EMPLOYEE":
        addE();
        break;
      case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeM();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeR();
        break;
      case "REMOVE_EMPLOYEE":
        removeE();
        break;
      case "VIEW_DEPARTMENTS":
        viewD();
        break;
      case "ADD_DEPARTMENT":
        addD();
        break;
      case "REMOVE_DEPARTMENT":
        removeD();
        break;
      case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
        viewUtilizedBudgetByD();
        break;
      case "VIEW_ROLES":
        viewR();
        break;
      case "ADD_ROLE":
        addR();
        break;
      case "REMOVE_ROLE":
        removeR();
        break;
      default:
        quit();
    }
  });
}

function viewR() {
  db.findAllR()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => loadPrompts());
}

function viewD() {
  db.findAllD()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadPrompts());
}

function viewE() {
  db.findAllE()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadPrompts());
}

function addR() {
  db.findAllD().then(([rows]) => {
    let departments = rows;
    const dChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    prompt([
      {
        name: "title",
        message: "What is the name of the role?",
      },
      {
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
      },
    ]).then((role) => {
      db.createR(role)
        .then(() => console.log(`Added ${role.title} to the database`))
        .then(() => loadPrompts());
    });
  });
}

function addD() {
  prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]).then((res) => {
    let name = res;
    db.createD(name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => loadPrompts());
  });
}

function addE() {
  prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
    },
  ]).then((res) => {
    let lastName = res.last_name;
    let firstName = res.first_name;

    db.findAllR().then(([rows]) => {
      let roles = rows;
      const rChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
      prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: rChoices,
      }).then((res) => {
        let roleId = res.roleId;
        db.findAllE().then(([rows]) => {
          let employees = rows;
          const mChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          }));
          mChoices.unshift({ name: "None", value: null });
          prompt({
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: mChoices,
          })
            .then((res) => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName,
              };
              db.createE(employee);
            })
            .then(() =>
              console.log(`Added ${firstName} ${lastName} to the database`)
            )
            .then(() => loadPrompts());
        });
      });
    });
  });
}

function removeR() {
  db.findAllR().then(([rows]) => {
    let roles = rows;
    const rChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "roleId",
        message: "What role do you want to remove?",
        choices: rChoices,
      },
    ])
      .then((res) => db.removeR(res.roleId))
      .then(() => console.log("Removed role from the database"))
      .then(() => loadPrompts());
  });
}

function removeD() {
  db.findAllD().then(([rows]) => {
    let departments = rows;
    const dChoices = departments.map(({ id, anme }) => ({
      name: name,
      value: id,
    }));
    prompt({
      type: "list",
      name: "departmentId",
      message: "Which department would you like to remove?",
      choices: dChoices,
    })
      .then((res) => db.removeD(res.departmentId))
      .then(() => console.log("Removed department from the database"))
      .then(() => loadPrompts());
  });
}

function removeE() {
  db.findAllE().then(([rows]) => {
    let employees = rows;
    const eChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choice: eChoices,
      },
    ])
      .then((res) => db.removeE(res.employeeId))
      .then(() => console.log("Removed employee from the database"))
      .then(() => loadPrompts());
  });
}

function updateEmployeeM() {
  db.findAllE().then(([rows]) => {
    let employes = rows;
    const eChoices = employes.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's manager do you want to update?",
        choices: eChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.findAllPossibleM(employeeId).then(([rows]) => {
        let managers = rows;
        const mChoices = managers.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        }));
        prompt([
          {
            type: "list",
            name: "managerId",
            message:
              "Which employee do you want to set as manager for the selected employee?",
            choices: mChoices,
          },
        ])
          .then((res) => db.updateEmployeeM(employeeId, res.managerId))
          .then(() => console.log("Updated employee's manager"))
          .then(() => loadPrompts);
      });
    });
  });
}

function updateEmployeeR() {
  db.findAllE().then(([rows]) => {
    let employees = rows;
    const eChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        tyoe: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: eChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.findAllR().then(([rows]) => {
        let roles = rows;
        const rChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        prompt([
          {
            type: "list",
            name: "roleId",
            message: "which role do you want to assign the selected employee?",
            choices: rChoices,
          },
        ])
          .then((res) => db.updateEmployeeR(employeeId, res.roleId))
          .then(() => console.log("Updated employee's role"))
          .then(() => loadPrompts());
      });
    });
  });
}

function viewUtilizedBudgetByD() {
  db.viewDBudgets()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadPrompts());
}

function viewEByM() {
  db.findAllE().then(([rows]) => {
    let managers = rows;
    const mChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "managerId",
        message: "WHich employee do you want to see the direct reorts for?",
        choices: mChoices,
      },
    ])
      .then((res) => db.findAllEmployeesByM(res.managerId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        if (employees.length === 0) {
            console.log('The selected employee has no direct reports');
        } else {
            console.log(employees);
        }
      })
      .then(() => loadPrompts());
  });
}

function viewEByD() {
  db.findAllD().then(([rows]) => {
    let departments = rows;
    const dChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you like to see employees for?",
        choices: dChoices,
      },
    ])
      .then((res) => db.findAllEmployeesByD(res.departmentId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => loadPrompts());
  });
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}
