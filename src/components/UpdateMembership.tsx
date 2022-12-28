import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";

interface UpdateMembershipProps {
  updateMembership: boolean;
  setUpdateMembership: (membershipIsActive: boolean) => void;
}

const UpdateMembership: React.FC<UpdateMembershipProps> = ({
  updateMembership,
  setUpdateMembership,
}) => {
  return (
    <div className="">
      {/* icon  */}
      <div
        className="absolute top-5 right-5 text-5xl tooltip tooltip-bottom"
        data-tip="Return"
      >
        <button onClick={() => setUpdateMembership(!updateMembership)}>
          <BsArrowReturnLeft />
        </button>
      </div>
    </div>
  );
};

export default UpdateMembership;
