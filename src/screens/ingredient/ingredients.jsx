import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import {
  getIngredients,
  deleteIngredient,
} from "../../store/slices/ingredientSlice";

const Ingredients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ingredients, isloading, error } = useSelector(
    (state) => state.ingredients
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  //delete handler
  const deleteHandler = (ingredient) => {
    //alert
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this ingredient?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      dispatch(deleteIngredient(ingredient));
      if (willDelete) {
        swal("Deleted!", "Ingredient has been deleted!", "success");
        dispatch(getIngredients());
      }
    });
  };

  return (
    <div>
      <h2>
        <i className="fa fa-list me-3"></i>List of Ingredients
      </h2>

      <div className="line "></div>

      {error && (
        <div className="alert alert-primary" role="alert">
          {error}
        </div>
      )}

      <div className="row justify-content-center">
        {/* Add ingredient button  */}
        <div className="d-flex flex-row-reverse ">
          <button
            className="btn btn-primary mb-5 link"
            style={{ color: "white" }}
            onClick={() => {
              navigate("/ingredient/add");
            }}
          >
            <i className="fa-solid fa-plus me-2"></i>Add New Ingredient
          </button>
        </div>

        {/* Input search */}
        <div className="col-8 mx-auto mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa fa-search"></i>
            </span>
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-control "
            />
          </div>
        </div>

        {/* Ingredient list */}
        <table className="table  align-middle table-hover">
          <thead>
            <tr>
              <th> Name</th>
              <th> Buy price </th>
              <th> Sell price </th>
              <th> Quantity bought</th>
              <th> Quantity sell</th>
              <th> Unity</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {isloading ? (
              <tr key={Math.random()} id={Math.random()}>
                <td colSpan="7" className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : ingredients && ingredients.length > 0 ? (
              ingredients
                .filter(
                  (ingredient) =>
                    ingredient.name?.toLowerCase().includes(search) || ""
                )

                .map((ingredient) => (
                  <tr key={ingredient._id} id={ingredient._id}>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.buy_price}</td>
                    <td> {ingredient.sell_price}</td>
                    <td> {ingredient.quantity_bought}</td>
                    <td> {ingredient.quantity_sell}</td>
                    <td> {ingredient.unity}</td>

                    <td>
                      <button className="btn btn-warning me-3">
                        <NavLink
                          to={"/ingredient/edit/" + ingredient._id}
                          style={{ color: "white" }}
                        >
                          <i className="fa fa-edit"></i>
                        </NavLink>
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteHandler(ingredient);
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr key={Math.random()} id={Math.random()}>
                <td colSpan="7">
                  <div className="alert alert-secondary" role="alert">
                    There are no ingredients available
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Ingredients;
