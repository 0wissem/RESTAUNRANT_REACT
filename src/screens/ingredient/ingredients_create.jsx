import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UNITY } from "../../constants/models";
import { useDispatch } from "react-redux";
import {
  addIngredients,
  getIngredients,
} from "../../store/slices/ingredientSlice";
const AddIngredient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [sell_price, setSellPrice] = useState("");
  const [buy_price, setBuyPrice] = useState("");
  const [quantity_bought, setQuantityBought] = useState("");
  const [quantity_sell, setQuantitySell] = useState("");
  const [unity, setUnity] = useState("");

  //Add Ingredient
  const handleSubmit = async (event) => {
    event.preventDefault();

    const ingredient = {
      name,
      sell_price,
      buy_price,
      quantity_bought,
      quantity_sell,
      unity,
    };

    dispatch(addIngredients(ingredient));
    dispatch(getIngredients());

    navigate("/ingredient");
  };

  return (
    <div>
      <h2>
        <i className="fa-solid fa-utensils me-3"></i>Create Ingredient
      </h2>

      <div className="line"></div>

      <div className="form-group row mb-2 mx-2">
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

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formSP" className="col-sm-2">
          Sell Price *
        </label>
        <div className="col-sm-8">
          <input
            type="number"
            id="formSP"
            className="form-control"
            placeholder="Sell Price "
            required
            value={sell_price}
            onChange={(e) => setSellPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formBP" className="col-sm-2">
          Buy Price *
        </label>
        <div className="col-sm-8">
          <input
            type="number"
            id="formBP"
            className="form-control"
            placeholder="Buy Price"
            required
            value={buy_price}
            onChange={(e) => setBuyPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formQB" className="col-sm-2">
          Quantity Bought *
        </label>
        <div className="col-sm-8">
          <input
            type="number"
            id="formQB"
            className="form-control"
            placeholder="Quantity Bought"
            required
            value={quantity_bought}
            onChange={(e) => setQuantityBought(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formQS" className="col-sm-2">
          Quantity Sell *
        </label>
        <div className="col-sm-8">
          <input
            type="number"
            id="formQS"
            className="form-control"
            placeholder="quantity sell"
            required
            value={quantity_sell}
            onChange={(e) => setQuantitySell(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="unity" className="col-sm-2">
          Unity *
        </label>
        <div className="col-sm-8">
          <select
            id="unity"
            value={unity}
            onChange={(e) => setUnity(e.target.value)}
            className="form-select"
          >
            <option></option>
            <option name={UNITY.kilograme} value={UNITY.kilograme}>
              {UNITY.kilograme}
            </option>
            <option name={UNITY.gram} value={UNITY.gram}>
              {UNITY.gram}
            </option>
            <option name={UNITY.piece} value={UNITY.piece}>
              {UNITY.piece}
            </option>
          </select>
        </div>
      </div>

      <div className="d-flex flex-row-reverse col-sm-10 mt-3 ">
        <button
          type="submit"
          onClick={(event) => handleSubmit(event)}
          className="btn btn-primary  rounded-pill"
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
};

export default AddIngredient;
