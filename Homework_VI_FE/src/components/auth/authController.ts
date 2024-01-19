import { Request, Response, NextFunction } from 'express';
import usersServices from '../users/usersServices';
import hashServices from '../helpers/hashServices';
import jwtServices from '../helpers/jwtServices';
import errorFactory from '../helpers/errorFactory';

const authControllers = {
  login: async (req: Request, res: Response, next:NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorFactory.badRequest('Check if email or password are provided'));
    }
    const user = await usersServices.getUserByEmail(email);
    if (!user) {
      return next(errorFactory.notFound('User not found'));
    }
    const isPasswordCorrect = await hashServices.comparePasswords(
      password,
      user.password!, //hüüumärk on selleks, et tüübikontrollist mööda saada
    );
    if (!isPasswordCorrect) {
      return next(errorFactory.badRequest('Wrong password'));
    }
    const payload = {
      id: user.id,
      role: user.role
    };
    const token = await jwtServices.sign(payload);
    return res.status(200).json({
      success: true,
      message: 'User logged in',
      token,
      id: user.id,
    });
  },
};

export default authControllers;