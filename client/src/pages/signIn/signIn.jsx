// import { React, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Container } from "react-bootstrap";
// import { MdAlternateEmail } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { FcGoogle } from "react-icons/fc";
// import { RiFacebookCircleFill } from "react-icons/ri";
// import "./signIn.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../../redux/user/userSlice.js";
// import OAuth from "../../components/OAuth/OAuth.jsx";
// import { FaRegUser } from "react-icons/fa";

// export default function SignIn() {
//   const [formData, setFormData] = useState({});
//   // const [error, setError] = useState(null);
//   // const [loading, setLoading] = useState(false);
//   const { loading, error } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };
//   console.log(formData.role);
//   const handleSubmit = async (e) => {
//     //  we use instead of setLoading(true); the below line.
//     dispatch(signInStart());
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         // setLoading(false);
//         // setError(data.message);
//         dispatch(signInFailure(data.message));
//         return;
//       }
//       // setLoading(false);
//       // setError(null);
//       dispatch(signInSuccess(data));
//       navigate("/");
//     } catch (error) {
//       // setLoading(false);
//       // setError(error.message);
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <>
//       <Container className="px-5 py-4 text-center">
//         <div className=" d-flex gap-2 bg-white text-align-center justify-content-center mx-auto custom-signin-scale ">
//           <div className=" custom-signin-sublings-div justify-content-center d-none d-md-block  ">
//             <div className="custom-signin-div-style mx-auto mt-5 p-2">
//               <h4 className="text-light my-5 mx-4">
//                 Unlock endless opportunities with just one login
//               </h4>
//               <p className="text-light fs-0.1">
//                 step in to your gatway to freelancing success and career
//                 advancement!{" "}
//               </p>
//               <div className="custom-signin-images ">
//                 <img
//                   src="./asset-folder/photos/icons8_man_with_money_480px.png"
//                   alt="photo"
//                 />
//                 <img
//                   src="./asset-folder/photos/icons8_woman_480px.png"
//                   alt="photo"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className=" custom-signin-sublings-div ">
//             <div className="header mt-5">
//               <h2 className="text-success fw-bold">kar+</h2>
//               <h4 className="fw-bold">Welcome Back!</h4>
//               <p className=" text-muted custom-signin-paragraph">
//                 please log in to your acount
//               </p>
//             </div>
//             <form onSubmit={handleSubmit} className="mt-4">
//               <div className="custom-signup-input-field d-flex text-align-center outline-none m-2">
//                 <FaRegUser />
//                 <select
//                   className="bg-transparent border-0"
//                   id="role"
//                   onChange={handleChange}>
//                   <option value="">Select Role</option>
//                   <option value="Employer">Employer</option>
//                   <option value="Job Seeker">Job Seeker</option>
//                 </select>
//               </div>

//               <div className="custom-signin-input-field d-flex text-align-center outline-none m-2 m-2">
//                 <MdAlternateEmail className="fs-3 mt-1" />
//                 <input
//                   className="bg-transparent border-0"
//                   type="email"
//                   placeholder="Email address"
//                   onChange={handleChange}
//                   id="email"
//                 />
//               </div>

//               <div className="custom-signin-input-field d-flex text-align-center outline-none m-2">
//                 <RiLockPasswordLine className="fs-3 mt-1" />
//                 <input
//                   className="bg-transparent border-0"
//                   type="password"
//                   placeholder="password"
//                   onChange={handleChange}
//                   id="password"
//                 />
//               </div>
//               {/* <div className="text-end text-success me-5 custom-signin-forget-password">
//                 {" "}
//                 forgot password?
//               </div> */}
//               <div className="custom-signin-submit mt-3">
//                 <button
//                   disabled={loading}
//                   className="border-0 bg-transparent text-light btn mt-1 align-items-center custom-sign-btn text-uppercase  ">
//                   {loading ? "Loading..." : "Sign in"}
//                 </button>
//               </div>
//               <p className="mt-3">--- or login with ---</p>
//               <div className="custom-buttons w-85">
//                 <button type="button"

//                   disabled={formData.role ? false : true}
//                   className={`rounded rounded-3${formData.role ? "bg-success " : "bg-light"}`}>
//                   <OAuth role={formData.role} />89
//                 </button>

