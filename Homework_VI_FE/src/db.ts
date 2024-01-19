import { IUser } from './components/users/usersModels';
import ITask from './components/tasks/tasksModels';
import ISubtask from './components/subtasks/subtasksModels';
import ICategory from './components/categories/categoriesModels';
import IPriority from './components/priorities/prioritiesModels';

interface IDatabase{
  logs: string[];
  users: IUser[];
  tasks: ITask[];
  priorities: IPriority[];
  categories: ICategory[];
  subtasks: ISubtask[];
}

const db: IDatabase = {
  logs: [],
  users: [],
  priorities: [],
  categories: [],
  subtasks: [],
  tasks: []
}

export {db};