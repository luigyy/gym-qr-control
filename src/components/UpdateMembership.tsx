import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import ModalComponent from "./ModalComponent";
//

interface UpdateMembershipProps {
  customerName: string;
  updateMembership: boolean;
  setUpdateMembership: (membershipIsActive: boolean) => void;
}

const UpdateMembership: React.FC<UpdateMembershipProps> = ({
  updateMembership,
  setUpdateMembership,
  customerName,
}) => {
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
          Expire date:{" "}
          <span className="badge badge-info mx-7 ">06/04/2022</span>
        </p>
        {/* content start here */}
        <div className="p-10 md:flex md:justify-around mt-20">
          <ModalComponent
            title="Add a month"
            contentTitle="Are you sure?"
            content={`This action will add a month (30 days) to ${customerName}'s membership`}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateMembership;
