import { useQuery } from "@tanstack/react-query";
import { getAllArtists } from "./artistApiSlice";

export function useGetAllArtists() {
  return useQuery({
    queryKey: ["allArtists"],
    queryFn: () => getAllArtists(),
  });
}
