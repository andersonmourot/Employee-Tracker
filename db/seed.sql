use employeeDB;
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Software Engineer', 120000, 2),
    ('Lead Engineer', 150000, 2),
    ('Accountant', 125000, 3),
    ('Account Manager', 160000, 3),
    ('Lawyer', 190000, 4),
    ('Legal Team Lead', 250000, 4),
    ('Salesperson', 80000, 1),
    ('Sales Lead', 100000, 1);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Tom', 'Allen', 8, 7),
    ('Malia', 'Brown', 6, 5),
    ('Mike', 'Chan', 2, 1),
    ('Kevin','Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Sarah', 'Lourd', 7, NULL),
    ('John', 'Doe', 1, NULL);
INSERT INTO department
    (name)
VALUES
    ('Finance'),
    ('Sales'),
    ('Legal').
    ('Enginerring');
