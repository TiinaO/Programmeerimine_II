import CustomError from './CustomError';

const errorFactory = {
    notFound: (message: string = 'Not found') => {
        return new CustomError(message, 404);
    },
    serverError: (message: string = 'Server error') => {
        return new CustomError(message, 500);
    },
    forbidden: (message: string = 'Forbidden') => {
        return new CustomError(message, 403);
    },
    badRequest: (message: string = 'Bad request') => {
        return new CustomError(message, 400);
    },
    unauthorized: (message: string = 'Unauthorized') => {
        return new CustomError(message, 401);
    }
}

export default errorFactory;
