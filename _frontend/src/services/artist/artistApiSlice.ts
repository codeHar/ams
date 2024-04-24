import { IArtist } from "../../interfaces";
import { URLS } from "../../consts";
import { axiosInstance } from "../../utils";

interface IResponse {
  status: boolean;
  message: string;
  payload: IGetArtist;
}

interface IGetArtist {
  artists: IArtist[];
  totalCount: number;
}

export async function getAllArtists(pageNo: number = 1): Promise<IGetArtist> {
  try {
    const res = await axiosInstance.get<IResponse>(
      URLS.ARTIST.GET_ALL_ARTISTS + `?page=${pageNo}`
    );
    return res.data?.payload;
  } catch (error: IResponse | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch artists"
    );
  }
}

export async function deleteArtist(id: string) {
  try {
    const res = await axiosInstance.delete<IResponse>(
      URLS.ARTIST.QUERY_BY_ID(id)
    );
    return res.data?.message;
  } catch (error: IResponse | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to delete artist"
    );
  }
}

export async function importArtist(data: FormData) {
  try {
    const res = await axiosInstance.post<IResponse>(
      URLS.ARTIST.IMPORT_CSV,
      data
    );
    return res.data?.message;
  } catch (error: IResponse | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to import artists"
    );
  }
}
