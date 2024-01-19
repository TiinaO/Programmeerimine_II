import { Router } from "express";
import prioritiesController from "./prioritiesController";
import isAdmin from "../../middlewares/isAdmin";
import isLoggedInMiddleware from "../../middlewares/isLoggedInMiddleware";

const router = Router();

router.use(isLoggedInMiddleware);
router.get('/', prioritiesController.getPriorities)
  .get('/:id', prioritiesController.getPriorityById)
  .post('/', isAdmin, prioritiesController.createPriority)
  .patch('/:id', isAdmin, prioritiesController.updatePriority)
  .delete('/:id', isAdmin, prioritiesController.deletePriority);

export default router;