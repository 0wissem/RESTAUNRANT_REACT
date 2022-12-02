import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAddons, getAddonsById } from "../../store/slices/addonsSlice";
const EditAddon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ingredients } = useSelector((state) => state.ingredients);
  const { addonsInfo } = useSelector((state) => state.addons);
  const { id } = useParams();

  const [name, setName] = useState("");
  const [ingredientsAddon, setIngredientsAddon] = useState([]);

  useEffect(() => {
    dispatch(getAddonsById(id));
  }, [id]);

  useEffect(() => {
    if (addonsInfo) {
      setName(addonsInfo.name);
      setIngredientsAddon(addonsInfo.ingredientsAddon);
    }
  }, [addonsInfo]);

  //Edit addons
  const handleSubmit = async (event) => {
    event.preventDefault();
    const addon = {
      id,
      name,
      ingredientsAddon,
    };
    console.log(addon);

    dispatch(updateAddons(addon));
    navigate("/addons");
  };

  return (
    <div>
      <h2>
        <i className="fa-solid fa-burger me-3"></i>
        Edit Addon
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
          Edit Addon
        </button>
      </div>
    </div>
  );
};

export default EditAddon;
