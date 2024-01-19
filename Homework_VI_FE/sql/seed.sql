INSERT INTO priorities (id, name, description) VALUES
(1, 'Madal', 'Low priority'),
(2, 'Keskmine', 'Medium priority'),
(3, 'Kõrge', 'High priority'),
(4, 'Kriitiline', NULL);

INSERT INTO categories (id, name, description) VALUES
(1, 'Töö', 'Tööga seotud ülesanded'),
(2, 'Kodu', 'Koduga seotud ülesanded'),
(3, 'Isiklik', 'Isiklike asjadega seotud ülesanded'),
(4, 'Vaba aeg', 'Vaheajaga seotud ülesanded');

INSERT INTO users (id, firstName, lastName, email, password, role, createdDate, updatedDate, deletedDate)VALUES
(1, 'Manni', 'Maasikas', 'manni.maasikas@oppime.ee', '$2b$10$d0FNsIsUWX9b5UMVuZ4tc.A8HuZQrs3nBbPn2BFOhRBu0vxIS4.G.', 'Admin', NOW(), NOW(), NULL),
(2, 'Kati', 'Karu', 'kati.karu@oppime.ee', '$2b$10$9hkwPF3YpQf3UkJBsW.zo.noZJFo8N4On2mgr5fGFIr508KEHaWZi', 'User', NOW(), NOW(), NULL),
(3, 'Testing', 'Tester', 'testing@tester.ee', '$2b$10$MzDvrYIalfTiUlCJo9KdFOZsu4gMXAWPwKfDlpYNnnFqcDU1s2H.a', 'User', NOW(), NOW(), NULL);

INSERT INTO tasks (id, userId, title, priorityId, description, dueDate, completed)
VALUES (1, 2, 'Sample Task', 1, 'This is a sample task. Number 1', NULL, 0);
INSERT INTO tasks (id, userId, title, description, dueDate, completed)
VALUES (2, 2, 'Sample Task 2', 'This is a sample task. Number 2', NULL, 0);
INSERT INTO tasks (id, userId, categoryId, priorityId, title, description, dueDate, completed)
VALUES (3, 3, 1, 2, 'Sample Task 3', 'This is a sample task. Number 3', NULL, 1);
INSERT INTO tasks (id, userId, title, description, dueDate, completed)
VALUES (4, 3, 'Sample Task 4', 'This is a sample task. Number 4', NULL, 0);
INSERT INTO tasks (id, userId, categoryId, priorityId, title, description, dueDate, completed)
VALUES (5, 1, 2, 3, 'Sample Task 3', 'This is a sample task. Number 5', NULL, 1),
VALUES (6, 1, 1, 2, 'Sample Task 3', 'This is a sample task. Number 5', NULL, 1);
INSERT INTO tasks (id, userId, priorityId, title, description, dueDate, completed)
VALUES (7, 1, 2, 'Sample Task 3', 'This is a sample task. Number 5', NULL, 1);

INSERT INTO subtasks (id, taskId, title, description, completed) VALUES
(1, 1, 'Sample Subtask', 'This is a sample subtask. Number 1', false),
(2, 3, 'Sample Subtask 2', 'This is a sample subtask. Number 2', false),
(3, 1, 'Sample Subtask 3', 'This is a sample subtask. Number 3', true),
(4, 3, 'Sample Subtask 4', 'This is a sample subtask. Number 4', false);

