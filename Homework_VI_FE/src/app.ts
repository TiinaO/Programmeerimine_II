import express from 'express';
import cors from 'cors';

import usersControllers from './components/users/usersControllers'
import loggerControllers from './components/logger/loggerControllers'
import authControllers from './components/auth/authController'

import errorMiddleware from './middlewares/errorMiddleware';
import notFoundMiddleware from './middlewares/notFoundMiddleware';
import logger from './middlewares/loggingMiddleware';

import usersRoutes from './components/users/usersRoutes';
import tasksRoutes from './components/tasks/tasksRoutes';
import categoriesRoutes from './components/categories/categoriesRoutes';
import subtasksRoutes from './components/subtasks/subtasksRoutes';
import prioritiesRoutes from './components/priorities/prioritiesRoutes';

const app = express()

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());

app.get('/logs', logger, loggerControllers.getLogs);

app.post('/login', authControllers.login);
app.post('/users', usersControllers.createUser);

app.use('/users', usersRoutes);
app.use('/tasks', tasksRoutes);
app.use('/categories', categoriesRoutes);
app.use('/subtasks', subtasksRoutes);
app.use('/priorities', prioritiesRoutes);

app.use('*', notFoundMiddleware);

app.use(errorMiddleware);

export default app;