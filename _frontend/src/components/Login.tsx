import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { URLS } from "../consts";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthProvider";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(8, "Passoword must be 8 characters long"),
});

type loginDataType = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit } = methods;

  const submitData = async (data: loginDataType | FieldValues) => {
    try {
      setIsLoading(true);
      const response = await axios.post(URLS.AUTH.LOGIN, data);
      const resData = await response.data;

      if (resData?.status === true) {
        console.log("resd", resData);
        setAuthData(resData?.payload);
        toast.success("Successfully logged in");
        navigate("/");
      }
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
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl  ring-2 md:max-w-xl">
      <h1 className="text-3xl font-semibold text-center text-primary uppercase">
        Sign in
      </h1>
      <FormProvider {...methods}>
        <form className="mt-8" onSubmit={handleSubmit(submitData)}>
          <Input name="email" type="email" />

          <Input name="password" type="password" />

          <div className="mt-6">
            <button
              className={`relative w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:text-accent focus:outline-none `}
            >
              Login
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
        Don't have an account?
        <Link
          to="/register"
          className="font-medium text-purple-600 hover:underline hover:text-accent"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
