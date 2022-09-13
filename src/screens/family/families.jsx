import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import FamilyCard from "../../components/FamilyCard/FamilyCard";
import { useCallback } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

const Family = () => {
  const [family, setFamily] = useState([]);
  const [familyId, setfamilyId] = useState(null);
  const [recipes, setRecipes] = useState([]);
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
  };
  const onCancelFamilySelection = () => setfamilyId(null);
  console.log(recipes);
  return (
    <div>
      <h2>
        <i className="fas fa-clipboard me-3"></i>List of Families
      </h2>

      <div className="line "></div>

      <div className="row justify-content-center">
        <div>
          <div className="d-flex flex-row-reverse ">
            {!!familyId && (
              <button
                className="btn btn-primary ms-2"
                onClick={onCancelFamilySelection}
              >
                Cancel
              </button>
            )}
            <button className="btn btn-primary ">
              <NavLink
                to={"/family/add"}
                style={{ color: "white" }}
                className="link"
              >
                <i className="fa fa-plus me-2"></i>Add New Family
              </NavLink>
            </button>
          </div>

          {!familyId
            ? family.map((family) => (
                <FamilyCard
                  key={family?._id}
                  describe={family?.describe || ""}
                  id={family?._id}
                  image={family?.image}
                  name={family?.name}
                  onClick={() => onFamilySelection(family?._id)}
                />
              ))
            : recipes.map((recipe) => (
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
