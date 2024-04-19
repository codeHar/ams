import userImg from "../assets/user.png";

const NavBar = () => {
  return (
    <nav className="p-5 shadow-md">
      <div className="container flex gap-3 justify-between items-center">
        <h3 className="text-4xl font-bold">AMS</h3>

        <div>
          <figure>
            <img src={userImg} width={40} height={40} />
          </figure>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
