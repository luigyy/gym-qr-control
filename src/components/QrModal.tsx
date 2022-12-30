import React from "react";
import Qrcode from "./Qrcode";

interface QrModalProps {
  payload: string;
}

const QrModal: React.FC<QrModalProps> = ({ payload }) => {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="">
        <Qrcode payload={payload} size={100} />
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <p className="py-4 w-full">
            <Qrcode payload={payload} size={300} />
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn text-center ml-20">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrModal;
