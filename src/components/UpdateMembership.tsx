import React, { useState } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import ModalComponent from "./ModalComponent";
import axios from "axios";
import UserBadge from "./UserBadge";
import UserInterface from "../Interfaces/UserInterface";
import Error from "./Error";
import Success from "./Success";
//

const ADD_MONTH_URL = "http://localhost:5000/membership/addmonth/";
//
function calculateDaysBetweenDates(date1: Date, date2: Date) {
  var oneDay = 24 * 60 * 60 * 1000;
  var date1InMillis = date1.getTime();
  var date2InMillis = date2.getTime();
  var days = Math.round(Math.abs(date2InMillis - date1InMillis) / oneDay);
  return days;
}
//
interface UpdateMembershipProps {
  user: UserInterface;
  setUser: (user: UserInterface) => void;
  updateMembership: boolean;
  setUpdateMembership: (membershipIsActive: boolean) => void;
  formatDate: (date: string) => string;
}

const UpdateMembership: React.FC<UpdateMembershipProps> = ({
  updateMembership,
  setUpdateMembership,
  formatDate,
  user,
  setUser,
}) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  //
  const addMonth = async () => {
    //add month in db
    try {
      const response = await axios.post(ADD_MONTH_URL + user._id);
      //add a month to user.expiresIn locally
      const newExpire = user.expiresIn ? new Date(user.expiresIn) : new Date();
      newExpire.setDate(newExpire.getDate() + 30);
      setUser({ ...user, expiresIn: newExpire.toString() });
      setSuccess("Membership successfully updated");
      //
    } catch (err) {
      setError("Error while updating membership");
    }
  };
  //
  //
  return (
    <div className="w-full">
      {/* icon  */}
      <div
        className="absolute top-5 right-5 text-5xl tooltip tooltip-bottom"
        data-tip="Return"
      >
        <button onClick={() => setUpdateMembership(!updateMembership)}>
          <BsArrowReturnLeft />
        </button>
      </div>
      {/* icon  */}
      <div className="p-10 mt-5 ">
        <p className="text-center mb-5 text-2xl tracking-tighter font-semibold">
          Membership control
        </p>
        <p className="text-center">
          Days left:{" "}
          <span className="badge badge-info mx-7 ">
            {calculateDaysBetweenDates(new Date(), new Date(user.expiresIn))}
          </span>
        </p>

        <p className="text-center">
          Expiration date:{" "}
          <span className="badge badge-info mx-7 ">
            {formatDate(user.expiresIn)}
          </span>
        </p>
        {/* content start here */}
        <div className="p-10 md:flex md:justify-around mt-20">
          <ModalComponent
            title="Add a month"
            contentTitle="Are you sure?"
            content={`This action will add a month (30 days) to ${"customer"}'s membership`}
            customButtonFunc={addMonth}
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

export default UpdateMembership;
