import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAddons } from "../../store/slices/addonsSlice";
import { getIngredients } from "../../store/slices/ingredientSlice";
import { getFamilies } from "../../store/slices/familySlice";
import { getRecipes } from "../../store/slices/recipesSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAddons());
    dispatch(getIngredients());
    dispatch(getFamilies());
    dispatch(getRecipes());
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
