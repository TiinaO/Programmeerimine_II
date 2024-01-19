import { NextFunction, Request, Response } from 'express';
import tasksServices from './tasksServices';
import ITask from './tasksModels';
import CustomError from '../helpers/CustomError';
import errorFactory from '../helpers/errorFactory';

const tasksController = {
  getTasks: async (req: Request, res: Response, next:NextFunction) => {
    const response = await tasksServices.getTasks();
    if (response instanceof CustomError) {
      return next(response);
    }
    return res.status(200).json({
      success: true,
      message: 'All tasks',
      response,
      countOfUsers: response.length
    })
  },
  getTasksById: async (req: Request, res: Response, next:NextFunction) => {
    const id = Number(req.params.id)
    const task = await tasksServices.getTasksById(id);

    if (id !== res.locals.user.id && res.locals.user.role !== 'Admin') {
      return next(errorFactory.forbidden());
    }

    if (!task) {
      return next(errorFactory.notFound('No task found with the specified id.'));
    }

    return res.status(200).json({
      success: true,
      message: 'Task',
      task,
    });
  },
  getTasksByUserId: async (req: Request, res: Response, next:NextFunction) => {
    const userId = Number(req.params.userId);
    const tasks = await tasksServices.getTasksByUserId(userId);

    if (userId !== res.locals.user.id) {
      return next(errorFactory.forbidden());
    }

    if (tasks?.length === 0) {
      return next(errorFactory.notFound('No tasks found with the specified user id.'));
    }

    return res.status(200).json({
      success: true,
      message: 'Task',
      tasks
    });
  },
  getTasksIdsByUserId: async (req: Request, res: Response, next:NextFunction) => {
    const userId = Number(req.params.userId);
    const taskIds = await tasksServices.getTasksIdsByUserId(userId);

    if(userId !== res.locals.user.id && res.locals.user.role !== 'Admin') {
      return next(errorFactory.forbidden());
    }

    if (!taskIds  || taskIds.length === 0) {
      return next(errorFactory.notFound('No tasks found with the specified user id.'));
    }

    return res.status(200).json({
      success: true,
      message: 'Task',
      taskIds
    });
  },
  getTasksByPriority: async (req: Request, res: Response, next:NextFunction) => {
    const priority = Number(req.params.priority); 
    const userId = res.locals.user.id;
    const tasks = await tasksServices.getTasksByPriority(priority, userId);

    if (!tasks || tasks.length === 0) {
      return next(errorFactory.notFound('No tasks found with the specified priority.'));
    }

    return res.status(200).json({
      success: true,
      message: 'Task',
      tasks
    });
  },
  createTasks: async (req: Request, res: Response, next:NextFunction) => {
    const { title, description, dueDate, categoryId, priorityId } = req.body;
  
    if (!title) {
      return next(errorFactory.badRequest('Check if title is provided'));
    }

    const taskId = await tasksServices.createTask( res.locals.user.id , title, description, dueDate,  categoryId, priorityId);

    return res.status(200).json({
      success: true,
      message: 'Task created',
      taskId
    });
  },
  updateTasks: async (req: Request, res: Response, next:NextFunction) => {
    const id = Number(req.params.id);
    const { title, description, dueDate, categoryId, priorityId } = req.body;

    const tasks = await tasksServices.getTasksById(id);
    const userId = tasks?.userId;

    if (userId !== res.locals.user.id) {
      return next(errorFactory.forbidden());
    }

    if (!title) {
      return next(errorFactory.badRequest('Check if title is provided'));
    }

    const updatedTasks: { [key: string]: any } = {
      title,
      description,
      dueDate,
      categoryId,
      priorityId,
    };

    const updatedTask = await tasksServices.updateTask(id, updatedTasks as Partial<ITask>);

    if (updatedTask === 0) {
      return next(errorFactory.notFound());
    }

    return res.status(200).json({
      success: true,
      message: 'Task updated',
    });
  },
  deleteTasks: async (req: Request, res: Response, next:NextFunction) => {
    const id = Number(req.params.id);

    if (id !== res.locals.user.id) {
      return next(errorFactory.forbidden());
    }

    const deletedTasks = await tasksServices.deleteTask(id);

    if (deletedTasks === 0) {
      return next(errorFactory.notFound());
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted',
    });
  }
}

export default tasksController;