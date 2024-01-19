import { Router } from "express";
import categoriesController from "./categoriesController";  
import isAdmin from "../../middlewares/isAdmin";
import isLoggedInMiddleware from "../../middlewares/isLoggedInMiddleware";

const router = Router();

router.use(isLoggedInMiddleware);
router.get('/', categoriesController.getCategories)
  .get('/:id', categoriesController.getCategoryById)
  .post('/', isAdmin, categoriesController.createCategory)
  .patch('/:id', isAdmin, categoriesController.updateCategory)
  .delete('/:id', isAdmin, categoriesController.deleteCategory);

  export default router;