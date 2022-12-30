import React from "react";

interface LoadingPageProps {}

const LoadingPage: React.FC<LoadingPageProps> = ({}) => {
  return (
    <div className="w-full h-screen text-center">
      <div className="w-1/2 h-1/2 m-auto">
        <button className="btn loading w-1/2 mt-48 text-xl">loading</button>
      </div>
    </div>
  );
};

export default LoadingPage;
