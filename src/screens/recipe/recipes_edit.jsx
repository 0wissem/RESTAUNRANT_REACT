import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipe, getRecipesById } from "../../store/slices/recipesSlice";

const EditRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { recipesInfo } = useSelector((state) => state.recipes);
  const { familyInfo } = useSelector((state) => state.families);
  const { ingredients } = useSelector((state) => state.ingredients);

  const [name, setName] = useState("");
  const [image, setImage] = useState("defaut.png");
  const [describe, setDescribe] = useState("");
  const [price, setPrice] = useState("");
  const [ingredientsRecipes, setIngredientsRecipes] = useState([]);

  useEffect(() => {
    dispatch(getRecipesById(id));
  }, [id]);

  useEffect(() => {
    if (recipesInfo) {
      console.log(ingredientsRecipes);
      setName(recipesInfo.name);
      setIngredientsRecipes(recipesInfo.ingredientsRecipes);
      console.log(ingredientsRecipes);

      setImage(recipesInfo.image);
      setDescribe(recipesInfo.describe);
      setPrice(recipesInfo.price);
    }
  }, [recipesInfo]);

  //addRecipe
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("name", name);
    formdata.append("image", image);
    formdata.append("price", price);
    formdata.append("describe", describe);
    formdata.append("family", recipesInfo.family);
    ingredientsRecipes.forEach((ingredientRecipe) =>
      formdata.append("ingredientsRecipes", ingredientRecipe)
    );
    try {
      dispatch(updateRecipe(formdata));
      navigate("/family");
    } catch (error) {
      console.log(error, "Error");
    }
  };

  return (
    <div>
      <h2>
        <i className="fa fa-user me-3"></i>Edit Recipe of the family "
        {familyInfo.name} "
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

      <div className="form-group row mb-2 mx-3">
        <label htmlFor="formSP" className="col-sm-2">
          Ingredients*
        </label>
        <div className="col-sm-8">
          <select
            className="form-select"
            multiple
            aria-label="multiple select example"
            value={ingredientsRecipes}
            onChange={(e) => {
              setIngredientsRecipes(
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
          Edit Recipe
        </button>
      </div>
    </div>
  );
};

export default EditRecipe;
