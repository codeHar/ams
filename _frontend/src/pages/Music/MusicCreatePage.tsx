import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { URLS } from "../../consts";
import { axiosInstance } from "../../utils";

const MusicSchema = z.object({
  title: z.string().min(1, "Title is required"),
  album_name: z.string().min(1, "Album name is required"),
  genre: z.enum(["rnb", "country", "classic", "rock", "jazz"]),
});

type musicDataType = z.infer<typeof MusicSchema>;

const ArtistCreatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { artistId, musicId } = useParams();

  console.log({ artistId, musicId });
  const methods = useForm({
    resolver: zodResolver(MusicSchema),
  });

  const { register, handleSubmit, reset } = methods;

  useEffect(() => {
    //for update
    if (musicId) {
      const fetchArtist = async () => {
        try {
          setIsLoading(true);
          const response = await axiosInstance.get(
            `${URLS.MUSIC.QUERY_BY_ID(musicId)}`
          );
          const artistData: musicDataType = response?.data?.payload;
          reset({
            ...artistData,
          });
        } catch (error) {
          toast.error("Failed to fetch music data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchArtist();
    }
  }, [musicId, reset]);

  const submitData = async (data: musicDataType | FieldValues) => {
    try {
      console.log({ data });
      setIsLoading(true);

      let response;
      if (musicId) {
        response = await axiosInstance.put(
          URLS.MUSIC.QUERY_BY_ID(musicId),
          data
        );
      } else {
        response = await axiosInstance.post(URLS.MUSIC.BASE_URL, {
          ...data,
          artistId,
        });
      }

      toast.success(response?.data?.message);
      navigate(`/artist/${artistId}/music`);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message);
      } else {
        console.log("error :", err);
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-music">
      <div className="mb-5">
        <h2 className="page-title">Create Music</h2>
      </div>

      <div>
        <FormProvider {...methods}>
          <form className="mt-8 " onSubmit={handleSubmit(submitData)}>
            <div className="form-container grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="title" />

              <Input name="album_name" />

              <div className="mb-2">
                <label
                  htmlFor="genre"
                  className="block text-sm font-semibold text-gray-800 capitalize"
                >
                  Genre
                </label>

                <select
                  id="genre"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register(`genre`)}
                >
                  <option value="rnb" selected>
                    RNB
                  </option>
                  <option value="country">Country</option>
                  <option value="classic">Classic</option>
                  <option value="rock">Rock</option>
                  <option value="jazz">Jazz</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className={`relative min-w-full sm:min-w-60 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md  focus:outline-none `}
              >
                {musicId ? "Update" : "Create"}
                {isLoading && (
                  <span className="loader-container absolute right-0 mr-2 top-1/2 -translate-y-1/2">
                    <span className="loader"></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ArtistCreatePage;
