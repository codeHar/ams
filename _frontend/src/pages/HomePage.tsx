import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { BreadcrumbProvider } from "../contexts/BreadCrumbProvider";
import Breadcrumb from "../components/BreadCrumb";

const HomePage = () => {
  return (
    <div className="w-full max-h-screen h-screen ">
      <NavBar />
      <BreadcrumbProvider>
        <div className="main-layout flex">
          <SideBar />
          <div className="main-content w-4/5 bg-gray-200 h-full p-5">
            <Breadcrumb />
            <div className="bg-white rounded-lg h-[calc(100%_-_32px)] p-5 overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </BreadcrumbProvider>
    </div>
  );
};

export default HomePage;
