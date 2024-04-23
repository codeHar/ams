import { toast } from "react-toastify";
import ArtistTable from "../../components/ArtistTable";
import LoadingComp from "../../components/LoadingComp";
import { useGetAllArtists } from "../../services";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useState } from "react";

const ArtistListPage = () => {
  const [pageNo, setPageNo] = useState(1);
  const { data, isLoading, error, isError } = useGetAllArtists(pageNo);

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
    "Address",
    "DOB",
    "First Release Year",
    "No of Albums",
    "Created at",
    "Action",
  ];

  return (
    <div className="h-full max-h-full">
      <div className="mb-5 flex justify-between items-center gap-3">
        <h2 className="text-xl font-semibold">Artists</h2>
        <Link
          to="create"
          className="py-2 px-4 rounded-md bg-primary text-white"
        >
          Add Artist
        </Link>
      </div>
      <div className=" h-[calc(100%_-_40px)] overflow-hidden">
        <div className="table-wrapper h-[calc(100%_-_68px)] mb-1 overflow-auto">
          <ArtistTable data={data?.artists} tableTitles={tableTitles} />
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

export default ArtistListPage;
