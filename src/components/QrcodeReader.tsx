//@ts-nocheck
//could manage to get @types/react-qr-reader working properly

import React, { useEffect } from "react";
import QrReader from "react-qr-reader";
import { useState } from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import Error from "./Error";
import Loading from "./Loading";
import axios from "axios";
import Success from "./Success";
import { Link } from "react-router-dom";

interface QrcodeReaderProps {}

const FIRST_MEAL_URL = "http://localhost:5000/firstmeal";
const SECOND_MEAL_URL = "http://localhost:5000/secondmeal";

const QrcodeReader: React.FC<QrcodeReaderProps> = ({}) => {
  //
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //

  useEffect(() => {
    setError("");
  }, [success]);

  useEffect(() => {
    setSuccess("");
  }, [error]);

  const handleScan = async (scanData) => {
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      handleSuccess(scanData);
      // setPrecScan(scanData);
    }
  };
  const handleError = () => {
    setError("Error while scanning code");
  };

  const handleSuccess = async (scanData: string) => {
    const splitData = scanData.split(" : ");

    if (splitData[0] !== "id") return setError("Invalid code");
    //
    //code valid ->
    const URL = meal === "First" ? FIRST_MEAL_URL : SECOND_MEAL_URL;
    console.log("URL " + URL);
    try {
      const response = await axios.post(URL, { _id: splitData[1] });
      console.log(response);
      const message = "Code successfully scanned!";
      //display success message
      setSuccess(message);
    } catch (err) {
      console.log(err);
      return setError(
        err.response.data.message || "Error while checking code in database"
      );
    }
  };
  //
  return (
    <div className="">
      {/* top buttons  */}
      <div className="w-[60%] flex items-center mx-auto justify-around">
        <div className="text-center p-5">
          <button
            className={`btn huge:text-4xl mt-6 huge:mt-32   ${
              startScan ? "btn-secondary" : "btn-primary"
            }`}
            onClick={() => {
              setStartScan(!startScan);
              setLoadingScan(!loadingScan);
              setData("");
              setError("");
            }}
          >
            {startScan ? "Stop Scan" : "Start Scan"}
          </button>
          <p className="p-2 text-sm text-neutral-content italic">
            Press to open camera
          </p>
        </div>
        <div
          className={`dropdown huge:mt-32 dropdown-end ${
            startScan ? "" : "hidden"
          }`}
        >
          <label
            tabIndex={0}
            className="btn m-1 md:flex md:justify-around md:w-44"
          >
            <span className="huge:"> Select camera</span>
            <span className="hidden md:inline">
              {" "}
              <BsFillCameraVideoFill />
            </span>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 "
          >
            <li onClick={(e) => setSelected("enviroment")}>
              <a>Back Camera</a>
            </li>
            <li value={"user"} onClick={(e) => setSelected("user")}>
              <a>Front Camera</a>
            </li>
          </ul>
        </div>
      </div>
      {/* top buttons  */}
      {startScan ? (
        <>
          {/* <div className="text-center">
            <ul
              className="dropdown"
              onChange={(e) => setSelected(e.target.value)}
            >
              <li value={"environment"}>Back Camera</li>
              <li value={"user"}>Front Camera</li>
            </ul>
          </div> */}
          <div className="w-1/4 min-w-[280px] huge:w-1/2 mt-3 max-h-full mx-auto ">
            <QrReader
              facingMode={selected}
              delay={1000}
              onError={handleError}
              onScan={handleScan}
              // chooseDeviceId={()=>selected}
            />
          </div>
        </>
      ) : (
        <div className="md:pt-5 h-[calc(100vh-200px)] items-center md:px-10 md:grid md:grid-cols-2   flex flex-wrap  pb-10 pt-5 ">
          <div className="p-10 m-5 h-1/2 w-full ">
            <h1 className="text-center text-4xl font-semibold ">
              <span className="text-3xl text-gray-500">#</span>No users yet?
            </h1>
            <p className="mt-5 text-center">
              If you have not added your customers yet,{" "}
            </p>
            <Link to="/users/createuser">
              <p className="text-center m-1 btn btn-circle flex justify-center md:w-1/3 w-1/3 mx-auto">
                Add one !!
              </p>{" "}
            </Link>
          </div>{" "}
          <div className=" m-5 p-10 h-full w-full ">
            <img src="../public/register.png" alt="" />
          </div>{" "}
          <div className=" m-5 p-10 h-full w-full ">
            <img src="../public/search.png" alt="" />
          </div>{" "}
          <div className=" m-5 p-10 w-full h-1/2 ">
            <h1 className="text-center  text-4xl font-semibold  ">
              <span className="text-3xl text-gray-500">#</span>Handle
              memberships
            </h1>
            <p className="text-center mt-5">
              Search for an user and see, edit and update everything regarding
              user data, including membership renewal and expiration
            </p>
            <Link to="/users/searchuser">
              <p className="text-center m-1 btn btn-circle flex justify-center md:w-1/3 w-1/3 mx-auto">
                Search user
              </p>{" "}
            </Link>
          </div>{" "}
        </div>
      )}
      {loadingScan && (
        <p className="mx-auto text-center pt-5">
          <Loading text="Scanning" />
        </p>
      )}
      {/* {data !== "" ? <p className="text-center">{data}</p> : ""} */}
      {error && error.length !== 0 ? <Error text={error} /> : ""}
      {success && success.length !== 0 ? <Success text={success} /> : ""}
    </div>
  );
};

export default QrcodeReader;
