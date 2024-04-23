import { useContext } from "react";
import userImg from "../assets/user.png";
import AuthContext from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { getUserName, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar p-5 shadow-md">
      <div className="container flex gap-3 justify-between items-center">
        <h3
          className="text-4xl font-bold cursor-pointer"
          onClick={() => navigate("")}
        >
          AMS
        </h3>

        <div className="nav-profile flex gap-3 items-center cursor-pointer relative">
          <figure>
            <img src={userImg} width={40} height={40} />
          </figure>
          <p className="capitalize">{getUserName()}</p>

          <div className="nav-actions absolute top-full left-0 hidden p-1 ">
            <ul className="mt-1 py-1 px-2 bg-gray-300 rounded-md min-w-14">
              <li
                className="text-center font-semibold px-2 py-1"
                onClick={() => logOut()}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
