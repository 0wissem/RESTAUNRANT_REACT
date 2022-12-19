import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FamilyCard from "../../components/FamilyCard/FamilyCard";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getFamilies,
  getFamilyById,
  deletefamily,
} from "../../store/slices/familySlice";
import { getRecipes, deleteRecipe } from "../../store/slices/recipesSlice";

import swal from "sweetalert";

const Family = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { families, isloading, error, familyInfo } = useSelector(
    (state) => state.families
  );
  const { recipes } = useSelector((state) => state.recipes);
  const [familyId, setfamilyId] = useState(null);
  const [recipesByFamily, setRecipesByFamily] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getFamilies());
    dispatch(getRecipes());

    try {
      if (familyId) {
        const recipesByFamily = recipes.filter((recipe) => {
          return recipe.family === familyId;
        });

        setRecipesByFamily(recipesByFamily);
      } else {
        dispatch(getFamilies());
      }
    } catch (error) {
      console.log("get recipes by family id", error);
    }
  }, [familyId]);

  const onFamilySelection = (id) => {
    setfamilyId(id);

    dispatch(getFamilyById(id));
    console.log("get array of family by: ", familyInfo);
  };

  const onCancelFamilySelection = () => setfamilyId(null);

  //delete handler Family
  const deleteHandlerFamily = (idFamily) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this family?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      dispatch(deletefamily(idFamily));
      if (willDelete) {
        swal("Deleted!", "Family has been deleted!", "success");
        dispatch(getFamilies());
      }
    });
  };

  //delete handler Recipe
  const deleteHandlerRecipe = (idRecipe) => {
    console.log(idRecipe);
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this recipe?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      dispatch(deleteRecipe(idRecipe));
      if (willDelete) {
        swal("Deleted!", "Recipe has been deleted!", "success");
        dispatch(getRecipes());
      }
    });
  };

  return (
    <div>
      <h2>
        {familyId === null ? (
          <div>
            <i className="fas fa-clipboard me-3"></i> List of Families
          </div>
        ) : (
          <div>
            <i className="fas fa-clipboard me-3"></i>List of recipes of the
            family "{familyInfo ? familyInfo.name : ""}"
          </div>
        )}
      </h2>

      <div className="line "></div>
      {error && (
        <div className="alert alert-primary" role="alert">
          {error}
        </div>
      )}
      <div className="row justify-content-center">
        <div>
          <div className="d-flex flex-row-reverse ">
            {familyId === null ? (
              <button
                className="btn btn-primary mb-5 link"
                style={{ color: "white" }}
                onClick={() => {
                  navigate("/family/add");
                }}
              >
                <i className="fa-solid fa-plus me-2"></i>Add New Family
              </button>
            ) : (
              <div className="mb-3">
                <NavLink
                  to={"/recipe/add/" + familyId}
                  style={{ color: "white" }}
                  className="btn btn-primary ms-2"
                >
                  Add New Recipe
                </NavLink>
                <button
                  className="btn btn-primary ms-2 "
                  onClick={onCancelFamilySelection}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="col-2 "></div>
          {/*search Input*/}
          <div className="col-8 mx-auto mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-search"></i>
              </span>
              <input
                type="search"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                className="form-control "
              />
            </div>
          </div>
          {isloading ? (
            <div key={Math.random()} id={Math.random()} className="text-center">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : families && families.length > 0 ? (
            !familyId ? (
              families
                ?.filter(
                  (family) => family.name?.toLowerCase().includes(search) || ""
                )
                .map((family) => (
                  <div className="card me-5 floating-card " key={family._id}>
                    <FamilyCard
                      describe={family?.describe || ""}
                      id={family?._id}
                      image={family?.image}
                      name={family?.name}
                      onClick={() => onFamilySelection(family?._id)}
                    />
                    <div className="d-flex flex-row-reverse ">
                      <div className="m-2 mb-3">
                        <button className="btn btn-warning  border-dark me-2">
                          <NavLink to={"/family/edit/" + family._id}>
                            <i className="fa fa-edit text-dark"></i>
                          </NavLink>
                        </button>

                        <button
                          className="btn btn-danger border-dark"
                          onClick={() => {
                            deleteHandlerFamily(family?._id);
                          }}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              recipesByFamily
                .filter((recipe) => recipe?.name.toLowerCase().includes(search))
                .map((recipe) => (
                  <div className="card me-5 floating-card " key={recipe._id}>
                    <RecipeCard
                      key={recipe?._id}
                      describe={recipe?.describe || ""}
                      id={recipe?._id}
                      image={recipe?.image}
                      name={recipe?.name}
                    />
                    <div className="d-flex flex-row-reverse ">
                      <div className="m-2 mb-3">
                        <button className="btn btn-warning  border-dark me-2">
                          <NavLink to={"/recipe/edit/" + recipe._id}>
                            <i className="fa fa-edit text-dark"></i>
                          </NavLink>
                        </button>

                        <button
                          className="btn btn-danger border-dark"
                          onClick={() => {
                            deleteHandlerRecipe(recipe?._id);
                          }}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )
          ) : (
            <div key={Math.random()}>
              <div className="alert alert-secondary" role="alert">
                There are no families available
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Family;
