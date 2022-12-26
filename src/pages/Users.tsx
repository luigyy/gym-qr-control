import React from "react";
import { Link } from "react-router-dom";
import Qrcode from "../components/Qrcode";
import { useState, useEffect } from "react";
import axios from "axios";

interface UserProps {}

//get user by name

const Users: React.FC<UserProps> = ({}) => {
  return (
    <div className="md:flex flex flex-wrap">
      {/* search user */}
      <div className="md:w-1/2 w-full p-10  h-[35vh] md:h-screen ">
        <Link to="/users/searchuser">
          <button className="btn btn-primary text-2xl m-10 flex mx-auto ">
            {" "}
            Search user
          </button>
        </Link>

        <Link to="#">
          <button className="btn btn-secondary text-2xl m-10 flex mx-auto ">
            {" "}
            Edit user
          </button>
        </Link>
      </div>
      {/* search user */}

      {/* create user  */}
      <div className="md:w-1/2 w-full md:p-10 pt-0 h-[50vh] md:h-screen ">
        <Link to="/users/createuser">
          <button className="btn text-2xl btn-secondary m-10 flex mx-auto ">
            {" "}
            Create User
          </button>
        </Link>
        <Link to="#">
          <button className="btn text-2xl btn-primary flex m-10 mx-auto ">
            {" "}
            Delete User
          </button>
        </Link>
      </div>
      {/* create user  */}
    </div>
  );
};
export default Users;
