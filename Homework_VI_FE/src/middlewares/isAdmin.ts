import { Request, Response, NextFunction } from 'express';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { role } = res.locals.user;
  if (role !== 'Admin') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden',
    });
  }
  return next();
};

export default isAdmin;