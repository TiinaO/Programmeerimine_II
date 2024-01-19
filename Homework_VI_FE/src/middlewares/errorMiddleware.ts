import { Request, Response, NextFunction } from 'express';
import CustomError from '../components/helpers/CustomError';

const errorMiddleware = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server error',
    });
};

export default errorMiddleware;