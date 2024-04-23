import { useQuery } from "@tanstack/react-query";
import { getAllArtists } from "./artistApiSlice";

export function useGetAllArtists(pageNo: number) {
  return useQuery({
    queryKey: ["allArtists", pageNo],
    queryFn: () => getAllArtists(pageNo),
  });
}
