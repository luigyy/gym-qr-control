import React from "react";

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text }) => {
  return <button className="btn loading">{text || ""}</button>;
};

export default Loading;
