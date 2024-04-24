import { toast } from "react-toastify";
import ArtistTable from "../../components/ArtistTable";
import LoadingComp from "../../components/LoadingComp";
import { useGetAllArtists } from "../../services";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useContext, useEffect, useRef, useState } from "react";
import { BreadcrumbContext } from "../../contexts/BreadCrumbProvider";
import { exportIcon, importIcon } from "../../assets/svg";
import axios from "axios";
import { URLS } from "../../consts";
import Tooltip from "../../components/ToolTip";
import ImportButton from "./ImportButton";

const ArtistListPage = () => {
  const [pageNo, setPageNo] = useState(1);
  const { data, isLoading, error, isError } = useGetAllArtists(pageNo);

  const { setBreadCrumbItem } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadCrumbItem([
      {
        text: "Artist",
        link: "/artist",
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
    "Address",
    "DOB",
    "First Release Year",
    "No of Albums",
    "Created at",
    "Action",
  ];

  const exportArtistToCSV = async () => {
    try {
      const response = await axios.get(URLS.ARTIST.EXPORT_CSV, {
        responseType: "blob",
      });

      const blob = await response.data;
      // Create a link element
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "artists.csv";
      document.body.appendChild(a);

      // Click the link to start the download
      a.click();

      // Remove the link element
      document.body.removeChild(a);

      // Revoke the Object URL to free up resources
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div className="h-full max-h-full">
      <div className="mb-5 flex justify-between items-center gap-3">
        <h2 className="text-xl font-semibold">Artists</h2>
        <div className="artistActions flex gap-4 items-center">
          <ImportButton />
          <Tooltip text="Export Artists">
            <span onClick={exportArtistToCSV}>{exportIcon}</span>
          </Tooltip>
          <Link
            to="create"
            className="py-2 px-4 rounded-md bg-primary text-white"
          >
            Add Artist
          </Link>
        </div>
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
