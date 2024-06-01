import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div
      className="p-3 mx-auto bg-light rounded-4"
      style={{ maxWidth: "36rem" }}>
      <h1 className="text-3xl font-weight-semibold text-center my-7">
        Profile
      </h1>
      <form className="d-flex flex-column gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-circle h-24 w-24 object-cover cursor-pointer mx-auto mt-2"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded"
        />
        <button className="btn btn-dark text-white rounded p-3 text-uppercase hover-opacity-95 disabled-opacity-80">
          update
        </button>
      </form>
      <div className="d-flex justify-content-between mt-5">
        <span className="text-danger" style={{ cursor: "pointer" }}>
          Delete account
        </span>
        <span className="text-danger" style={{ cursor: "pointer" }}>
          Sign out
        </span>
      </div>
    </div>
  );
}
