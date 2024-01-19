import { Request, Response, NextFunction } from 'express';
import loggerServices from '../components/logger/loggerServices';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const event = `Url: ${req.url}, Meetod: ${req.method}, Aeg: ${new Date().toString()}`;
  loggerServices.logEvent(event);
  next();
};

export default logger;