import axios from "axios";
import { IArtist } from "../../interfaces";
import { URLS } from "../../consts";

interface IResponse {
  status: boolean;
  message: string;
  payload: IArtist[];
}

export async function getAllArtists(): Promise<IArtist[]> {
  try {
    const res = await axios.get<IResponse>(URLS.ARTIST.GET_ALL_ARTISTS);
    return res.data?.payload;
  } catch (error: IResponse | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch artists"
    );
  }
}
