import jwt from 'jsonwebtoken';
import config from '../../config';

const jwtServices = {
  sign: async (payload: any): Promise<string> => {
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
    return token;
  },
  verify: (token: string): any => {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      return payload;
    } catch (error) {
      return null;
    }
  },
};

export default jwtServices;