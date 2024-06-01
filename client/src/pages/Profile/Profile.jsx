import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  return (
    <div
      className="p-3 mx-auto bg-light rounded-4"
      style={{ maxWidth: "36rem" }}>
      <h1 className="text-3xl font-weight-semibold text-center my-7">
        Profile
      </h1>
      <form className="d-flex flex-column gap-4">
        <input
          //we use e.target.files[0] becuse if user select multi image file we choose the first one.
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
        />

        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-circle  w-25 object-cover cursor-pointer mx-auto mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-danger">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-secondary">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-success">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
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
