import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <div className="">
      <div className="flex justify-around navbar items-center huge:h-32 bg-neutral text-neutral-content md:px-2">
        <Link to="/">
          <span className="btn btn-ghost normal-case -tracking-widest text-lg md:text-2xl huge:text-6xl">
            Gym Control
          </span>
        </Link>
        <div className="space-x-5 ">
          <Link to="/readqr">
            <button className="text-sm huge:text-3xl md:text-base">
              {" "}
              Scan
            </button>
          </Link>
          <Link to="/users">
            <button className="text-sm huge:text-3xl md:text-base">
              {" "}
              Users{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
