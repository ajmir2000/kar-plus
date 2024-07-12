import React, { useReducer, useState } from "react";
import "./Add.css";
import { gigReducer, INITIAL_STATE } from "../../../reducers/gigReducer.js";
// import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    // navigate("/mygigs")
  };

  return (
    <div className="add d-flex justify-content-center bg-white">
      <div className="container py-5">
        <h1 className="mb-4 text-secondary fw-light">Add New Gig</h1>
        <div className="sections d-flex justify-content-between gap-5">
          <div className="info d-flex flex-column gap-3">
            <label htmlFor="" className="text-secondary fs-5">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="" className="text-secondary fs-5">
              Category
            </label>
            <select
              name="cat"
              id="cat"
              className="form-select"
              onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images d-flex align-items-center gap-3">
              <div className="imagesInputs d-flex flex-column gap-3">
                <label htmlFor="" className="text-secondary fs-5">
                  Cover Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="" className="text-secondary fs-5">
                  Upload Images
                </label>
                <input
                  type="file"
                  multiple
                  className="form-control"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button className="btn btn-success" onClick={handleUpload}>
                {uploading ? "Uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="" className="text-secondary fs-5">
              Description
            </label>
            <textarea
              name="desc"
              className="form-control"
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}></textarea>
            <button className="btn btn-success mt-3" onClick={handleSubmit}>
              Create
            </button>
          </div>
          <div className="details d-flex flex-column gap-3">
            <label htmlFor="" className="text-secondary fs-5">
              Service Title
            </label>
            <input
              type="text"
              name="shortTitle"
              className="form-control"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="" className="text-secondary fs-5">
              Short Description
            </label>
            <textarea
              name="shortDesc"
              className="form-control"
              onChange={handleChange}
              placeholder="Short description of your service"
              cols="30"
              rows="10"></textarea>
            <label htmlFor="" className="text-secondary fs-5">
              Delivery Time (e.g. 3 days)
            </label>
            <input
              type="number"
              name="deliveryTime"
              className="form-control"
              onChange={handleChange}
            />
            <label htmlFor="" className="text-secondary fs-5">
              Revision Number
            </label>
            <input
              type="number"
              name="revisionNumber"
              className="form-control"
              onChange={handleChange}
            />
            <label htmlFor="" className="text-secondary fs-5">
              Add Features
            </label>
            <form
              action=""
              className="add d-flex justify-content-between"
              onSubmit={handleFeature}>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. page design"
              />
              <button type="submit" className="btn btn-outline-secondary ms-2">
                Add
              </button>
            </form>
            <div className="addedFeatures d-flex gap-2 mt-3">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    className="btn btn-outline-danger d-flex align-items-center gap-2"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }>
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="" className="text-secondary fs-5">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              name="price"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
