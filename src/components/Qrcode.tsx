import React from "react";
import QRcode from "react-qr-code";

interface QrcodeProps {
  payload: string;
  size: number;
}

const Qrcode: React.FC<QrcodeProps> = ({ payload, size }) => {
  return (
    <div>
      <QRcode size={size} value={payload} />
    </div>
  );
};

export default Qrcode;
