import { Router } from 'express';
import subtasksController from './subtasksController';
import isLoggedInMiddleware from '../../middlewares/isLoggedInMiddleware';

const router = Router();

router.use(isLoggedInMiddleware);
router.get('/', subtasksController.getSubtasks)
  .get('/:id', subtasksController.getSubtaskById)
  .get('/task/:taskId', subtasksController.getSubtasksByTaskId)
  .post('/', subtasksController.createSubtask)
  .patch('/:id', subtasksController.updateSubtask)
  .delete('/:id', subtasksController.deleteSubtask);

  export default router;