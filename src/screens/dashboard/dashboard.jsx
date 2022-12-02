import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, onlogin } from "../../store/slices/userSlice.js";
import { getAddons } from "../../store/slices/addonsSlice";
import { getIngredients } from "../../store/slices/ingredientSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAddons());
    dispatch(getIngredients());
  }, [dispatch]);

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