//               </div>
//               <p className="mt-2 lead custom-signin-suggestion">
//                 don't have an acount?{" "}
//                 <Link
//                   to="/signup"
//                   className="text-success text-decoration-none">
//                   SignUp
//                 </Link>
//               </p>
//             </form>
//             {error && <p className="text-danger mt-3">{error}</p>}
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// }

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Container } from "react-bootstrap";
// import { useForm } from "react-hook-form";
// import { MdAlternateEmail } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { FaRegUser } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../../redux/user/userSlice.js";
// import OAuth from "../../components/OAuth/OAuth.jsx";
// import "./signIn.css";

// export default function SignIn() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.user);

//   const role = watch("role");

//   const onSubmit = async (data) => {
//     dispatch(signInStart());
//     try {
//       const res = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       const resData = await res.json();
//       if (resData.success === false) {
//         dispatch(signInFailure(resData.message));
//         return;
//       }
//       dispatch(signInSuccess(resData));
//       navigate("/");
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <Container className="px-5 py-4 text-center">
//       <div className="d-flex gap-2 bg-white text-align-center justify-content-center mx-auto custom-signin-scale">
//         <div className="custom-signin-sublings-div justify-content-center d-none d-md-block">
//           <div className="custom-signin-div-style mx-auto mt-5 p-2">
//             <h4 className="text-light my-5 mx-4">
//               Unlock endless opportunities with just one login
//             </h4>
//             <p className="text-light fs-0.1">
//               Step into your gateway to freelancing success and career
//               advancement!
//             </p>
//             <div className="custom-signin-images">
//               <img
//                 src="./asset-folder/photos/icons8_man_with_money_480px.png"
//                 alt="photo"
//               />
//               <img
//                 src="./asset-folder/photos/icons8_woman_480px.png"
//                 alt="photo"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="custom-signin-sublings-div">
//           <div className="header mt-5">
//             <h2 className="text-success fw-bold">kar+</h2>
//             <h4 className="fw-bold">Welcome Back!</h4>
//             <p className="text-muted custom-signin-paragraph">
//               Please log in to your account
//             </p>
//           </div>
//           <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
//             <div className="custom-signup-input-field d-flex text-align-center outline-none m-2">
//               <FaRegUser />
//               <select
//                 className="bg-transparent border-0"
//                 {...register("role", { required: "Role is required" })}>
//                 <option value="">Select Role</option>
//                 <option value="Employer">Employer</option>
//                 <option value="Job Seeker">Job Seeker</option>
//               </select>
//             </div>
//             {errors.role && (
//               <p className="text-danger">{errors.role.message}</p>
//             )}

//             <div className="custom-signin-input-field d-flex text-align-center outline-none m-2">
//               <MdAlternateEmail className="fs-3 mt-1" />
//               <input
//                 className="bg-transparent border-0"
//                 type="email"
//                 placeholder="Email address"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value:
//                       /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,

//                     message: "Invalid email address",
//                   },
//                 })}
//               />
//             </div>
//             {errors.email && (
//               <p className="text-danger">{errors.email.message}</p>
//             )}

//             <div className="custom-signin-input-field d-flex text-align-center outline-none m-2">
//               <RiLockPasswordLine className="fs-3 mt-1" />
//               <input
//                 className="bg-transparent border-0"
//                 type="password"
//                 placeholder="Password"
//                 {...register("password", {
//                   required: "Password is required",
//                   pattern: {
//                     value:
//                       /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/,
//                     message:
//                       "Password must be have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long",
//                     // value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//                     // message:
//                     //   "Password must be at least 8 characters long and include at least one letter and one number",
//                   },
//                 })}
//               />
//             </div>
//             {errors.password && (
//               <p className="text-danger">{errors.password.message}</p>
//             )}

