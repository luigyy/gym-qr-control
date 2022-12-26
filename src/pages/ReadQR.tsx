import React from "react";
import QrcodeReader from "../components/QrcodeReader";

interface ReadQRProps {}

const ReadQR: React.FC<ReadQRProps> = ({}) => {
  return (
    <div>
      {/* this div styles the camera  */}
      <div className="">
        <QrcodeReader />
      </div>
    </div>
  );
};

export default ReadQR;
