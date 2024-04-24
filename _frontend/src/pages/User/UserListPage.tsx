import { toast } from "react-toastify";
import UserTable from "../../components/UserTable";
import { useGetAllUsers } from "../../services";
import LoadingComp from "../../components/LoadingComp";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "../../contexts/BreadCrumbProvider";

const UserListPage = () => {
  const [pageNo, setPageNo] = useState(1);
  const { data, isLoading, error, isError } = useGetAllUsers(pageNo);
  const { setBreadCrumbItem } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadCrumbItem([
      {
        text: "User",
        link: "/user",
      },
    ]);
  }, [setBreadCrumbItem]);

  if (isLoading) {
    return <LoadingComp />;
  }

  if (isError) {
    toast.error(error?.message);
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
    <div className="h-full max-h-full">
      <div className="mb-5 flex justify-between items-center gap-3">
        <h2 className="text-xl font-semibold">Users</h2>
        <Link
          to="create"
          className="py-2 px-4 rounded-md bg-primary text-white"
        >
          Add User
        </Link>
      </div>
      <div className=" h-[calc(100%_-_40px)] overflow-hidden">
        <div className="table-wrapper h-[calc(100%_-_68px)] mb-1 overflow-auto">
          <UserTable data={data?.users} tableTitles={tableTitles} />
        </div>
        <Pagination
          currentPage={pageNo}
          setPageNo={setPageNo}
          totalCount={data?.totalCount}
        />
      </div>
    </div>
  );
};

export default UserListPage;
