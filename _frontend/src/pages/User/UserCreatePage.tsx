import { useContext, useEffect, useState } from "react";
import UserForm from "../../components/UserForm";
import { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { URLS } from "../../consts";
import { registerDataType } from "../../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbContext } from "../../contexts/BreadCrumbProvider";
import { axiosInstance } from "../../utils";

const UserCreatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { setBreadCrumbItem } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadCrumbItem([
      {
        text: "User",
        link: "/user",
      },
      {
        text: id ? "Edit" : "Create",
        link: `/create/${id}`,
      },
    ]);
  }, [setBreadCrumbItem, id]);

  const submitData = async (data: registerDataType | FieldValues) => {
    try {
      setIsLoading(true);
      let response;
      if (id) {
        response = await axiosInstance.put(URLS.USER.QUERY_BY_ID(id), data);
      } else {
        response = await axiosInstance.post(URLS.USER.CREATE_USER, data);
      }

      toast.success(response?.data?.message);
      navigate("/user");
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
    <div>
      <div className="mb-5">
        <h2 className="page-title">{id ? "Edit" : "Create"} User</h2>
      </div>

      <UserForm
        submitData={submitData}
        isLoading={isLoading}
        submitBtnTitle={id ? "Update User" : "Create User"}
        id={id}
      />
    </div>
  );
};

export default UserCreatePage;
