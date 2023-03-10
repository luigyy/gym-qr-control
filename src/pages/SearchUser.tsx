import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import UserBadge from "../components/UserBadge";
import UserInterface from "../Interfaces/UserInterface";
import BACKEND_URLS from "../../config";

interface SearchUserProps {
  customURL?: string;
}

const { GET_USER_BYNAME_URL } = BACKEND_URLS;

const SearchUser: React.FC<SearchUserProps> = ({ customURL }) => {
  const [name, setName] = useState<string>();
  const [users, setUsers] = useState<UserInterface[]>();

  //handle errors
  const [error, setError] = useState<string | boolean>();

  //get users
  const getUsersByName = (name: any): void => {
    axios
      .post(GET_USER_BYNAME_URL + name)
      .then((res) => {
        setUsers(res.data.data.userData);
        setError(false);
      })
      .catch((err) =>
        setError("There was an error while retrieving user from database")
      );
  };

  const onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.currentTarget.value);
  };

  const onSubmit = () => {
    getUsersByName(name);
  };

  return (
    <div>
      {/* search bar */}
      <div className="form-control min-w-[280px] ">
        <div className="input-group flex justify-center p-10 ">
          <input
            type="text"
            placeholder="Search…"
            value={name || ""}
            className="input input-bordered"
            onChange={(e) => onNameChange(e)}
          />
          <button className="btn btn-square " onClick={onSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* search bar */}
      <div className="h-[calc(100vh-200px)] bg-neutral rounded-3xl overflow-y-scroll w-[80%] mx-auto">
        {users?.map((user, index) => (
          <>
            <UserBadge
              key={user.email}
              id={user._id}
              name={user.name}
              lastName={user.lastName}
              email={user.email}
              customURL={customURL}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default SearchUser;
