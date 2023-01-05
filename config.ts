const URL_DEV = "http://localhost:5000";
const URL_PROD = "https://gym-qr-control-backend-izokahwdy-luigyy.vercel.app";

//
const URL_SERVER = URL_PROD;

const BACKEND_URLS = {
  GET_USER_BYNAME_URL: URL_SERVER + "/user/readbyname/",
  GET_USER_URL: URL_SERVER + "/user/readbyid/",
  EDIT_USER_URL: URL_SERVER + "/user/update/",
  CREATE_USER_URL: URL_SERVER + "/auth/register/",
  VALIDATE_QR_URL: URL_SERVER + "/auth/validateqr/",
  ADD_MONTH_URL: URL_SERVER + "/membership/addmonth/",
  DELETE_USER_URL: URL_SERVER + "/user/delete/",
  SEND_QR_URL: URL_SERVER + "/user/sendqr/",
};

export default BACKEND_URLS;
