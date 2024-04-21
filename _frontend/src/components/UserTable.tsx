import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces";
import ActionButtons from "./ActionButtons";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { deleteUser } from "../services";

type UserTableType = {
  data: IUser[];
  tableTitles: string[];
};

const UserTable = ({ data, tableTitles }: UserTableType) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const onEdit = (id: number) => {
    navigate(`create/${id}`);
  };

  const onDelete = async (id: number) => {
    mutate(id.toString());
  };

  return (
    <table>
      <thead>
        <tr>
          {tableTitles &&
            tableTitles.map((title: string, i: number) => (
              <th key={"ct" + i}>{title}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, id: number) => (
          <tr key={"usert" + id}>
            <td>
              {item.first_name} {item.last_name}
            </td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.address}</td>
            <td>{item.dob?.toString().split("T")[0]}</td>
            <td>{item.created_at?.toString().split("T")[0]}</td>
            <td>
              <ActionButtons
                onEdit={() => onEdit(item?.id)}
                onDelete={() => onDelete(item?.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
