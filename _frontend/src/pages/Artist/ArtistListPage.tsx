import { toast } from "react-toastify";
import ArtistTable from "../../components/ArtistTable";
import LoadingComp from "../../components/LoadingComp";
import { useGetAllArtists } from "../../services";
import { Link } from "react-router-dom";

const ArtistListPage = () => {
  const { data, isLoading, error, isError } = useGetAllArtists();

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
    <div className="flex flex-col max-h-full">
      <div className="mb-5 flex justify-between items-center gap-3">
        <h2 className="text-xl font-semibold">Artists</h2>
        <Link
          to="create"
          className="py-2 px-4 rounded-md bg-primary text-white"
        >
          Add Artist
        </Link>
      </div>
      <div className="table-wrapper flex-grow overflow-auto">
        <ArtistTable data={data} tableTitles={tableTitles} />
      </div>
    </div>
  );
};

export default ArtistListPage;
