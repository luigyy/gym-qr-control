import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import UserInterface from "../Interfaces/UserInterface";
import Qrcode from "../components/Qrcode";
import Success from "../components/Success";
import QrcodeReader from "../components/QrcodeReader";

const URL = "http://localhost:5000/user/readbyid/";
const PROFILE_IMAGE_PLACEHOLDER =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

const TEMP_membershipIsActive = true;

interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = ({}) => {
  const [user, setUser] = useState<UserInterface>();
  //
  const navigate = useNavigate();
  const { id } = useParams();
  //

  //get user from db
  useEffect(() => {
    const getUser = async (id: string) => {
      const response = await axios.post(URL + id);
      console.log(response);
      setUser(response.data.data.userData);
    };
    getUser(id!).catch((err) => {
      navigate("/users/searchuser");
    });
  }, []);

  //payload to generate qr
  const payload = "id : " + id;
  return (
    <div className="relative bg-neutral md:flex md:flex-nowrap text-neutral-content md:h-[calc(100vh-150px)] p-5 rounded-3xl h-[200vh] w-80% m-10 ">
      {/* pic div  */}
      <div className="md:h-full h-screen flex flex-wrap md:w-1/4">
        <div className="md:h-1/2 w-full">
          <img
            className="rounded-full md:w-2/3 mx-auto md:mt-4 w-1/2"
            src={PROFILE_IMAGE_PLACEHOLDER}
            alt=""
          />
        </div>
        <div className="h-1/2 w-full">
          <h1 className="text-center font-semibold">
            {user?.name} {user?.lastName}
          </h1>
          <h1 className="text-center mt-5"> {user?.email}</h1>
          <div
            className="w-1/2 tooltip mt-32 md:mt-5 tooltip-info md:tooltip-left tooltip-bottom mx-auto p-5 bg-white flex justify-center"
            data-tip="Click to zoom in"
          >
            <Qrcode payload={payload} size={100} />
          </div>
        </div>
      </div>
      {/* pic div  */}
      <div className=" md:h-full h-screen w-3/4 md:p-10 pt-10">
        <div className="h-1/2 w-full md:grid md:grid-cols-3 min-[1000px]:grid-cols-2 flex flex-col">
          <div className="items-center flex justify-center">
            {" "}
            <div className="font-semibold mx-10">Join date </div>
            <span className="badge badge-info"> 06/09/69</span>{" "}
          </div>
          <div className="items-center flex justify-center">
            {" "}
            <div className="font-semibold mx-10"> Membership </div>
            {TEMP_membershipIsActive ? (
              <>
                <span className="badge badge-success"> Active </span>{" "}
              </>
            ) : (
              <>
                <span className="badge badge-error"> Inactive </span>{" "}
              </>
            )}
          </div>
          <div className="items-center flex justify-center">
            {" "}
            {TEMP_membershipIsActive ? (
              <>
                <div className="font-semibold mx-10"> Expires </div>
                <span className="badge badge-success "> 01/01/2000 </span>{" "}
              </>
            ) : (
              <>
                <div className="font-semibold mx-10"> Expired in </div>
                <span className="badge badge-error"> 31/12/1999 </span>{" "}
              </>
            )}
          </div>
        </div>
        <div className="md:h-1/2 ml-10 w-full md:flex md:flex-nowrap md:justify-around text-center ">
          <button className="my-3 btn bg-neutral-focus md:my-auto  ">
            Update Membership
          </button>
          <button className="btn my-3 btn-error md:my-auto ">
            Delete user{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
