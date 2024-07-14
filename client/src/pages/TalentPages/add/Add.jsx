import React, { useEffect, useReducer, useState } from "react";
import "./Add.css";
import { gigReducer, INITIAL_STATE } from "../../../reducers/gigReducer.js";
// import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase.js";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const Add = () => {
  // start upload image states on firebase
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [features, setFeatures] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedOption, setSelectedOption] = useState(null);
  // end upload image states on firebase
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // start upload image function
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/png" || selectedFile.type === "image/jpeg")
    ) {
      setFile(selectedFile);
      setFileUploadError(false); // Reset the error state if any
      handleFileUpload(selectedFile);
    } else {
      setFile(null);
      setFileUploadError(true); // Set error state if file is not an image
      console.log("Please upload a valid image file (PNG or JPEG).");
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `TalentImages/cover/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (snapshot.totalBytes > 0) {
          setFilePerc(Math.round(progress));
        } else {
          setFilePerc(0);
        }
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ cover: downloadURL })
        );
      }
    );
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      console.log(gig);
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  console.log(mutation);

  const onSubmit = async (data) => {
    data.preventDefault();
    data.skills = selectedOption;
    data.employerId = currentUser._id;
    data.companyLogo = formData.companyLogo;
    data.employerEmail = currentUser.email;
    data.employerID = currentUser._id;
    data.salaryType = salaryType;

    if (salaryType === "As per Company Scale") {
      data.salaryFrom = "";
      data.salaryTo = "";
      data.companySalary = "As per Company Scale";
    } else {
      data.salaryType === "Fixed";
      data.salaryFrom = salaryFrom;
      data.salaryTo = salaryTo;
      data.companySalary = "Not Specified";
    }
    console.log(data);

    setLoading(true);
    try {
      const res = await fetch("/api/job/create-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.acknowledged) {
        alert("Job Posted Successfully!!");
        navigate("/find-work");
        reset();
        setSelectedOption(null);
      } else {
        setError(result.message);
        alert(result.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];

  return (
    <div className="add bg-white">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="container">
          <h1>Add New Gig</h1>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label mb-2">Title</label>
              <input
                placeholder="Logo Design"
                {...register("title", { required: "Gig Title is required" })}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title.message}</div>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label mb-2">Category</label>
              <select
                {...register("cat", {
                  required: "Category is required",
                })}
                className="form-control">
                <option value="design">Design</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="graphicDesign">Graphic Design</option>
              </select>
              {errors.category && (
                <div className="invalid-feedback">
                  {errors.category.message}
                </div>
              )}
            </div>
            <div className="col-md-6 mt-3">
              <label htmlFor="companyLogo" className="form-label">
                Cover
              </label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg"
              />
              {filePerc > 0 && `Upload ${filePerc}%`}
              {fileUploadError && (
                <div className="text-danger">
                  Please upload a valid image file (PNG or JPEG).
                </div>
              )}
            </div>
            <div className="col-md-6 mt-3">
              <label htmlFor="images">Upload Images</label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={(e) => setFiles(e.target.files)}
              />
            </div>
            <div className="col-12 mt-3">
              <label className="form-label mb-2">Description</label>
              <textarea
                className={`form-control p-3 ${
                  errors.description ? "is-invalid" : ""
                }`}
                rows={4}
                {...register("desc", {
                  required: "Description is required",
                })}
                placeholder="Brief descriptions to introduce your service to customers"
              />
              {errors.description && (
                <div className="invalid-feedback">
                  {errors.description.message}
                </div>
              )}
            </div>
            <div className="col-12 mt-3">
              <label className="form-label mb-2">Service Title</label>
              <input
                placeholder="e.g. One-page web design"
                name="shortTitle"
                {...register("shortTitle", {
                  required: "shortTitle is required",
                })}
                className={`form-control ${
                  errors.shortTitle ? "is-invalid" : ""
                }`}
              />
              {errors.shortTitle && (
                <div className="invalid-feedback">
                  {errors.shortTitle.message}
                </div>
              )}
            </div>
            <div className="col-12 mt-3">
              <label className="form-label mb-2">Short Description</label>
              <textarea
                className={`form-control p-3 ${
                  errors.description ? "is-invalid" : ""
                }`}
                rows={2}
                {...register("shortDesc", {
                  required: "Description is required",
                })}
                placeholder="Short description of your service"
              />
              {errors.shortDesc && (
                <div className="invalid-feedback">
                  {errors.shortDesc.message}
                </div>
              )}
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label mb-2">
                Delivery Time (e.g. 3 days)
              </label>
              <input
                type="number"
                {...register("deliveryTime", {
                  required: "Delivery Time are required",
                })}
                className={`form-control ${
                  errors.deliveryTime ? "is-invalid" : ""
                }`}
              />
              {errors.deliveryTime && (
                <div className="invalid-feedback">
                  {errors.deliveryTime.message}
                </div>
              )}
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label mb-2">Revision Number</label>
              <input
                type="number"
                {...register("revisionNumber", {
                  required: "Revision Number are required",
                })}
                className={`form-control ${
                  errors.revisionNumber ? "is-invalid" : ""
                }`}
              />
              {errors.revisionNumber && (
                <div className="invalid-feedback">
                  {errors.revisionNumber.message}
                </div>
              )}
            </div>

            {/* <div className="col-12 mt-3">
              <label htmlFor="features">Add Features</label>
              <form className="input-group mb-3" >
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. page design"
                />
                <button type="submit" className="btn btn-outline-secondary">
                  Add
                </button>
              </form>
              <div className="addedFeatures">
                {state?.features?.map((f) => (
                  <div className="badge bg-secondary me-2" key={f}>
                    {f}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      aria-label="Close"
                      ></button>
                  </div>
                ))}
              </div>
            </div> */}
            <div className="col-12 mt-3">
              <label htmlFor="features">Add Features</label>
              <label className="form-label mb-2">Features:</label>
              <CreatableSelect
                className="form-control py-4"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti
              />
            </div>

            <div className="col-md-6 mt-3">
              <label className="form-label mb-2">Price</label>
              <input
                type="number"
                {...register("price", {
                  required: "Price are required",
                })}
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
              />
              {errors.price && (
                <div className="invalid-feedback">{errors.price.message}</div>
              )}
            </div>
            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
