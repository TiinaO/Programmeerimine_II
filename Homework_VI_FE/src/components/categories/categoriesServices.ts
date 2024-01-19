import { FieldPacket, ResultSetHeader } from 'mysql2';
import database from '../../database';
import ICategory from './categoriesModels';
import CustomError from '../helpers/CustomError';

const categoriesServices = { 
  getCategories: async (): Promise<ICategory[] | CustomError> => {
    try {
    const [categories]: [ICategory[], FieldPacket[]] = await database.query('SELECT * FROM categories WHERE deletedDate IS NULL;');
    return categories;
    } catch (error: any) {
      return new CustomError(error.message, 500);
    }
  },
  getCategoryById: async (id: number): Promise<ICategory>  => {
    const [category]: [ICategory[], FieldPacket[]] = await database.query('SELECT * FROM categories WHERE id = ? AND deletedDate IS NULL;', [id]);
    return category[0];
  },
  createCategory: async (name: string, description?: string) => {
    const category = {
      name,
      description
    }
    const [result]: [ ResultSetHeader, FieldPacket[]] = await database.query('INSERT INTO categories SET ? AND deletedDate IS NULL;', [category]);
    return result.insertId;
  },
  updateCategory: async (id: number, updatedFields: { [name: string]: string }) => {
    const validFields: { [name: string]: string | undefined } = {};
    
    if (updatedFields.name !== undefined) {
      validFields.name = updatedFields.name;
    }
    if (updatedFields.description !== undefined) {
      validFields.description = updatedFields.description;
    }

    // Kui teenusesse saadetakse tühi objekt, siis ei ole vaja andmebaasi päringut teha
    if (Object.keys(validFields).length === 0) {
      return 0;
    }
  
    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query(
      'UPDATE categories SET ? WHERE id = ? AND deletedDate IS NULL;',
      [validFields, id]
    );
  
    return result.affectedRows;
  },
  deleteCategory: async (id: number) => {
    const [result]: [ ResultSetHeader, FieldPacket[]] = await database.query('UPDATE categories SET deletedDate = NOW() WHERE id = ?;', [id]);
    return result.affectedRows;
  }
};

export default categoriesServices;