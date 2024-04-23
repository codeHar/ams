import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { URLS } from "../../consts";
import { BreadcrumbContext } from "../../contexts/BreadCrumbProvider";

const ArtistSchema = z.object({
  name: z.string().min(1, "First name is required"),
  dob: z
    .string()
    .min(1, "Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  gender: z.enum(["m", "f", "o"]),
  address: z.string().min(1, "Address is required"),
  first_release_year: z
    .string()
    .min(1, "First release year is required")
    .regex(/^\d{4}$/, {
      message: "Invalid year format. Please use a 4-digit year (YYYY)",
    }),
  no_of_albums_released: z
    .string()
    .min(1, "No of albums released is required")
    .default("0"),
});

type artistDataType = z.infer<typeof ArtistSchema>;

const ArtistCreatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const methods = useForm({
    resolver: zodResolver(ArtistSchema),
  });

  const { register, handleSubmit, reset } = methods;
  const { setBreadCrumbItem } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadCrumbItem([
      {
        text: "Artist",
        link: "/artist",
      },
      {
        text: id ? "Edit" : "Create",
        link: "/artist/create",
      },
    ]);
  }, [setBreadCrumbItem]);

  useEffect(() => {
    //for update
    if (id) {
      const fetchArtist = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`${URLS.ARTIST.QUERY_BY_ID(id)}`);
          const artistData: artistDataType = response?.data?.payload;
          reset({
            ...artistData,
            dob: artistData?.dob.split("T")[0],
            first_release_year: artistData?.first_release_year.toString(),
            no_of_albums_released: artistData?.no_of_albums_released.toString(),
          });
        } catch (error) {
          toast.error("Failed to fetch artist data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchArtist();
    }
  }, [id, reset]);

  const submitData = async (data: artistDataType | FieldValues) => {
    try {
      console.log({ data });
      setIsLoading(true);
      let response;
      if (id) {
        response = await axios.put(URLS.ARTIST.QUERY_BY_ID(id), data);
      } else {
        response = await axios.post(URLS.ARTIST.CREATE_ARTIST, data);
      }

      toast.success(response?.data?.message);
      navigate("/artist");
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
    <div className="create-artist">
      <div className="mb-5">
        <h2 className="page-title">{id ? "Edit" : "Create"} Artist</h2>
      </div>

      <div>
        <FormProvider {...methods}>
          <form className="mt-8 " onSubmit={handleSubmit(submitData)}>
            <div className="form-container grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="name" />

              <Input name="date of birth" registerName="dob" type="date" />

              <Input name="address" />

              <Input name="first_release_year" />

              <Input name="no_of_albums_released" type="number" />

              <div className="mb-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-semibold text-gray-800 capitalize"
                >
                  Gender
                </label>

                <select
                  id="gender"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register(`gender`)}
                >
                  <option value="m" selected>
                    Male
                  </option>
                  <option value="f">Female</option>
                  <option value="o">Other</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className={`relative min-w-full sm:min-w-60 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md  focus:outline-none `}
              >
                {id ? "Update" : "Create"}
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
