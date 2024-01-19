import { db } from '../../db';

const loggerServices = {
  logEvent: (event: string) => {
    db.logs.push(event);
  },
  getLogs: () => db.logs,
};

export default loggerServices;