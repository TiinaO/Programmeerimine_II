import { RowDataPacket } from "mysql2";

interface ICategory extends RowDataPacket {
  id: number;
  name: string;
  description?: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate?: Date | null;
}

export default ICategory;