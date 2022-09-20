import React, { useEffect, useState } from "react";
import axios from "axios";
const AddRecipe = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("defaut.png");
  const [describe, setDescribe] = useState("");
  const [price, setPrice] = useState("");
  const [role, setRole] = useState(null);
  const [family, setFamily] = useState(null);
  const [families, setFamilies] = useState([]);
  console.log({ families });
  useEffect(() => {
    try {
      axios.get(`http://localhost:3001/api/family/`).then((response) => {
        if (response.data) setFamilies(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  //handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      name,
      image,
      describe,
      price,
    });

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("image", image);
    formdata.append("price", price);
    formdata.append("describe", describe);
    formdata.append("family", family);
    try {
      await axios
        .post("http://localhost:3001/api/recipe/add", formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
          window.location = "/recipe";
        });
    } catch (error) {
      console.log(error, "recipe_create");
    }
  };

  return (
    <div>
      <h2>
        <i className="fa fa-user me-3"></i>Create Recipe
      </h2>

      <div className="line"></div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formName" className="col-sm-2">
          Name*
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
          Image
        </label>
        <div className="col-sm-8">
          <input
            className="form-control"
            type="file"
            id="image"
            filename="image"
            value={image}
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
          Add Recipe
        </button>
      </div>
    </div>
  );
};

export default AddRecipe;
