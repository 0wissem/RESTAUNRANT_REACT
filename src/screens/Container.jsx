import { Outlet } from "react-router";
import Navbar from "../components/NavbarAdmin";
import SideBar from "../components/SideBarAdmin";

const Container = () => {
  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <SideBar />
        <div id="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Container;
