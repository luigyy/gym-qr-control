import React, { useState } from "react";
import axios from "axios";
import Error from "../components/Error";
import Success from "../components/Success";

interface CreateUserProps {}

const REGISTER_URL = "http://localhost:5000/auth/register";

const CreateUser: React.FC<CreateUserProps> = ({}) => {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  //

  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  //
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLastName(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    axios
      .post(REGISTER_URL, { name, lastName, email })
      .then((res) => {
        //@ts-ignore
        setSuccess(res.data.message || "Register successfully!");
        setError("");
      })
      .catch((err) => {
        //@ts-ignore
        setError(
          err.response.data.message || "There was an error while registering"
        );
        setSuccess("");
      });
  };

  return (
    <div>
      <form className="w-full max-w-lg p-10  mx-auto">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-secondary uppercase tracking-wide text-xs font-bold mb-2">
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Name"
              value={name || ""}
              onChange={(e) => handleName(e)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-secondary text-xs font-bold mb-2">
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Last name"
              value={lastName || ""}
              onChange={(e) => handleLastname(e)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-secondary text-xs font-bold mb-2">
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="email"
              placeholder="email@gmail.com"
              value={email || ""}
              onChange={(e) => handleEmail(e)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={(e) => handleSubmit(e)}
        >
          {" "}
          Create user
        </button>
      </form>
      {error !== "" ? <Error text={error} /> : ""}
      {success !== "" ? <Success text={success} /> : ""}
    </div>
  );
};

export default CreateUser;
