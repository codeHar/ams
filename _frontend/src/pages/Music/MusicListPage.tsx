import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingComp from "../../components/LoadingComp";
import { useGetMusic } from "../../services/music/musicApi";
import MusicTable from "../../components/MusicTable";

const MusicListPage = () => {
  const { artistId } = useParams();
  console.log({ artistId });
  const { data, isLoading, error, isError } = useGetMusic(artistId!);

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

  console.log({ data });

  const tableTitles = ["Title", "Album Name", "Genre", "Created at", "Action"];

  return (
    <div className="flex flex-col max-h-full">
      <div className="mb-5 flex justify-between items-center gap-3">
        <h2 className="text-xl font-semibold">Musics</h2>
        <Link
          to="create"
          className="py-2 px-4 rounded-md bg-primary text-white"
        >
          Add Music
        </Link>
      </div>
      <div className="table-wrapper flex-grow overflow-auto">
        <MusicTable data={data} tableTitles={tableTitles} />
      </div>
    </div>
  );
};

export default MusicListPage;
