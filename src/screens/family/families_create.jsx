import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFamilies, getFamilies } from "../../store/slices/familySlice";
const AddFamily = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("defaut.png");
  const [describe, setDescribe] = useState("");

  //handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      name,
      image,
      describe,
    });

    const formdata = new FormData();
    console.log(formdata);
    console.log(image);

    formdata.append("name", name);
    formdata.append("image", image);
    formdata.append("describe", describe);
    for (const value of formdata.values()) {
      console.log(value);
    }
    dispatch(addFamilies(formdata));
    dispatch(getFamilies());

    navigate("/family");
  };

  return (
    <div>
      <h2>
        <i className="fa fa-utensils me-3"></i>Create Family
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
        <label htmlFor="image" className="col-sm-2">
          Image
        </label>
        <div className="col-sm-8">
          <input
            className="form-control"
            type="file"
            id="image"
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
          Add Family
        </button>
      </div>
    </div>
  );
};

export default AddFamily;
