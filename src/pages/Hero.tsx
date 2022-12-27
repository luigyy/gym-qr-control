import React from "react";
import { Link } from "react-router-dom";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold tracking-tighter">
            {" "}
            Easy tracking!{" "}
          </h1>
          <p className="mb-5">
            Keep track of your customers by automatically providing QR codes via
            email and scan this codes all{" "}
            <span className="text-accent">automatically</span> and{" "}
            <span className="text-accent"> free</span>!
          </p>
          <Link to="/readqr">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
