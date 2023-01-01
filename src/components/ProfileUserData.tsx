import React, { useEffect, useState } from "react";
import UserInterface from "../Interfaces/UserInterface";
import ModalComponent from "./ModalComponent";
import axios from "axios";
import Error from "./Error";
import Success from "./Success";
import { useNavigate } from "react-router-dom";

const DELETE_USER_URL = "http://localhost:5000/user/delete/";
const SEND_QR_URL = "http://localhost:5000/user/sendqr/";

interface ProfileUserDataProps {
  user: UserInterface;
  updateMembership: boolean;
  setUpdateMembership: (updateMembership: boolean) => void;
  formatDate: (date: string) => string;
}
//
//

const ProfileUserData: React.FC<ProfileUserDataProps> = ({
  setUpdateMembership,
  updateMembership,
  formatDate,
  user,
}) => {
  const navigate = useNavigate();
  const [membershipIsActive, setMembershipIsActive] = useState<boolean>();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const expiresIn = new Date(user.expiresIn);
    const today = new Date();
    today < expiresIn
      ? setMembershipIsActive(true)
      : setMembershipIsActive(false);
  }, []);
  //
  const deleteUser = async () => {
    try {
      await axios.post(DELETE_USER_URL + user._id);
      setSuccess("User successfully deleted");
      navigate("/users/searchuser");
    } catch (err) {
      setError("Error while deleting user");
    }
  };
  //
  const sendQr = async () => {
    try {
      await axios.post(SEND_QR_URL + user._id);
      setSuccess("QR code successfully sent to user' email");
    } catch (err) {
      setError("Error when sending email to user");
    }
  };
  //
  return (
    <div className=" md:h-full h-screen w-3/4 md:p-10 pt-10">
      <div className="h-1/2 w-full md:grid md:grid-cols-3 min-[1000px]:grid-cols-2 flex flex-col">
        <div className="items-center flex justify-center">
          {" "}
          <div className="font-semibold mx-10">Join date </div>
          <span className="badge badge-info">
            {formatDate(user.createdAt)}
          </span>{" "}
        </div>
        <div className="items-center flex justify-center">
          {" "}
          <div className="font-semibold mx-10"> Membership </div>
          {membershipIsActive ? (
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
          {membershipIsActive ? (
            <>
              <div className="font-semibold mx-10"> Expires </div>
              <span className="badge badge-success ">
                {" "}
                {formatDate(user.expiresIn)}{" "}
              </span>{" "}
            </>
          ) : (
            <>
              <div className="font-semibold mx-10"> Expired in </div>
              <span className="badge badge-error">
                {" "}
                {formatDate(user.expiresIn)}
              </span>{" "}
            </>
          )}
        </div>
      </div>
      <div className="md:h-1/2 ml-10 w-full md:flex md:flex-nowrap md:justify-around text-center ">
        <button
          onClick={() => setUpdateMembership(!updateMembership)}
          className="tooltip tooltip-top my-3 btn bg-neutral-focus md:my-auto  "
          data-tip="Go to update membership page"
        >
          Update Membership
        </button>
        <button
          className="tooltip tooltip-top  btn bg-neutral-focus my-auto"
          data-tip="Send email with QR Code"
          onClick={sendQr}
        >
          Send <span className="text-primary"> QR</span>
        </button>
        <div
          className="tooltip tooltip-top tooltip-error my-3 md:my-auto"
          data-tip="Delete user"
        >
          <ModalComponent
            title="Delete"
            content="Deletion of an user is an irreversible action!"
            contentTitle="Are you sure you want to delete?"
            customButtonFunc={deleteUser}
            buttonStyle="btn-error"
          />
        </div>
      </div>
      <div
        className="mx-auto"
        onClick={() => {
          setError("");
          setSuccess("");
        }}
      >
        {error.length === 0 ? "" : <Error text={error} />}
        {success.length === 0 ? "" : <Success text={success} />}
      </div>
    </div>
  );
};

export default ProfileUserData;
