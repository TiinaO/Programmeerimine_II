import IPriority from './prioritiesModels';
import database from '../../database';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import CustomError from '../helpers/CustomError';

const prioritiesServices = { 
  getPriorities: async (): Promise<IPriority[] | CustomError>  => {
    try {
      const [priorities]: [IPriority[], FieldPacket[]] = await database.query('SELECT * FROM priorities WHERE deletedDate IS NULL;');
      return priorities;
    } catch (error: any) {
      return new CustomError(error.message, 500);
    }
  },
  getPriorityById: async (id: number): Promise<IPriority> => {
    const [priority]: [IPriority[], FieldPacket[]] = await database.query('SELECT * FROM priorities WHERE id = ?;', [id]);  
    return priority[0];
  },
  createPriority: async (name: string, description?: string) => {
    const priority = {
      name,
      description,
    }
    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('INSERT INTO priorities SET ?;', [priority]);
    return result.insertId;
  },
  updatePriority: async (id: number, updatedFields: { [name: string]: string }) => {
    const validFields: { [name: string]: string | undefined } = {};
    
    if (updatedFields.name !== undefined) {
      validFields.name = updatedFields.name;
    }
    if (updatedFields.description !== undefined) {
      validFields.description = updatedFields.description;
    }

    if (Object.keys(validFields).length === 0) {
      return 0;
    }
  
    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('UPDATE priorities SET ? WHERE id = ?;', [validFields, id]);
  
    return result.affectedRows;
  },
  deletePriority: async (id: number) => {
    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('UPDATE priorities SET deletedDate = NOw() WHERE id = ?;', [id]);
    return result.affectedRows;
  }
};

export default prioritiesServices;