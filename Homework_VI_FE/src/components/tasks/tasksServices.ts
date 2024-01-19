import { FieldPacket, ResultSetHeader } from 'mysql2';
import database from '../../database';
import ITask from './tasksModels';
import CustomError from '../helpers/CustomError';

const tasksServices = {
  getTasks: async (): Promise<ITask[] | CustomError> => {
    try {
    const [tasks]: [ITask[], FieldPacket[]] = await database.query('SELECT * FROM tasks WHERE deletedDate IS NULL;');
    return tasks;
    } catch (error: any) {
      return new CustomError(error.message, 500);
    }
  },
  getTasksById: async (id: number): Promise<ITask | undefined> => {
    const [task]: [ITask[], FieldPacket[]] = await database.query('SELECT * FROM tasks WHERE id = ?;', [id])   ;
    return task[0];
  },
  getTasksByUserId: async (userId: number): Promise<ITask[] | undefined> => {
    const [tasks]: [ITask[], FieldPacket[]] = await database.query('SELECT * FROM tasks WHERE userId = ?;', [userId]);
    return tasks;
  },
  getTasksIdsByUserId: async (userId: number): Promise<ITask[] | undefined> => {
    const [taskIds]: [ITask[], FieldPacket[]] = await database.query('SELECT id FROM tasks WHERE userId = ?;', [userId]);
    return taskIds;    
  },
  getTasksByPriority: async (priority: number, userId: number): Promise<ITask [] | undefined> => {
    const [tasks]: [ITask[], FieldPacket[]] = await database.query('SELECT * FROM tasks WHERE priorityId = ? AND userId = ?;', [priority, userId]);
    return tasks;
  },

  createTask: async (userId: number, title: string, description: string, dueDate: Date, categoryId: number, priorityId: number) => {
    const task = {
      userId,
      title,
      description,
      dueDate,
      completed: false,
      categoryId,
      priorityId,
    }

    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('INSERT INTO tasks SET ?;', [task]);
    return result.insertId;
  },
  updateTask: async (id: number, updatedFields: Partial<ITask>) => {
    const validFields: Partial<ITask> = {};
    
    if (updatedFields.title !== undefined) {
      validFields.title = updatedFields.title;
    }
    if (updatedFields.description !== undefined) {
      validFields.description = updatedFields.description;
    }
    if (updatedFields.dueDate !== undefined) {
      validFields.dueDate = updatedFields.dueDate;
    }
    if (updatedFields.completed !== undefined) {
      validFields.completed = updatedFields.completed;
    }
    if (updatedFields.categoryId !== undefined) {
      validFields.categoryId = updatedFields.categoryId;
    }
    if (updatedFields.priorityId !== undefined) {
      validFields.priorityId = updatedFields.priorityId;
    }

    if (Object.keys(validFields).length === 0) {
      return 0;
    }
  
    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('UPDATE tasks SET ? WHERE id = ?;', [validFields, id]);
  
    return result.affectedRows;
  },
  deleteTask: async (id: number) => {
    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('UPDATE tasks SET deletedDate = NOW() WHERE id = ?;', [id]);
    return result.affectedRows;
  }
}

export default tasksServices;