import axios from "axios";
import { URLS } from "../../consts";
import { IMusic } from "../../interfaces";

interface IResponse {
  status: boolean;
  message: string;
  payload: IMusic[];
}

export async function getMusicOfArtist(artistId: string): Promise<IMusic[]> {
  try {
    const res = await axios.get<IResponse>(URLS.ARTIST.GET_MUSIC(artistId));
    return res.data?.payload;
  } catch (error: IResponse | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch music");
  }
}

export async function deleteMusic(id: string) {
  try {
    const res = await axios.delete<IResponse>(URLS.MUSIC.QUERY_BY_ID(id));
    return res.data?.message;
  } catch (error: IResponse | any) {
    throw new Error(error?.response?.data?.message || "Failed to delete music");
  }
}
