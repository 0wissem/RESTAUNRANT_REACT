import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatefamily, getFamilyById } from "../../store/slices/familySlice";

const EditFamily = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { familyInfo } = useSelector((state) => state.families);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [describe, setDescribe] = useState("");

  useEffect(() => {
    dispatch(getFamilyById(id));
  }, [id]);

  useEffect(() => {
    if (familyInfo) {
      setName(familyInfo.name);
      setDescribe(familyInfo.describe);
      setImage(familyInfo.image);
    }
  }, [familyInfo]);

  //handleSubmit
  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("name", name);
    formdata.append("image", image);
    formdata.append("describe", describe);

    dispatch(updatefamily(formdata));
    navigate("/family");
  };

  return (
    <div>
      <h2>
        <i className="fa fa-user me-3"></i>Edit Family
      </h2>

      <div className="line"></div>

      <div className="form-group row mb-2 mx-2">
        <input type="hidden" value={id} />
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
          onClick={(event) => handleSubmitEdit(event)}
          className="btn btn-primary  rounded-pill"
        >
          Edit Family
        </button>
      </div>
    </div>
  );
};

export default EditFamily;
