import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

interface NavbarLayoutProps {}

const NavbarLayout: React.FC<NavbarLayoutProps> = ({}) => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default NavbarLayout;
