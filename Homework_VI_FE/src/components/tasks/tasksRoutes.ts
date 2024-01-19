import { Router } from "express";
import tasksController from "./tasksController";
import isAdmin from "../../middlewares/isAdmin";
import isLoggedInMiddleware from "../../middlewares/isLoggedInMiddleware";

const router = Router();

router.use(isLoggedInMiddleware);
router.get('/', isAdmin, tasksController.getTasks);
router.get('/bypriority/:priority', tasksController.getTasksByPriority)
router.get('/byuserid/:userId', tasksController.getTasksByUserId);
router.get('/byid/:id', tasksController.getTasksById);
router.get('/tasksbyuserid/:userId', tasksController.getTasksIdsByUserId);
router.post('/', tasksController.createTasks);
router.patch('/:id', tasksController.updateTasks);
router.delete('/:id', tasksController.deleteTasks);

export default router;