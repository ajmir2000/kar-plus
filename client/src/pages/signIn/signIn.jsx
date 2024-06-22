import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import "./signIn.css";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice.js";
import OAuth from "../../components/OAuth/OAuth.jsx";
import { FaRegUser } from "react-icons/fa";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData.role);
  const handleSubmit = async (e) => {
    //  we use instead of setLoading(true); the below line.
    dispatch(signInStart());
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <Container className="px-5 py-4 text-center">
        <div className=" d-flex gap-2 bg-white text-align-center justify-content-center mx-auto custom-signin-scale ">
          <div className=" custom-signin-sublings-div justify-content-center d-none d-md-block  ">
            <div className="custom-signin-div-style mx-auto mt-5 p-2">
              <h4 className="text-light my-5 mx-4">
                Unlock endless opportunities with just one login
              </h4>
              <p className="text-light fs-0.1">
                step in to your gatway to freelancing success and career
                advancement!{" "}
              </p>
              <div className="custom-signin-images ">
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

          <div className=" custom-signin-sublings-div ">
            <div className="header mt-5">
              <h2 className="text-success fw-bold">kar+</h2>
              <h4 className="fw-bold">Welcome Back!</h4>
              <p className=" text-muted custom-signin-paragraph">
                please log in to your acount
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="custom-signup-input-field d-flex text-align-center outline-none m-2">
                <FaRegUser />
                <select
                  className="bg-transparent border-0"
                  id="role"
                  onChange={handleChange}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
              </div>

              <div className="custom-signin-input-field d-flex text-align-center outline-none m-2 m-2">
                <MdAlternateEmail className="fs-3 mt-1" />
                <input
                  className="bg-transparent border-0"
                  type="email"
                  placeholder="Email address"
                  onChange={handleChange}
                  id="email"
                />
              </div>

              <div className="custom-signin-input-field d-flex text-align-center outline-none m-2">
                <RiLockPasswordLine className="fs-3 mt-1" />
                <input
                  className="bg-transparent border-0"
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                  id="password"
                />
              </div>
              {/* <div className="text-end text-success me-5 custom-signin-forget-password">
                {" "}
                forgot password?
              </div> */}
              <div className="custom-signin-submit mt-3">
                <button
                  disabled={loading}
                  className="border-0 bg-transparent text-light btn mt-1 align-items-center custom-sign-btn text-uppercase  ">
                  {loading ? "Loading..." : "Sign in"}
                </button>
              </div>
              <p className="mt-3">--- or login with ---</p>
              <div className="d-flex custom-buttons">
                <button type="button"
                  disabled={formData.role ? false : true}
                  className={formData.role ? "bg-success " : "bg-light"}>
                  <OAuth role={formData.role} />
                </button>
                <button className="btn btn-light ms-lg-5">
                  <RiFacebookCircleFill className="text-primary" />
                  facebook
                </button>
              </div>
              <p className="mt-2 lead custom-signin-suggestion">
                don't have an acount?{" "}
                <Link
                  to="/signup"
                  className="text-success text-decoration-none">
                  SignUp
                </Link>
              </p>
            </form>
            {error && <p className="text-danger mt-3">{error}</p>}
          </div>
        </div>
      </Container>
    </>
  );
}
