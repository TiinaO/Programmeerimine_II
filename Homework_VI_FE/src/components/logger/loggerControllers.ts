import { Response, Request } from 'express';
import loggerServices from './loggerServices';

const loggerControllers = {
  getLogs: (req: Request, res: Response) => {
    const logs = loggerServices.getLogs();
    return res.status(200).json({
      success: true,
      message: 'List of events',
      logs,
    });
  },
};

export default loggerControllers;