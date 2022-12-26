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
            className={`btn huge:text-4xl huge:mt-32   ${
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
            <span className="huge:"> Select camera</span>{" "}
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
          <div className="w-1/4 min-w-[280px] huge:w-1/2 mt-10 max-h-full mx-auto ">
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
        <div className="md:pt-24 pb-10 pt-5 ">
          <h1 className="pb-10 text-center text-3xl huge:text-6xl text-primary italic font-bold">
            Press "start scan" to open camera
            <span className="text-4xl huge:text-7xl text-gray-400 text-semibold ">
              {" "}
              !
            </span>
          </h1>
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
