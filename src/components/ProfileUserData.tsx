import React, { useEffect, useState } from "react";
import UserInterface from "../Interfaces/UserInterface";

interface ProfileUserDataProps {
  user: UserInterface;
  updateMembership: boolean;
  setUpdateMembership: (updateMembership: boolean) => void;
  formatDate: (date: string) => string;
}
//
//
const TEMP_membershipIsActive = true;

const ProfileUserData: React.FC<ProfileUserDataProps> = ({
  setUpdateMembership,
  updateMembership,
  formatDate,
  user,
}) => {
  const [membershipIsActive, setMembershipIsActive] = useState<boolean>();

  useEffect(() => {
    const expiresIn = new Date(user.expiresIn);
    const today = new Date();
    today < expiresIn
      ? setMembershipIsActive(true)
      : setMembershipIsActive(false);
  }, []);

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
          className="my-3 btn bg-neutral-focus md:my-auto  "
        >
          Update Membership
        </button>
        <button className="btn my-3 btn-error md:my-auto ">Delete user </button>
      </div>
    </div>
  );
};

export default ProfileUserData;
