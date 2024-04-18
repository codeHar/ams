import axios from "axios";
import { URLS } from "../../consts";
import { IUser } from "../../interfaces";

export interface IResponse {
  status: boolean;
  message: string;
  payload: IUser[];
}

export async function getAllUsers(): Promise<IUser[]> {
  try {
    const res = await axios.get<IResponse>(URLS.USER.GET_ALL_USERS);
    return res.data?.payload;
  } catch (error: IResponse | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch users");
  }
}
