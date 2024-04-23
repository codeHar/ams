import axios from "axios";
import { URLS } from "../../consts";
import { IUser } from "../../interfaces";

interface IResponse {
  status: boolean;
  message: string;
  payload: IGetUser;
}

interface IGetUser {
  users: IUser[];
  totalCount: number;
}

export async function getAllUsers(pageNo: number = 1): Promise<IGetUser> {
  try {
    const res = await axios.get<IResponse>(
      URLS.USER.GET_ALL_USERS + `?page=${pageNo}`
    );
    return res.data?.payload;
  } catch (error: IResponse | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch users");
  }
}

export async function deleteUser(id: string) {
  try {
    const res = await axios.delete<IResponse>(URLS.USER.QUERY_BY_ID(id));
    return res.data?.message;
  } catch (error: IResponse | any) {
    throw new Error(error?.response?.data?.message || "Failed to delete user");
  }
}
