import { toast } from "react-toastify";
import ArtistTable from "../components/ArtistTable";
import LoadingComp from "../components/LoadingComp";
import { useGetAllArtists } from "../services";

const ArtistPage = () => {
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
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Users</h2>
      </div>
      <ArtistTable data={data} tableTitles={tableTitles} />
    </div>
  );
};

export default ArtistPage;
