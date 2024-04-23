import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { URLS } from "../consts";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "../components/Input";

const registerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(8, "Password must be 8 characters long"),
  phone: z
    .string()
    .min(1, "Phone no is required")
    .regex(/^\d{10}$/, "Invalid phone no"),
  dob: z
    .string()
    .min(1, "DOB is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  gender: z.enum(["m", "f", "o"]),
  address: z.string().min(1, "Address is required"),
});

type registerDataType = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { register, handleSubmit } = methods;

  const submitData = async (data: registerDataType | FieldValues) => {
    try {
      console.log({ data });

      setIsLoading(true);
      const response = await axios.post(URLS.AUTH.REGISTER, data);

      toast.success(response?.data?.message);
      navigate("/login");
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
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden py-10 px-5">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl  ring-2 md:max-w-2xl">
        <h1 className="text-3xl font-semibold text-center  uppercase">
          Sign Up
        </h1>
        <FormProvider {...methods}>
          <form className="mt-8 " onSubmit={handleSubmit(submitData)}>
            <div className="form-container grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="first_name" />

              <Input name="last_name" />

              <Input name="email" type="email" />

              <Input name="password" type="password" />

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
                className={`relative min-w-full sm:min-w-60 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md  focus:outline-none hover:text-accent`}
              >
                Sign Up
                {isLoading && (
                  <span className="loader-container absolute right-0 mr-2 top-1/2 -translate-y-1/2">
                    <span className="loader"></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </FormProvider>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-purple-600 hover:underline hover:text-accent"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
