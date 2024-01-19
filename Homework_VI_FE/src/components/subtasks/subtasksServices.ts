import { FieldPacket, ResultSetHeader } from 'mysql2';
import database from '../../database';
import ISubtask from './subtasksModels';
import ITask from '../tasks/tasksModels';
import CustomError from '../helpers/CustomError';

const subtasksServices = {
  getSubtasks: async (): Promise<ISubtask[] | CustomError> => {
    try {
    const [subtasks]: [ISubtask[], FieldPacket[]] = await database.query('SELECT * FROM subtasks;');
    return subtasks;
    } catch (error: any) {
      return new CustomError(error.message, 500);
    }
  },
  getSubtaskById: async (id: number): Promise<ISubtask | undefined> => {
    const [subtask]: [ISubtask[], FieldPacket[]] = await database.query('SELECT * FROM subtasks WHERE id = ? AND deletedDate IS NULL;', [id]);
    return subtask[0];
  },
  getSubtasksTaskId: async (id: number): Promise<ISubtask[] | undefined> => {
    const [subtasks]: [ISubtask[], FieldPacket[]] = await database.query('SELECT taskId FROM subtasks WHERE id = ? AND deletedDate IS NULL;', [id]);
    return subtasks;
  },
  getSubtasksByTaskId: async (taskId: number): Promise<ISubtask[] | undefined> => {
    const [subtasks]: [ISubtask[], FieldPacket[]] = await database.query('SELECT * FROM subtasks WHERE taskId = ? AND deletedDate IS NULL;', [taskId]);
    return subtasks;
  },
  createSubtask: async (taskId:number, title: string, description?: string) => {
    const subtask = {
      taskId,
      title,
      description,
      completed: false
    };

    const [result]: [ResultSetHeader, FieldPacket[] ] = await database.query('INSERT INTO subtasks SET ?;', [subtask])
    return result.insertId;
  },
  updateSubtask: async (id: number, updatedFields: Partial<ITask>) => {
    const validFields: Partial<ITask> = {};
    
    if (updatedFields.title !== undefined) {
      validFields.title = updatedFields.title;
    }
    if (updatedFields.description !== undefined) {
      validFields.description = updatedFields.description;
    }
    if (updatedFields.completed !== undefined) {
      validFields.completed = updatedFields.completed;
    }

    if (Object.keys(validFields).length === 0) {
      return 0;
    }
  
    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('UPDATE subtasks SET ? WHERE id = ?;', [validFields, id]);
  
    return result.affectedRows;
  },
  deleteSubtask: async (id: number) => {
    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('UPDATE subtasks SET deletedDate = NOW() WHERE id = ?;', [id]);
    return result.affectedRows;
  }
};

export default subtasksServices;