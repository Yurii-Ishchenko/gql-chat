import { IUser } from "./userInterface";

export interface IMessage {
  id: string;
  description: string;
  userId: string;
  convId: string;
  date: string;
  user: IUser;
}
