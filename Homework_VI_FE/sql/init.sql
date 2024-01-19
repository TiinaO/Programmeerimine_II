CREATE DATABASE tasks;

USE tasks;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  deletedDate TIMESTAMP NULL
);

CREATE TABLE priorities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  deletedDate TIMESTAMP NULL
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('User', 'Admin') NOT NULL,
  createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  deletedDate TIMESTAMP NULL
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  categoryId INT,
  priorityId INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  dueDate DATE,
  completed BOOLEAN NOT NULL,
  createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  deletedDate TIMESTAMP NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (categoryId) REFERENCES categories(id),
  FOREIGN KEY (priorityId) REFERENCES priorities(id)
);

CREATE TABLE subtasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taskId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL,
  createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  deletedDate TIMESTAMP NULL,
  FOREIGN KEY (taskId) REFERENCES tasks(id)
);
