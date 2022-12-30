import UsersCrudPage from "./pages/UserCrud";
import ReadQR from "./pages/ReadQR";
import SearchUser from "./pages/SearchUser";
import CreateUser from "./pages/CreateUser";
import UserProfile from "./pages/UserProfile";
import SearchForEditUser from "./pages/SearchForEditUser";
import EditUser from "./pages/EditUser";
import Hero from "./pages/Hero";
import { Routes, Route } from "react-router-dom";
import NavbarLayout from "./components/NavbarLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Hero />} />
        <Route element={<NavbarLayout />}>
          <Route path="/users" element={<UsersCrudPage />} />
          <Route path="/users/createuser" element={<CreateUser />} />
          <Route path="/users/searchuser" element={<SearchUser />} />
          <Route path="/users/searchbyid/:id" element={<UserProfile />} />
          <Route path="/users/edituser" element={<SearchForEditUser />} />
          <Route path="/users/edituser/:id" element={<EditUser />} />
          <Route path="/readqr" element={<ReadQR />} />
        </Route>
      </Routes>
      {/* <CreateQR /> */}
    </div>
  );
}

export default App;
