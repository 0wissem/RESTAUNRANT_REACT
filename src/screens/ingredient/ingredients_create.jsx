import React, { useState } from "react";
import axios from "axios";
const AddIngredient = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  //handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      name,
      price,
      quantity,
    });

    const ingredient = {
      name,
      price,
      quantity,
    };

    await axios
      .post("http://localhost:3001/api/ingredient/add", ingredient)
      .then((res) => {
        console.log(res.data);
        window.location = "/ingredient";
      });
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
        <label htmlFor="formPrice" className="col-sm-2">
          Price *
        </label>
        <div className="col-sm-8">
          <input
            type="number"
            id="formPrice"
            className="form-control"
            placeholder="Price "
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formQte" className="col-sm-2">
          Quantity *
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="formQte"
            className="form-control"
            placeholder="Quantity"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
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
