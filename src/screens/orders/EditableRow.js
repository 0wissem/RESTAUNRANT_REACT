import React from "react";

const EditableRow = ({
  recipes,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <select
          name="recipe_name"
          className="form-select"
          onChange={handleEditFormChange}
        >
          <option key={editFormData._id} value={editFormData.recipe_name}>
            {editFormData.recipe_name}
          </option>
          <option></option>
          {recipes.map((recipe) => (
            <option key={recipe._id} value={recipe.recipe_name}>
              {recipe.recipe_name}
            </option>
          ))}
        </select>
      </td>
      <td>{editFormData.price}</td>

      <td>
        <input
          type="number"
          required="required"
          name="quantity"
          className="form-control w-75"
          value={editFormData.quantity}
          onChange={handleEditFormChange}
        />
      </td>
      <td>{editFormData.quantity * editFormData.price}</td>
      <td>
        <button
          type="submit"
          className="btn btn-success  text-center me-2"
          title="Save"
        >
          <i className="fa-solid fa-floppy-disk"></i>
        </button>
        <button
          type="button"
          className="btn btn-danger  text-center "
          onClick={handleCancelClick}
          title="Cancel"
        >
          <i className="fa-solid fa-rectangle-xmark"></i>
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
