import { useRef } from "react";
import { importIcon } from "../../assets/svg";
import Tooltip from "../../components/ToolTip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { importArtist } from "../../services";

const ImportButton = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => importArtist(data),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["allArtists"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const handleImport = (e: any) => {
    if (e?.target?.files.length > 0) {
      const data = new FormData();
      data.append("csv", e.target.files[0]);

      mutate(data);
    }
  };

  return (
    <Tooltip text="Import Artists">
      <span onClick={() => inputRef?.current?.click()}>
        <input
          id="file"
          type="file"
          ref={inputRef}
          onChange={(e) => handleImport(e)}
          hidden
        ></input>
        {importIcon}
      </span>
    </Tooltip>
  );
};

export default ImportButton;
