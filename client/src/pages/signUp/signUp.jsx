// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Container,Button } from "react-bootstrap";
// import { MdAlternateEmail, MdOutlinePerson } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { FcGoogle } from "react-icons/fc";
// import { RiFacebookCircleFill } from "react-icons/ri";
// import { FaRegUser } from "react-icons/fa";

// import "./signUp.css";
// import OAuth from "../../components/OAuth/OAuth";

// export default function SignUp() {
//   const [formData, setFormData] = useState({});
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [role, setRole] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };
//   console.log(formData);
//   const handleSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         setLoading(false);
//         setError(data.message);
//         return;
//       }
//       setLoading(false);
//       setError(null);
//       navigate("/signin");
//     } catch (error) {
//       setLoading(false);
//       setError(error.message);
//     }
//   };

//   return (
//     <>
//       <Container className="px-3 px-md-5 py-4 text-center">
//         <div className="d-flex  flex-md-row gap-3 bg-white text-align-center justify-content-center mx-auto custom-signup-scale  ">
//           <div className="custom-signup-sublings-div justify-content-center d-none d-md-block d-lg-block">
//             <div className="custom-signup-div-style mx-auto mt-5 p-2 ">
//               <h4 className="text-light my-5 mx-4">
//                 Unlock endless opportunities with just Signup
//               </h4>
//               <p className="text-light fs-6 fs-md-5">
//                 step in to your gatway to freelancing success and career
//                 advancement!{" "}
//               </p>
//               <div className="custom-signup-images">
//                 <img
//                   src="./asset-folder/photos/icons8_man_with_money_480px.png"
//                   alt="photo"
//                   className="d-none d-md-inline"
//                 />
//                 <img
//                   src="./asset-folder/photos/icons8_woman_480px.png"
//                   alt="photo"
//                   className="d-none d-md-inline"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="custom-signup-sublings-div ">
//             <div className="header mt-5 me-4 pe-3">
//               <h4 className="fw-bold">Create New Account</h4>
//               <p className="muted custom-paragraph">Register to Karplus</p>
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
//               <div className="custom-signup-input-field d-flex text-align-center outline-none m-2">
//                 <MdOutlinePerson className="fs-3 mt-1" />
//                 <input
//                   className="bg-transparent border-0"
//                   type="text"
//                   placeholder="username"
//                   id="username"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="custom-signup-input-field d-flex text-align-center outline-none m-2 m-2">
//                 <MdAlternateEmail className="fs-3 mt-1" />
//                 <input
//                   className="bg-transparent border-0 "
//                   type="email"
//                   placeholder="Email address"
//                   id="email"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="custom-signup-input-field d-flex text-align-center outline-none m-2">
//                 <RiLockPasswordLine className="fs-3 mt-1" />
//                 <input
//                   className="bg-transparent border-0 "
//                   type="password"
//                   placeholder="password"
//                   id="password"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="custom-signup-submit mt-3">
//                 <button
//                   disabled={loading}
//                   className="border-0 bg-transparent text-light btn mt-1 align-items-center custom-sign-btn text-uppercase  ">
//                   {loading ? "Loading..." : "Sign up"}
//                 </button>
//               </div>
//               <div className="d-flex text-align-left ms-2 custom-signup-checkbox mt-3">
//                 <input type="checkbox" className="me-2" />i accept{" "}
//                 <span className="fw-bold text-decoration-underline ms-2">
//                   term of service and privacy policy
//                 </span>
//               </div>

//               <p className="mt-3">--- or login with ---</p>
//               <div className="">
//                 <button type="button"
//                   disabled={formData.role ? false : true}
//                   className={formData.role ? "bg-success " : "bg-light"}>
//                   <OAuth role={formData.role} />
//                 </button>
//               </div>
//             </form>
//             <p className="mt-2 lead custom-signup-suggestion">
//               Already have an acount?{" "}
//               <Link to="/signin" className="text-success text-decoration-none">
//                 login
//               </Link>
//             </p>
//             {error && <p className="text-danger mt-3">{error}</p>}
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// }

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MdAlternateEmail, MdOutlinePerson } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import OAuth from "../../components/OAuth/OAuth";
import { FcGoogle } from "react-icons/fc";

import "./signUp.css";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [authError, setAuthError] = useState(null);

  const role = watch("role");

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData.success === false) {
        setLoading(false);
        setError(resData.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleAuthClick = () => {
    if (!role) {
      setAuthError("Please select your role first.");
      setTimeout(() => setAuthError(null), 3000);
    }
  };
  return (
    <Container className="px-3 px-md-5 py-4 text-center">
      <div className="d-flex flex-md-row gap-3 bg-white text-align-center justify-content-center mx-auto custom-signup-scale">
        <div className="custom-signup-sublings-div justify-content-center d-none d-md-block d-lg-block">
          <div className="custom-signup-div-style mx-auto mt-5 p-2">
            <h4 className="text-light my-5 mx-4">
              Unlock endless opportunities with just Signup
            </h4>
            <p className="text-light fs-6 fs-md-5">
              Step into your gateway to freelancing success and career
              advancement!
            </p>
            <div className="custom-signup-images">
              <img
                src="./asset-folder/photos/icons8_man_with_money_480px.png"
                alt="photo"
                className="d-none d-md-inline"
              />
              <img
                src="./asset-folder/photos/icons8_woman_480px.png"
                alt="photo"
                className="d-none d-md-inline"
              />
            </div>
          </div>
        </div>
        <div className="custom-signup-sublings-div">
          <div className="header mt-5 me-4 pe-3">
            <h4 className="fw-bold">Create New Account</h4>
            <p className="muted custom-paragraph">Register to Karplus</p>
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

            <div className="custom-signup-input-field d-flex text-align-center outline-none m-2">
              <MdOutlinePerson className="fs-3 mt-1" />
              <input
                className="bg-transparent border-0"
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_]{4,16}$/,
                    message:
                      "Username must be 4-16 characters and include only letters, numbers, and underscores",
                  },
                })}
              />
            </div>
            {errors.username && (
              <p className="text-danger">{errors.username.message}</p>
            )}

            <div className="custom-signup-input-field d-flex text-align-center outline-none m-2">
              <MdAlternateEmail className="fs-3 mt-1" />
              <input
                className="bg-transparent border-0"
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    // value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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

            <div className="custom-signup-input-field d-flex text-align-center outline-none m-2">
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

            <div className="custom-signup-submit mt-3">
              <button
                disabled={loading || !role}
                className={`border-0 text-light btn mt-1 align-items-center custom-sign-btn text-uppercase ${
                  loading || !role ? "bg-secondary" : "bg-success"
                }`}>
                {loading ? "Loading..." : "Sign up"}
              </button>
            </div>
            <div className="d-flex text-align-left ms-2 custom-signup-checkbox mt-3">
              <input type="checkbox" className="me-2" />I accept{" "}
              <span className="fw-bold text-decoration-underline ms-2">
                term of service and privacy policy
              </span>
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
          </form>
          <p className="mt-2 lead custom-signup-suggestion">
            Already have an account?{" "}
            <Link to="/signin" className="text-success text-decoration-none">
              Login
            </Link>
          </p>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </Container>
  );
}
