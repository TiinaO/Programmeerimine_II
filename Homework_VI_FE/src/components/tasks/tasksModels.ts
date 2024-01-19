import { RowDataPacket } from "mysql2";

interface ITask extends RowDataPacket{
  id: number;
  userId: number;
  categoryId?: number;
  priorityId?: number;
  //subtasksId?: number;
  title: string;
  description?: string;
  dueDate: Date | null; 
  completed: boolean;
  createdDate: Date;
  updatedDate: Date;
  deletedDate?: Date | null;
}

export default ITask;