import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingComp from "../../components/LoadingComp";
import { useGetMusic } from "../../services/music/musicApi";
import MusicTable from "../../components/MusicTable";
import Pagination from "../../components/Pagination";
import { useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "../../contexts/BreadCrumbProvider";

const MusicListPage = () => {
  const [pageNo, setPageNo] = useState(1);
  const { artistId } = useParams();
  const { data, isLoading, error, isError } = useGetMusic(artistId!, pageNo);
  const { setBreadCrumbItem } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadCrumbItem([
      {
        text: "Artist",
        link: "/artist",
      },
      {
        text: artistId!.toString(),
        link: `/artist`,
      },
      {
        text: "Music",
        link: `/artist/${artistId}/music`,
      },
    ]);
  }, [setBreadCrumbItem]);

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
    <div className="h-full max-h-full">
      <div className="mb-5 flex justify-between items-center gap-3">
        <h2 className="text-xl font-semibold">Musics</h2>
        <Link
          to="create"
          className="py-2 px-4 rounded-md bg-primary text-white"
        >
          Add Music
        </Link>
      </div>
      <div className=" h-[calc(100%_-_40px)] overflow-hidden">
        <div className="table-wrapper h-[calc(100%_-_68px)] mb-1 overflow-auto">
          <MusicTable data={data?.music} tableTitles={tableTitles} />
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

export default MusicListPage;
