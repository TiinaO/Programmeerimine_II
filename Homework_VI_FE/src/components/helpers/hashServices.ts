import bcrypt from 'bcrypt';
import config from '../../config';

const hashServices = {
    hashPassword: async (password: string) => {
        return await bcrypt.hash(password, config.saltRounds);
    },
    comparePasswords: async (password: string, hash: string) => {
        return await bcrypt.compare(password, hash);
    },
};

export default hashServices;