//             <div className="custom-signin-submit mt-3">
//               <button
//                 disabled={loading}
//                 className="border-0 bg-transparent text-light btn mt-1 align-items-center custom-sign-btn text-uppercase">
//                 {loading ? "Loading..." : "Sign in"}
//               </button>
//             </div>
//             <p className="mt-3">--- or login with ---</p>
//             <div className="custom-buttons w-85">
//               <button
//                 type="button"
//                 disabled={!role}
//                 className={`rounded rounded-3 ${
//                   role ? "bg-success" : "bg-light"
//                 }`}>
//                 <OAuth role={role} />
//               </button>
//             </div>
//             <p className="mt-2 lead custom-signin-suggestion">
//               Don't have an account?{" "}
//               <Link to="/signup" className="text-success text-decoration-none">
//                 SignUp
//               </Link>
//             </p>
//           </form>
//           {error && <p className="text-danger mt-3">{error}</p>}
//         </div>
//       </div>
//     </Container>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice.js";
import OAuth from "../../components/OAuth/OAuth.jsx";
import "./signIn.css";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const role = watch("role");

  const onSubmit = async (data) => {
    dispatch(signInStart());
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData.success === false) {
        dispatch(signInFailure(resData.message));
        return;
      }
      dispatch(signInSuccess(resData));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const handleAuthClick = () => {
    if (!role) {
      setAuthError("Please select your role first.");
      setTimeout(() => setAuthError(null), 3000);
    }
  };

  return (
    <Container className="px-5 py-4 text-center">
      <div className="d-flex gap-2 bg-white text-align-center justify-content-center mx-auto custom-signin-scale">
        <div className="custom-signin-sublings-div justify-content-center d-none d-md-block">
          <div className="custom-signin-div-style mx-auto mt-5 p-2">
            <h4 className="text-light my-5 mx-4">
              Unlock endless opportunities with just one login
            </h4>
            <p className="text-light fs-0.1">
              Step into your gateway to freelancing success and career
              advancement!
            </p>
            <div className="custom-signin-images">
              <img
                src="./asset-folder/photos/icons8_man_with_money_480px.png"
                alt="photo"
              />
              <img
                src="./asset-folder/photos/icons8_woman_480px.png"
                alt="photo"
              />
            </div>
          </div>
        </div>
        <div className="custom-signin-sublings-div">
          <div className="header mt-5">
            <h2 className="text-success fw-bold">kar+</h2>
            <h4 className="fw-bold">Welcome Back!</h4>
            <p className="text-muted custom-signin-paragraph">
              Please log in to your account
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="custom-signup-input-field d-flex text-align-center outline-none m-2">
              <FaRegUser />
              <select
                className="bg-transparent border-0"
                {...register("role", { required: "Role is required" })}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
            </div>
            {errors.role && (
              <p className="text-danger">{errors.role.message}</p>
            )}

            <div className="custom-signin-input-field d-flex text-align-center outline-none m-2">
              <MdAlternateEmail className="fs-3 mt-1" />
              <input
                className="bg-transparent border-0"
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}

            <div className="custom-signin-input-field d-flex text-align-center outline-none m-2">
              <RiLockPasswordLine className="fs-3 mt-1" />
              <input
                className="bg-transparent border-0"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/,
                    message:
                      "Password must be have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long",
                    // value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    // message:
                    //   "Password must be at least 8 characters long and include at least one letter and one number",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}

            <div className="custom-signin-submit mt-3">
              <button
                disabled={loading}
                className="border-0 bg-transparent text-light btn mt-1 align-items-center custom-sign-btn text-uppercase">
                {loading ? "Loading..." : "Sign in"}
              </button>
            </div>
            <p className="mt-3">--- or login with ---</p>
            <div className="custom-buttons w-85">
              {!role ? (
                <button
                  type="button"
                  onClick={handleAuthClick}
                  className={`rounded rounded-3 ${"bg-light"}`}>
                  <FcGoogle />
                  Continue with google
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!role}
                  className={`rounded rounded-3 ${
                    role ? "bg-success" : "bg-light"
                  }`}>
                  <OAuth role={role} />
                </button>
              )}

              {authError && <p className="text-danger mt-2">{authError}</p>}
            </div>
            <p className="mt-2 lead custom-signin-suggestion">
              Don't have an account?{" "}
              <Link to="/signup" className="text-success text-decoration-none">
                SignUp
              </Link>
            </p>
          </form>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </Container>
  );
}
