import { useQuery } from "@tanstack/react-query";
import { getMusicOfArtist } from "./musicApiSlice";

export function useGetMusic(artistId: string, pageNo: number) {
  return useQuery({
    queryKey: ["artistMusics", pageNo],
    queryFn: () => getMusicOfArtist(artistId, pageNo),
  });
}
