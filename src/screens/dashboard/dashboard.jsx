import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, onlogin } from "../../store/slices/userSlice.js";

const Dashboard = () => {
  return (
    <div>
      <h2>
        <i className="fa-solid fa-gauge me-3"></i>Dashboard
      </h2>
      <div className="line "></div>
    </div>
  );
};
export default Dashboard;
