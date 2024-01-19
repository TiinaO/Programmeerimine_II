import { NextFunction, Request, Response } from 'express';
import subtasksServices from './subtasksServices';
import ISubtask from './subtasksModels';
import tasksServices from '../tasks/tasksServices';
import CustomError from '../helpers/CustomError';
import errorFactory from '../helpers/errorFactory';

const subtasksController = {
  getSubtasks: async (req: Request, res: Response, next:NextFunction) => {
    const subtasks = await subtasksServices.getSubtasks();
    if (subtasks instanceof CustomError) {
      return next(subtasks);
    }
    return res.status(200).json({
      success: true,
      message: 'All subtasks',
      subtasks,
      countOfSubtasks: subtasks.length
    })
  },
  getSubtaskById: async (req: Request, res: Response, next:NextFunction) => {
    const id = Number(req.params.id);

    const subtask = await subtasksServices.getSubtaskById(id);

    if (!subtask) {
      return next(errorFactory.notFound());
    }

    //Saadakse kasutaja taskide id-d
    const userTaskIds = await tasksServices.getTasksIdsByUserId(res.locals.user.id) ?? [];
    //Saadakse requestitud subtaski taski id
    const subtasksTaskId = await subtasksServices.getSubtasksTaskId(id);
    //Vaja kontrollida, kas kasutaja taskide id-de hulgas on requestitud subtaski taski id

    const userTaskIdsArray = userTaskIds.map(task => task.id);
    const subtasksTaskIdValue = subtasksTaskId?.[0].taskId ?? '';

    if (subtasksTaskIdValue !== undefined && userTaskIdsArray.includes(subtasksTaskIdValue as number)) {
      return res.status(200).json({
        success: true,
        message: 'Subtask',
        subtask,
      });
    } else {
      return next(errorFactory.forbidden());
    }
  },
  getSubtasksByTaskId: async (req: Request, res: Response, next:NextFunction) => { 
    const taskId = Number(req.params.taskId);

    const subtasks = await subtasksServices.getSubtasksByTaskId(taskId);

    if (!subtasks) {
      return next(errorFactory.notFound());
    }

    const userTaskIds = await tasksServices.getTasksIdsByUserId(res.locals.user.id) ?? [];
    const subtasksTaskId = await subtasksServices.getSubtasksTaskId(subtasks[0].id);

    const userTaskIdsArray = userTaskIds.map(task => task.id);
    const subtasksTaskIdValue = subtasksTaskId?.[0].taskId ?? '';

    if (subtasksTaskIdValue !== undefined && userTaskIdsArray.includes(subtasksTaskIdValue as number)) {
      return res.status(200).json({
        success: true,
        message: 'Subtasks',
        subtasks,
        countOfSubtasks: subtasks.length
      });
    } else {
      return next(errorFactory.forbidden());
    }
  },
  createSubtask: async (req: Request, res: Response, next:NextFunction) => {
    const { taskId, title, description } = req.body;
  
    if (!title || !taskId) {
      return next(errorFactory.badRequest());
    }

    const subtaskId = await subtasksServices.createSubtask(taskId, title, description)

    return res.status(200).json({
      success: true,
      message: 'Subtask created',
      subtaskId
    });
  },
  updateSubtask: async (req: Request, res: Response, next:NextFunction) => {
    const id = Number(req.params.id);
    const { title, description, completed } = req.body;

    if (!title && !description && completed === undefined) {
      return next(errorFactory.badRequest());
    }

    const subtask = await subtasksServices.getSubtaskById(id);

    if (!subtask || subtask.length === 0) {
      return next(errorFactory.notFound());
    }

    const userTaskIds = await tasksServices.getTasksIdsByUserId(res.locals.user.id) ?? [];
    const subtasksTaskId = await subtasksServices.getSubtasksTaskId(id);

    const userTaskIdsArray = userTaskIds.map(task => task.id);
    const subtasksTaskIdValue = subtasksTaskId?.[0].taskId ?? '';

    if (subtasksTaskIdValue !== undefined && userTaskIdsArray.includes(subtasksTaskIdValue as number)) {
      const updatedFields = {
        title,
        description,
        completed
      } as Partial<ISubtask>;

      const affectedRows = await subtasksServices.updateSubtask(id, updatedFields);

      return res.status(200).json({
        success: true,
        message: 'Subtask updated',
        affectedRows
      });
    } else {
      return next(errorFactory.forbidden());
    }

  },
  deleteSubtask: async (req: Request, res: Response, next:NextFunction) => {
    const id = Number(req.params.id);

    const subtask = await subtasksServices.getSubtaskById(id);

    if (!subtask) {
      return next(errorFactory.notFound());
    }

    const userTaskIds = await tasksServices.getTasksIdsByUserId(res.locals.user.id) ?? [];
    const subtasksTaskId = await subtasksServices.getSubtasksTaskId(id);

    const userTaskIdsArray = userTaskIds.map(task => task.id);
    const subtasksTaskIdValue = subtasksTaskId?.[0].taskId ?? '';

    if (subtasksTaskIdValue !== undefined && userTaskIdsArray.includes(subtasksTaskIdValue as number)) {
      
      const affectedRows = await subtasksServices.deleteSubtask(id);

      return res.status(200).json({
        success: true,
        message: 'Subtask deleted',
        affectedRows
      });
    
    } else {
      return next(errorFactory.forbidden());
    }
  }
};

export default subtasksController;