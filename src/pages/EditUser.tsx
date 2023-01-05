import React, { useState, useEffect } from "react";
import UserInterface from "../Interfaces/UserInterface";
import axios from "axios";
import Error from "../components/Error";
import Success from "../components/Success";
import { useParams, useNavigate } from "react-router-dom";
import BACKEND_URLS from "../../config";

const { GET_USER_URL, EDIT_USER_URL } = BACKEND_URLS;
//
interface EditUserProps {}

const EditUser: React.FC<EditUserProps> = ({}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  //error handling
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  //error handling
  //
  //form fields
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  //form fields
  //
  useEffect(() => {
    //get user
    const getUser = async (id: string) => {
      try {
        const response = await axios.post(GET_USER_URL + id);
        setEmail(response.data.data.userData.email);
        setName(response.data.data.userData.name);
        setLastName(response.data.data.userData.lastName);
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };
    getUser(id!);
    //fill form with userdata
  }, []);
  //

  //handler functions
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

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const update = { name, lastName, email };
    try {
      await axios.post(EDIT_USER_URL + id, update);
      console.log(await axios.post(EDIT_USER_URL + id, update));
      setSuccess("User successfully updated");
    } catch (err) {
      setError(" Error while updating user information");
    }
  };
  //
  useEffect(() => {
    setError("");
    setSuccess("");
  }, [name, email, lastName]);
  return (
    <div>
      <div>
        <h1 className="w-[80%] md:max-w-[400px] mt-8 text-center mx-auto text-xl font-semibold bg-neutral px-5 py-2 rounded-3xl">
          Update user information
        </h1>
        <form className="w-full max-w-lg p-10  mx-auto">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block  uppercase tracking-wide text-xs font-bold mb-2">
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
              <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
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
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
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
            Edit user
          </button>
        </form>
        {error !== "" ? <Error text={error} /> : ""}
        {success !== "" ? <Success text={success} /> : ""}
      </div>
    </div>
  );
};

export default EditUser;
