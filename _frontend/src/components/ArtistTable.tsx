import { useNavigate } from "react-router-dom";
import { IArtist } from "../interfaces";
import ActionButtons from "./ActionButtons";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArtist } from "../services";

type ArtistTableType = {
  data: IArtist[];
  tableTitles: string[];
};

const ArtistTable = ({ data, tableTitles }: ArtistTableType) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteArtist(id),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["allArtists"] });
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
          <tr key={"artistt" + id}>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>{item.dob?.toString().split("T")[0]}</td>
            <td>{item.first_release_year}</td>
            <td>{item.no_of_albums_released}</td>
            <td>{item.created_at?.toString().split("T")[0]}</td>
            <td>
              <ActionButtons
                onEdit={() => onEdit(item?.id)}
                onDelete={() => onDelete(item?.id)}
                canViewMusic={true}
                onViewMusic={() => navigate(`${item?.id}/music`)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ArtistTable;
