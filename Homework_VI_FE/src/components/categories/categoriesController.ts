import { NextFunction, Request, Response } from 'express';
import categoriesServices from './categoriesServices';
import CustomError from '../helpers/CustomError';
import errorFactory from '../helpers/errorFactory';

const categoriesController = { 
  getCategories: async (req: Request, res: Response, next:NextFunction) => {
    const categories = await categoriesServices.getCategories();

    if (categories instanceof CustomError) {
      return next(categories);
    }

    return res.status(200).json({
      success: true,
      message: 'All categories',
      categories,
      countOfCategories: categories.length
    })
  },
  getCategoryById: async (req: Request, res: Response, next:NextFunction) => {
    const id = Number(req.params.id)
    const category = await categoriesServices.getCategoryById(id);

    if (!category) {
      return next(errorFactory.notFound());
    }

    return res.status(200).json({
      success: true,
      message: 'Category',
      category,
    });
  },
  createCategory: async (req: Request, res: Response, next:NextFunction) => {
    const { name, description } = req.body;
  
    if (!name) {
      return next(errorFactory.badRequest());
    }

    const categoryId = await categoriesServices.createCategory(name, description)

    return res.status(200).json({
      success: true,
      message: 'Category created',
      categoryId
    });
  },
  updateCategory: async (req: Request, res: Response, next:NextFunction) => {
    const id = Number(req.params.id);
    const { name, description } = req.body;

    if (!name) {
      return next(errorFactory.badRequest());
    }

    const updatedFields = {
      name,
      description
    };

    const rowsAffected = await categoriesServices.updateCategory(id, updatedFields);

    if (rowsAffected === 0) {
      return next(errorFactory.notFound());
    }
  
    return res.status(200).json({
      success: true,
      message: 'Category updated',
    });
  },
  deleteCategory: async (req: Request, res: Response, next:NextFunction) => {
    const id = Number(req.params.id);
    const rowsAffected = await categoriesServices.deleteCategory(id);

    if (rowsAffected === 0) {
      return next(errorFactory.notFound());
    }

    return res.status(200).json({
      success: true,
      message: 'Category deleted',
    });
  }
};

export default categoriesController;