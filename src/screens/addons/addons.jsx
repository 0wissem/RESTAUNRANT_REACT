import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { getAddons, deleteAddons } from "../../store/slices/addonsSlice";

const Addons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addons, isloading, error } = useSelector((state) => state.addons);
  const { ingredients } = useSelector((state) => state.ingredients);

  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getAddons());
  }, [dispatch]);

  //delete handler
  const deleteHandler = (addons) => {
    //alert
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this addon?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      dispatch(deleteAddons(addons));
      if (willDelete) {
        swal("Deleted!", "Addon has been deleted!", "success");
        dispatch(getAddons());
      }
    });
  };

  return (
    <div>
      <h2>
        <i className="fa fa-list me-3"></i>List of Addons
      </h2>

      <div className="line "></div>

      {error && (
        <div className="alert alert-primary" role="alert">
          {error}
        </div>
      )}

      <div className="row justify-content-center">
        {/* Add addons button  */}
        <div className="d-flex flex-row-reverse ">
          <button
            className="btn btn-primary mb-5 link"
            style={{ color: "white" }}
            onClick={() => {
              navigate("/addons/add");
            }}
          >
            <i className="fa-solid fa-plus me-2"></i>Add New Addons
          </button>
        </div>

        {/* Input search */}
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

        {/* addons list */}
        <table className="table  align-middle table-hover">
          <thead>
            <tr>
              <th> Name</th>
              <th> Ingredients </th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {isloading ? (
              <tr key={Math.random()} id={Math.random()}>
                <td colSpan="7" className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : addons && addons.length > 0 ? (
              addons
                ?.filter(
                  (addons) => addons.name?.toLowerCase().includes(search) || ""
                )

                .map((addon) => (
                  <tr key={addon._id} id={addon._id}>
                    <td>{addon.name}</td>
                    <td>
                      {addon.ingredientsAddon.map((ingredient, obj) => (
                        <div key={ingredient} id={ingredient}>
                          {ingredients?.find((o) => o._id === ingredient).name}
                        </div>
                      ))}
                    </td>

                    <td>
                      <button className="btn btn-warning me-3">
                        <NavLink
                          to={"/addons/edit/" + addon._id}
                          style={{ color: "white" }}
                        >
                          <i className="fa fa-edit"></i>
                        </NavLink>
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteHandler(addon);
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr key={Math.random()} id={Math.random()}>
                <td colSpan="7">
                  <div className="alert alert-secondary" role="alert">
                    There are no addons available
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Addons;
