import { Router } from "express";
import usersControllers from "./usersControllers";
import isAdmin from "../../middlewares/isAdmin";
import isLoggedInMiddleware from "../../middlewares/isLoggedInMiddleware";

const router = Router();

router.post('/', usersControllers.createUser)
router.use(isLoggedInMiddleware);
router.get('/', isAdmin, usersControllers.getUsers)
  .get('/:id', usersControllers.getUserById)
  .patch('/:id', usersControllers.updateUser)
  .delete('/:id', usersControllers.deleteUser);

export default router;
