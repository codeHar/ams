import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const HomePage = () => {
  return (
    <div className="w-full max-h-screen h-screen ">
      <NavBar />
      <div className="main-layout flex">
        <SideBar />
        <div className="main-content w-4/5 bg-gray-200 h-full p-5">
          <div className="bg-white rounded-lg h-full p-5 overflow-auto">
            asdasd
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
