import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import FamilyCard from "../../components/FamilyCard/FamilyCard";
import { useCallback } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

const Family = () => {
  const [family, setFamily] = useState([]);
  const [familyId, setfamilyId] = useState(null);
  const [familById, setfamilyById] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const [search, setSearch] = useState("");

  //const handleClose = () => setShow(false);
  // const handleShow = (id) => {
  //   setShow(true);
  //   console.log({ id });
  //   axios
  //     .get("http://localhost:3001/api/family/" + id.id)
  //     .then((response) => {
  //       setfamilyById(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    console.log({ familyId });
    let EP = "";
    if (familyId) {
      EP = `${familyId}/recipes`;
    }
    try {
      axios.get(`http://localhost:3001/api/family/${EP}`).then((response) => {
        console.log("get recipes by family id: ", response.data);

        if (familyId) {
          setRecipes(response.data);
        } else {
          setFamily(response.data);
        }
      });
    } catch (error) {
      console.log("get recipes by family id", error);
    }
  }, [familyId]);

  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure")) {
  //     axios
  //       .delete(`http://localhost:3001/api/family/delete/${id}`)
  //       .then(() => {
  //         axios
  //           .get(`http://localhost:3001/api/family/`)
  //           .then((response) => {
  //             setFamily(response.data);
  //           })
  //           .catch((error) => console.log(error));
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };
  const onFamilySelection = (id) => {
    setfamilyId(id);
    axios.get("http://localhost:3001/api/family/" + id).then((response) => {
      console.log("get array of family by: ", response.data);

      setfamilyById(response.data);
    });
    console.log(familById);
  };
  const onCancelFamilySelection = () => setfamilyId(null);
  console.log(recipes);
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
            family "{familById.name}"
          </div>
        )}
      </h2>

      <div className="line "></div>

      <div className="row justify-content-center">
        <div>
          <div className="d-flex flex-row-reverse ">
            {familyId === null ? (
              <button className="btn btn-primary mb-3 ">
                <NavLink
                  to={"/family/add"}
                  style={{ color: "white" }}
                  className="link"
                >
                  <i className="fa fa-plus me-2"></i>Add New Family
                </NavLink>
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
          {!familyId
            ? family
                .filter((family) => family.name.toLowerCase().includes(search))
                .map((family) => (
                  <FamilyCard
                    key={family?._id}
                    describe={family?.describe || ""}
                    id={family?._id}
                    image={family?.image}
                    name={family?.name}
                    onClick={() => onFamilySelection(family?._id)}
                  />
                ))
            : recipes
                .filter((recipe) => recipe.name.toLowerCase().includes(search))
                .map((recipe) => (
                  <RecipeCard
                    key={recipe?._id}
                    describe={recipe?.describe || ""}
                    id={recipe?._id}
                    image={recipe?.image}
                    name={recipe?.name}
                  />
                ))}
        </div>
      </div>
    </div>
  );
};
export default Family;
