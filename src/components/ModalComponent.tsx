import React from "react";

interface ModalComponentProps {
  title: string;
  contentTitle: string;
  content: string;
  customButtonFunc: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  title,
  content,
  contentTitle,
  customButtonFunc,
}) => {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn bg-neutral-focus">
        {title}
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{contentTitle}</h3>
          <p className="py-4">{content}</p>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn"
              onClick={customButtonFunc}
            >
              Do it!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalComponent;
