import React from "react";
import "./CreateOrder.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import newRequest from "../../utils/newRequest";
import { useNavigate, useParams } from "react-router-dom";

function CreateOrder() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { id } = useParams();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      //   const res = await newRequest.post(`/orders/${id}`, { data });
      const res = await fetch(`/api/orders/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);
      if (result.acknowledged) {
        alert("Submit Order Successfully!!");
        navigate("/gigs");
        reset();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container bg-white p-4">
      <div className="d-flex justify-content-center mb-4">
        <h3>Give Your Order</h3>
      </div>
      <div className="mb-5">
        <h4>Billing Information</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-6 mb-3">
              <label className="form-label">Full Name</label>
              <input
                value={currentUser.username}
                type="text"
                placeholder="Ex: Roshan"
                {...register("fullName", { required: "Full Name is required" })}
                className={`form-control ${
                  errors.fullName ? "is-invalid" : ""
                }`}
              />
              {errors.fullName && (
                <div className="invalid-feedback">
                  {errors.fullName.message}
                </div>
              )}
            </div>
            <div className="col-lg-6 mb-3">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                placeholder="Ex: Roshan"
                {...register("companyName", {
                  required: "Company Name is required",
                })}
                className={`form-control ${
                  errors.companyName ? "is-invalid" : ""
                }`}
              />
              {errors.companyName && (
                <div className="invalid-feedback">
                  {errors.companyName.message}
                </div>
              )}
            </div>
            <div className="col-lg-6 mb-3">
              <label className="form-label">Country</label>
              <input
                type="text"
                placeholder="Ex: Afghanistan"
                {...register("country", { required: "Country is required" })}
                className={`form-control ${errors.country ? "is-invalid" : ""}`}
              />
              {errors.country && (
                <div className="invalid-feedback">{errors.country.message}</div>
              )}
            </div>
            <div className="col-lg-6 mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                placeholder="Ex: Kabul"
                {...register("city", { required: "city is required" })}
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
              />
              {errors.city && (
                <div className="invalid-feedback">{errors.city.message}</div>
              )}
            </div>
            <div className="col-12 mb-3">
              <label className="form-label">Details</label>
              <textarea
                className={`form-control ${errors.details ? "is-invalid" : ""}`}
                rows={6}
                {...register("details", { required: "Details are required" })}
                placeholder="Details are you want"
              />
              {errors.details && (
                <div className="invalid-feedback">{errors.details.message}</div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <button className="btn btn-success" type="submit">
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateOrder;
