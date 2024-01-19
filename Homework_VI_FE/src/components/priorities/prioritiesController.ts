import { NextFunction, Request, Response } from 'express';
import prioritiesServices from './prioritiesServices';
import CustomError from '../helpers/CustomError';
import errorFactory from '../helpers/errorFactory';

const prioritiesController = {
  getPriorities: async (req: Request, res: Response, next:NextFunction) => {
    const priorities = await prioritiesServices.getPriorities();
    if (priorities instanceof CustomError) {
      return next(priorities);
      
    }
    return res.status(200).json({
      success: true,
      message: 'All priorities',
      priorities,
      countOfPriorities: priorities.length
    })
  },
  getPriorityById: async (req: Request, res: Response, next:NextFunction) => {
    const id = Number(req.params.id)
    const priority = await prioritiesServices.getPriorityById(id);

    if (!priority) {
      return next(errorFactory.notFound());
    }

    return res.status(200).json({
      success: true,
      message: 'Priority',
      priority,
    });
  },
  createPriority: async (req: Request, res: Response, next:NextFunction) => {
    const { name, description } = req.body;
  
    if (!name) {
      return next(errorFactory.badRequest());
    }

    const priorityId = await prioritiesServices.createPriority(name, description)

    return res.status(200).json({
      success: true,
      message: 'Priority created',
      priorityId
    });
  },
  updatePriority: async (req: Request, res: Response, next:NextFunction) => {
    const id = Number(req.params.id);
    const { name, description } = req.body;

    if (!name) {
      return next(errorFactory.badRequest());
    }

    const updatedPriority = await prioritiesServices.updatePriority(id, { name, description });

    if (updatedPriority === 0) {
      return next(errorFactory.notFound());
    }

    return res.status(200).json({
      success: true,
      message: 'Priority updated',
    });
  },
  deletePriority: async (req: Request, res: Response, next:NextFunction) => {
    const id = Number(req.params.id);
    const deletedPriority = await prioritiesServices.deletePriority(id);

    if (deletedPriority === 0) {
      return next(errorFactory.notFound());
    }

    return res.status(200).json({
      success: true,
      message: 'Priority deleted',
    });
  }
};

export default prioritiesController;