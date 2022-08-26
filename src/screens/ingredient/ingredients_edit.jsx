import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
const EditIngredient = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/ingredient/" + id)
      .then((res) => {
        setName(res.data.name);
        setPrice(res.data.price);
        setQuantity(res.data.quantity);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
      .put(`http://localhost:3001/api/ingredient/update/${id}`, ingredient)
      .then((res) => {
        console.log(res.data);
        window.location = "/ingredient";
      });
  };

  return (
    <div>
      <h2>
        <i className="fa fa-user me-3"></i>Edit Ingredient
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
            type="text"
            id="formPrice"
            className="form-control"
            placeholder="Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formQuantity" className="col-sm-2">
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

      <div className="d-flex flex-row-reverse col-sm-10 ">
        <button
          type="submit"
          onClick={(event) => handleSubmit(event)}
          className="btn btn-primary  rounded-pill"
        >
          Edit Ingredient
        </button>
      </div>
    </div>
  );
};

export default EditIngredient;
