import { IUser, INewUser } from './usersModels';
import hashServices from '../helpers/hashServices';
import database from '../../database';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import CustomError from '../helpers/CustomError';

const usersServices = {
  getUsers: async (): Promise<IUser[] | CustomError> => {
    try {
      const [users]: [IUser[], FieldPacket[]] = await database.query('SELECT id, firstName, lastName, email, role FROM users;');
      return users;
    } catch (error: any) {
      console.log(error);
      return new CustomError(error.message, 500);
    }
  },
  getUserById: async (id: number): Promise<IUser>  => {
    const [user]: [IUser[], FieldPacket[]] = await database.query('SELECT id, firstName, lastName, email, role FROM users WHERE id = ?;', [id]);
    return user[0];
  },
  getUserByEmail: async (email: string): Promise<IUser | undefined> => {
    const [user]: [IUser[], FieldPacket[]] = await database.query('SELECT * FROM users WHERE email = ? AND deletedDate IS NULL;', [email]);
    return user[0];
  },
  createUser: async (newUser: INewUser) => {
    const hashedPassword =  await hashServices.hashPassword(newUser.password);
    const user = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: hashedPassword,
      role: 'User',
    };
    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('INSERT INTO users SET ?;', [user]);
    return result.insertId;
  },
  updateUser: async (id: number, updatedFields: Partial<IUser>) => {
    const validFields: Partial<IUser> = {};
    
    if (updatedFields.firstName !== undefined) {
      validFields.firstName = updatedFields.firstName;
    }
    if (updatedFields.lastName !== undefined) {
      validFields.lastName = updatedFields.lastName;
    }
    if (updatedFields.email !== undefined) {
      validFields.email = updatedFields.email;
    }
    if (updatedFields.password !== undefined) {
      validFields.password = await hashServices.hashPassword(updatedFields.password);
    }
    if (updatedFields.role !== undefined) {
      validFields.role = updatedFields.role;
    }

    if (Object.keys(validFields).length === 0) {
      return 0;
    }
  
    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('UPDATE users SET ? WHERE id = ?;', [validFields, id]);
  
    return result.affectedRows;
  },
  deleteUser: async (id: number) => {
    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('UPDATE users SET deletedDate = NOW() WHERE id = ?;', [id]);
    return result.affectedRows;
  }
};

export default usersServices;