import { toast } from "react-toastify";
import UserTable from "../../components/UserTable";
import { useGetAllUsers } from "../../services";
import LoadingComp from "../../components/LoadingComp";

const UserListPage = () => {
  const { data, isLoading, error, isError } = useGetAllUsers();

  if (isLoading) {
    return <LoadingComp />;
  }

  if (isError) {
    toast(error?.message);
    return null;
  }

  if (!data) {
    return <p>No data!</p>;
  }

  const tableTitles = [
    "Name",
    "Email",
    "Phone",
    "Address",
    "DOB",
    "Created at",
    "Action",
  ];

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Users</h2>
      </div>
      <UserTable data={data} tableTitles={tableTitles} />
    </div>
  );
};

export default UserListPage;
