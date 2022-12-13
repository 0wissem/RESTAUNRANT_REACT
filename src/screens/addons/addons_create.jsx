import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddons } from "../../store/slices/addonsSlice";
const AddAddon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ingredients } = useSelector((state) => state.ingredients);

  const [name, setName] = useState("");
  const [ingredientsAddon, setIngredientsAddon] = useState([]);

  //Add Addons
  const handleSubmit = async (event) => {
    event.preventDefault();
    const addon = {
      name,
      ingredientsAddon,
    };
    dispatch(addAddons(addon));
    navigate("/addons");
  };

  return (
    <div>
      <h2>
        <i className="fa-solid fa-burger me-3"></i>
        Create Addon
      </h2>

      <div className="line"></div>

      <div className="form-group row mb-2 mx-3">
        <label htmlFor="formName" className="col-sm-2">
          Name *
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="formName"
            className="form-control"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-3">
        <label htmlFor="formSP" className="col-sm-2">
          Ingredients*
        </label>
        <div className="col-sm-8">
          <select
            className="form-select"
            multiple
            aria-label="multiple select example"
            value={ingredientsAddon}
            onChange={(e) => {
              setIngredientsAddon(
                [...e.target.selectedOptions].map((o) => o.value)
              );
            }}
          >
            {ingredients &&
              ingredients.map((ingredient) => (
                <option
                  key={ingredient._id}
                  id={ingredient._id}
                  value={ingredient._id}
                >
                  {ingredient.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="d-flex flex-row-reverse col-sm-10 mt-3 ">
        <button
          type="submit"
          onClick={(event) => handleSubmit(event)}
          className="btn btn-primary  rounded-pill"
        >
          Add Addon
        </button>
      </div>
    </div>
  );
};

export default AddAddon;
