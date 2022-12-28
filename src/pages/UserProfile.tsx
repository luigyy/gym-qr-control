import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import UserInterface from "../Interfaces/UserInterface";
import Qrcode from "../components/Qrcode";
import ProfileUserData from "../components/ProfileUserData";
import UpdateMembership from "../components/UpdateMembership";

const URL = "http://localhost:5000/user/readbyid/";
const PROFILE_IMAGE_PLACEHOLDER =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = ({}) => {
  const [updateMembership, setUpdateMembership] = useState<boolean>(false);
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
      {updateMembership ? (
        <UpdateMembership
          updateMembership={updateMembership}
          setUpdateMembership={setUpdateMembership}
          customerName={user?.name || "undefined"}
        />
      ) : (
        <ProfileUserData
          updateMembership={updateMembership}
          setUpdateMembership={setUpdateMembership}
        />
      )}
    </div>
  );
};

export default UserProfile;
