import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces";
import ActionButtons from "./ActionButtons";

type UserTableType = {
  data: IUser[];
  tableTitles: string[];
};

const UserTable = ({ data, tableTitles }: UserTableType) => {
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

export default UserTable;
