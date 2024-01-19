import { Request, Response, NextFunction } from 'express';
import usersServices from './usersServices';
import CustomError from '../helpers/CustomError';
import errorFactory from '../helpers/errorFactory';

const usersControllers = {
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    const users = await usersServices.getUsers();
    if (users instanceof CustomError) {
      return next(users);
    }
    if (users.length === 0) {
      return next(errorFactory.notFound('No users found'));
    }
    if (res.locals.user.role !== 'Admin') {
      return next(errorFactory.forbidden());
    }
    return res.status(200).json({
      success: true,
      message: 'List of users',
      users,
      countOfUsers: users.length,
    });
  },
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    if (id !== res.locals.user.id && res.locals.user.role !== 'Admin') {
      return next(errorFactory.forbidden());
    }

    const user = await usersServices.getUserById(id);

    return res.status(200).json({
      success: true,
      message: 'User',
      user,
    });

  },
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return next(errorFactory.badRequest('Check if firstName, lastName, email or password are provided'));
    }

    const newUser = {
      firstName, 
      lastName, 
      email, 
      password
    }

    const userId = await usersServices.createUser(newUser);

    return res.status(200).json({
      success: true,
      message: 'User created',
      userId,
    });

  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const updatedFields = req.body;
    const userId = await usersServices.getUserById(id);

    if( userId.id !== res.locals.user.id) {
      return next(errorFactory.forbidden());
    }

    const updatedRows = await usersServices.updateUser(id, updatedFields);

    if (updatedRows === 0) {
      return next(errorFactory.badRequest('Check if firstName, lastName, email or password are provided'));
    }
    return res.status(200).json({
      success: true,
      message: 'User updated',
      updatedRows,
    });
  },
  deleteUser: async (req: Request, res: Response, next:NextFunction) => {
    const id = Number(req.params.id);
    const userId = await usersServices.getUserById(id);

    if( userId.id !== res.locals.user.id) {
      next(errorFactory.forbidden());
    }
    
    const deletedRows = await usersServices.deleteUser(id);
    return res.status(200).json({
      success: true,
      message: 'User deleted',
      deletedRows,
    });
  }
};

export default usersControllers;