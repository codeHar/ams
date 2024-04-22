import { useNavigate } from "react-router-dom";
import { IMusic } from "../interfaces";
import ActionButtons from "./ActionButtons";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArtist } from "../services";
import { deleteMusic } from "../services/music";

type MusicTableType = {
  data: IMusic[];
  tableTitles: string[];
};

const MusicTable = ({ data, tableTitles }: MusicTableType) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteMusic(id),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["artistMusics"] });
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
          <tr key={"musicc" + id}>
            <td>{item.title}</td>
            <td>{item.album_name}</td>
            <td>{item.genre}</td>
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

export default MusicTable;
