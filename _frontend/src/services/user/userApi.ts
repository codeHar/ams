import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./userApiSLice";

export function useGetAllUsers() {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: () => getAllUsers(),
  });
}
