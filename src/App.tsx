import Users from "./pages/Users";
import ReadQR from "./pages/ReadQR";
import SearchUser from "./pages/SearchUser";
import CreateUser from "./pages/CreateUser";
import Navbar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";
import Hero from "./pages/Hero";
import { Routes, Route } from "react-router-dom";
import NavbarLayout from "./components/NavbarLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Hero />} />
        <Route element={<NavbarLayout />}>
          <Route path="/users" element={<Users />} />
          <Route path="/users/createuser" element={<CreateUser />} />
          <Route path="/users/searchuser" element={<SearchUser />} />
          <Route path="/users/searchbyid/:id" element={<UserProfile />} />
          <Route path="/readqr" element={<ReadQR />} />
        </Route>
      </Routes>
      {/* <CreateQR /> */}
    </div>
  );
}

export default App;
