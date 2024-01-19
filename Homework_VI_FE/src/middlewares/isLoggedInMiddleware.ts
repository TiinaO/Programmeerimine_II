import { Request, Response, NextFunction } from 'express';
import jwtServices from '../components/helpers/jwtServices';

const isLoggedInMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }
  const payload = jwtServices.verify(token);
  if (!payload) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
  res.locals.user = payload;
  return next();
};

export default isLoggedInMiddleware;