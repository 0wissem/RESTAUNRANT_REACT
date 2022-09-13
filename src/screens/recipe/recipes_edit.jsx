import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import axios from "axios";
const EditRecipe = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [describe, setDescribe] = useState("");
  const [price, setPrice] = useState("");
  const [family, setFamily] = useState(null);
  const [families, setFamilies] = useState([]);
  useEffect(() => {
    try {
      axios.get(`http://localhost:3001/api/family/`).then((response) => {
        if (response.data) {
          setFamilies(response.data);
          setFamily(response.data?.[0]?._id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/recipe/" + id)
      .then((res) => {
        setName(res.data.name);
        setDescribe(res.data.describe);
        setImage(res.data.image);
        setPrice(res.data.price);
        setFamily(res.data.family);
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
      image,
      price,
      describe,
    });

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("image", image);
    formdata.append("price", price);
    formdata.append("describe", describe);
    formdata.append("family", family);

    await axios
      .put(`http://localhost:3001/api/recipe/update/${id}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        // window.location = "/recipe";
      });
  };

  return (
    <div>
      <h2>
        <i className="fa fa-user me-3"></i>Edit Recipe
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
            placeholder="Name of recipe"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formPrice" className="col-sm-2">
          Family*
        </label>
        <div className="col-sm-8">
          <select
            required
            defaultValue="select"
            value={family}
            onChange={(e) => {
              setFamily(e.target.value);
            }}
            className="form-select"
            aria-label="Default select example"
          >
            {families.map((family) => (
              <option name="family" value={family._id}>
                {family.name}
              </option>
            ))}
          </select>
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
            placeholder="Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="image" className="col-sm-2">
          Image *
        </label>
        <div className="col-sm-8">
          <input
            className="form-control"
            type="file"
            id="image"
            required="required"
            filename="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formDescribe" className="col-sm-2">
          Describe
        </label>
        <div className="col-sm-8">
          <textarea
            rows="8"
            className="form-control"
            id="formDescribe"
            value={describe}
            onChange={(e) => setDescribe(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex flex-row-reverse col-sm-10 ">
        <button
          type="submit"
          onClick={(event) => handleSubmit(event)}
          className="btn btn-primary  rounded-pill"
        >
          Edit Recipe
        </button>
      </div>
    </div>
  );
};

export default EditRecipe;
