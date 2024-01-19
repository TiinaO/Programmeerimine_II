import { Request, Response, NextFunction } from 'express';
import errorFactory from '../components/helpers/errorFactory';

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return next(errorFactory.notFound('Route not found'));
};

export default notFoundMiddleware;
