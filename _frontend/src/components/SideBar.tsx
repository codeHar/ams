import { useLocation, useNavigate } from "react-router-dom";
import { artistIcon, userIcon } from "../assets/svg";

type Route = {
  title: string;
  icon: JSX.Element;
  link: string;
};

const sidebarRoutes: Route[] = [
  {
    title: "User",
    icon: userIcon,
    link: "/user",
  },
  {
    title: "Artist",
    icon: artistIcon,
    link: "/artist",
  },
];

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log({ location });

  const checkActive = (link: string) => {
    const pattern = new RegExp(`^${link}(\/.*)?$`);
    return pattern.test(location.pathname);
  };

  return (
    <div className="sidebar h-full w-1/5 shadow-md ">
      <ul className="h-full overflow-auto py-5 px-10 flex flex-col gap-3">
        {sidebarRoutes &&
          sidebarRoutes.map((route: Route, index: number) => (
            <li
              key={"sidebar" + index}
              onClick={() => navigate(route.link)}
              className={checkActive(route.link) ? "active" : ""}
            >
              {route.icon}
              {route.title}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SideBar;
