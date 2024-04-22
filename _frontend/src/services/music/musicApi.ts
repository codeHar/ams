import { useQuery } from "@tanstack/react-query";
import { getMusicOfArtist } from "./musicApiSlice";

export function useGetMusic(artistId: string) {
  return useQuery({
    queryKey: ["artistMusics"],
    queryFn: () => getMusicOfArtist(artistId),
  });
}
