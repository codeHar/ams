import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./userApiSLice";

export function useGetAllUsers(pageNo: number) {
  return useQuery({
    queryKey: ["allUsers", pageNo],
    queryFn: () => getAllUsers(pageNo),
  });
}
