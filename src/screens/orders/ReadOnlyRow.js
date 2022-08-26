import React from "react";

const ReadOnlyRow = ({ recipe, handleEditClick, handleDeleteClick }) => {
  return (
    <tr key={recipe._id}>
      <td>{recipe.recipe_name}</td>
      <td>{recipe.price}</td>
      <td>{recipe.quantity}</td>
      <td>{recipe.quantity * recipe.price}</td>
      <td>
        <button
          type="button"
          className="btn btn-warning  text-center me-2"
          onClick={(event) => handleEditClick(event, recipe)}
        >
          <i className="fa-solid fa-edit"></i>
        </button>
        <button
          type="button"
          className="btn btn-danger  text-center me-2"
          onClick={() => handleDeleteClick(recipe._id)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
