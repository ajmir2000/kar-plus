import React, { useEffect, useReducer, useState } from "react";
import "./Add.css";
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
import { useSelector } from "react-redux";

const Add = () => {
  // start upload image states on firebase
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({ images: [] });
  const [features, setFeatures] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);
  // start upload image states on firebase
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  // end upload image function
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
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
          setFormData({ ...formData, cover: downloadURL })
        );
      }
    );
  };

  const navigate = useNavigate();

  // start Portfolio Images
  console.log(formData);
  console.log(formData.images.length);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.images.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            images: formData.images.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `TalentImages/portflio/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };
  // console.log(formData);
  // end Portfolio Images

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

  console.log(formData);
  const onSubmit = async (data) => {
    data.features = selectedOption;
    data.userId = currentUser._id;
    data.images = formData.images;
    data.cover = formData.cover;

    console.log(data);
    // data.preventDefault();

    setLoading(true);
    try {
      const res = await fetch("/api/gigs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.acknowledged) {
        alert("Gig Posted Successfully!!");
        navigate("/gigs");
        reset();
        setSelectedOption(null);
        formData.images = [];
        formData.cover = null;
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

  return (
    <div class="add bg-white">
      <div class="container">
        <form onSubmit={handleSubmit(onSubmit)} class="container">
          <h1>Add New Gig</h1>
          <div class="row">
            <div class="col-12 col-md-6 ">
              <label class="form-label mb-2">Title</label>
              <input
                placeholder="Logo Design"
                {...register("title", { required: "Gig Title is required" })}
                class={`form-control ${errors.title ? "is-invalid" : ""}`}
              />
              {errors.title && (
                <div class="invalid-feedback">{errors.title.message}</div>
              )}
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label mb-2">Category</label>
              <select
                {...register("cat", {
                  required: "Category is required",
                })}
                class="form-control">
                <option value="design">Design</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="graphicDesign">Graphic Design</option>
              </select>
              {errors.category && (
                <div class="invalid-feedback">{errors.category.message}</div>
              )}
            </div>
            <div class="col-12 col-md-6 mt-3">
              <label for="companyLogo" class="form-label">
                Cover
              </label>
              <input
                type="file"
                class="form-control"
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg"
              />
              {filePerc > 0 && `Upload ${filePerc}%`}
              {fileUploadError && (
                <div class="text-danger">
                  Please upload a valid image file (PNG or JPEG).
                </div>
              )}
            </div>

            {/*start Portfolio Images  */}
            <div class="col-12 d-flex gap-4 mt-3">
              <input
                onChange={(e) => setFiles(e.target.files)}
                class="p-3 border border-secondary rounded w-100"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                class={`p-3 text-success border border-success rounded text-uppercase ${
                  uploading ? "opacity-80" : "hover-shadow-lg"
                }`}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <p class="col-12 text-danger small">
              {imageUploadError && imageUploadError}
            </p>
            {formData.images?.length > 0 &&
              formData.images.map((url, index) => (
                <div
                  key={url}
                  class="col-12 d-flex justify-content-between  border align-items-center mt-3">
                  <img
                    src={url}
                    alt="listing image"
                    class="w-25  h-25 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    class="p-3 text-danger rounded text-uppercase hover-opacity-75">
                    Delete
                  </button>
                </div>
              ))}

            {/*end Portfolio Images  */}
            <div class="col-12 mt-3">
              <label class="form-label mb-2">Description</label>
              <textarea
                class={`form-control p-3 ${
                  errors.description ? "is-invalid" : ""
                }`}
                rows={4}
                {...register("desc", {
                  required: "Description is required",
                })}
                placeholder="Brief descriptions to introduce your service to customers"
              />
              {errors.description && (
                <div class="invalid-feedback">{errors.description.message}</div>
              )}
            </div>
            <div class="col-12 mt-3">
              <label class="form-label mb-2">Service Title</label>
              <input
                placeholder="e.g. One-page web design"
                name="shortTitle"
                {...register("shortTitle", {
                  required: "shortTitle is required",
                })}
                class={`form-control ${errors.shortTitle ? "is-invalid" : ""}`}
              />
              {errors.shortTitle && (
                <div class="invalid-feedback">{errors.shortTitle.message}</div>
              )}
            </div>
            <div class="col-12 mt-3">
              <label class="form-label mb-2">Short Description</label>
              <textarea
                class={`form-control p-3 ${
                  errors.description ? "is-invalid" : ""
                }`}
                rows={2}
                {...register("shortDesc", {
                  required: "Description is required",
                })}
                placeholder="Short description of your service"
              />
              {errors.shortDesc && (
                <div class="invalid-feedback">{errors.shortDesc.message}</div>
              )}
            </div>
            <div class="col-12 col-md-6 mt-3">
              <label class="form-label mb-2">Delivery Time (e.g. 3 days)</label>
              <input
                type="number"
                {...register("deliveryTime", {
                  required: "Delivery Time are required",
                })}
                class={`form-control ${
                  errors.deliveryTime ? "is-invalid" : ""
                }`}
              />
              {errors.deliveryTime && (
                <div class="invalid-feedback">
                  {errors.deliveryTime.message}
                </div>
              )}
            </div>
            <div class="col-12 col-md-6 mt-3">
              <label class="form-label mb-2">Revision Number</label>
              <input
                type="number"
                {...register("revisionNumber", {
                  required: "Revision Number are required",
                })}
                class={`form-control ${
                  errors.revisionNumber ? "is-invalid" : ""
                }`}
              />
              {errors.revisionNumber && (
                <div class="invalid-feedback">
                  {errors.revisionNumber.message}
                </div>
              )}
            </div>

            <div class="col-12 mt-3">
              <label for="features">Add Features</label>
              <label class="form-label mb-2">Features:</label>
              <CreatableSelect
                class="form-control py-4"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti
              />
            </div>

            <div class="col-12 col-md-6 mt-3">
              <label class="form-label mb-2">Price</label>
              <input
                type="number"
                {...register("price", {
                  required: "Price are required",
                })}
                class={`form-control ${errors.price ? "is-invalid" : ""}`}
              />
              {errors.price && (
                <div class="invalid-feedback">{errors.price.message}</div>
              )}
            </div>
            <div class="col-12 mt-4">
              <button type="submit" class="btn btn-primary">
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
