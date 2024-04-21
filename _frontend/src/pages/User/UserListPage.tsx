import { toast } from "react-toastify";
import UserTable from "../../components/UserTable";
import { useGetAllUsers } from "../../services";
import LoadingComp from "../../components/LoadingComp";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col max-h-full">
      <div className="mb-5 flex justify-between items-center gap-3">
        <h2 className="text-xl font-semibold">Users</h2>
        <Link
          to="create"
          className="py-2 px-4 rounded-md bg-primary text-white"
        >
          Add User
        </Link>
      </div>
      <div className="table-wrapper flex-grow overflow-auto">
        <UserTable data={data} tableTitles={tableTitles} />
      </div>
    </div>
  );
};

export default UserListPage;
