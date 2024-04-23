import axios from "axios";
import { IArtist } from "../../interfaces";
import { URLS } from "../../consts";

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
    const res = await axios.get<IResponse>(
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
    const res = await axios.delete<IResponse>(URLS.ARTIST.QUERY_BY_ID(id));
    return res.data?.message;
  } catch (error: IResponse | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to delete artist"
    );
  }
}
