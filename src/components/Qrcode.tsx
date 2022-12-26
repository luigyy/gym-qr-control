import React from "react";
import QRcode from "react-qr-code";

interface QrcodeProps {
  payload: string;
  size: number;
}

const Qrcode: React.FC<QrcodeProps> = ({ payload, size }) => {
  return (
    <div className="p-10 mb-5 bg-white">
      <div>
        <QRcode size={size} value={payload} />
      </div>
    </div>
  );
};

export default Qrcode;
