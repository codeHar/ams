import { useNavigate } from "react-router-dom";
import { IArtist } from "../interfaces";
import ActionButtons from "./ActionButtons";

type ArtistTableType = {
  data: IArtist[];
  tableTitles: string[];
};

const ArtistTable = ({ data, tableTitles }: ArtistTableType) => {
  const navigate = useNavigate();

  const onEdit = (id: number) => {
    navigate(`create/${id}`);
  };

  const onDelete = () => {};

  return (
    <div>
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
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistTable;
