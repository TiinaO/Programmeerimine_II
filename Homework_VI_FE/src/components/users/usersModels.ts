import { RowDataPacket } from "mysql2";

interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IUser extends RowDataPacket, INewUser {
  id: number;
  role: 'User' | 'Admin';
  createdDate: Date;
  updatedDate: Date;
  deletedDate?: Date | null;
}


export { INewUser, IUser };