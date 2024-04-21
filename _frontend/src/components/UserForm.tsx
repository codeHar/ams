import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "./Input";
import { IUser, createUserSchema, registerDataType } from "../interfaces";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { URLS } from "../consts";

type UserFormType = {
  submitData: (data: registerDataType | FieldValues) => void;
  isLoading: boolean;
  submitBtnTitle?: string;
  id?: string;
};

const UserForm = ({
  submitData,
  isLoading,
  submitBtnTitle = "Sign Up",
  id,
}: UserFormType) => {
  const methods = useForm({
    resolver: zodResolver(createUserSchema),
  });
  const { register, handleSubmit, reset } = methods;

  useEffect(() => {
    //for update
    if (id) {
      const fetchArtist = async () => {
        try {
          const response = await axios.get(`${URLS.USER.QUERY_BY_ID(id)}`);
          const userData: IUser = response?.data?.payload;
          reset({
            ...userData,
            dob: userData?.dob.toString().split("T")[0],
          });
        } catch (error) {
          toast.error("Failed to fetch artist data");
        }
      };

      fetchArtist();
    }
  }, [id, reset]);

  return (
    <FormProvider {...methods}>
      <form className="mt-8 " onSubmit={handleSubmit(submitData)}>
        <div className="form-container grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="first_name" />

          <Input name="last_name" />

          <Input name="email" type="email" />

          <Input name="phone" />

          <Input name="date of birth" registerName="dob" type="date" />

          <Input name="address" />

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
            {submitBtnTitle}
            {isLoading && (
              <span className="loader-container absolute right-0 mr-2 top-1/2 -translate-y-1/2">
                <span className="loader"></span>
              </span>
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserForm;
