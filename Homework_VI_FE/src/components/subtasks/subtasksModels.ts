import { RowDataPacket } from "mysql2";

interface ISubTask extends RowDataPacket {
  id: number;
  taskId: number;
  title: string;
  description?: string;
  completed: boolean;
  createdDate: Date;
  updatedDate: Date;
  deletedDate?: Date | null;
}

export default ISubTask;