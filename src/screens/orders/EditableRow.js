import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          name="recipe"
          className="form-control w-75"
          value={editFormData.recipe}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          disabled
          className="form-control w-75"
          name="price"
          value={editFormData.price}
          onChange={handleEditFormChange}
        ></input>
      </td>

      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="quantity"
          className="form-control w-75"
          value={editFormData.quantity}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          className="form-control w-75"
          name="totalfooditem"
          disabled
          value={editFormData.quantity * editFormData.price}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit" className="btn btn-success  text-center me-2">
          <i className="fa-solid fa-floppy-disk"></i>
        </button>
        <button
          type="button"
          className="btn btn-danger  text-center "
          onClick={handleCancelClick}
        >
          <i className="fa-solid fa-rectangle-xmark"></i>
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
