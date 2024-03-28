import { useEffect, useState } from "react";
import { get } from "../../../shared/services/api";
import { toast } from "react-toastify";
import DeleteUser from "./profile/DeleteUser";
import UpdateProfile from "./UpdateProfile";

const MyProfile = () => {
  const [profile, setProfile] = useState({
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    age: 0,
    specialization: "",
    role_id: 0,
  });

  const id = localStorage.getItem("user_id");
  const AuthToken = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await get(`/users/${id}`, config);
        setProfile(response.data);
      } catch (error: any) {
        toast.dark("Error fetching Profile:", error.message);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div
      className="main"
      style={{
        width: "70vw",
        margin: "0 auto",
        maxHeight: "90vh",
        overflowY: "auto",
      }}
    >
      <div
        className="header m-3"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3 className="mt-3">Profile -</h3>
        <button
          className="btn btn-outline-danger h-25 w-25"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ alignSelf: "flex-end" }}
        >
          Delete Account
        </button>
      </div>
      <div className="card border-secondary rounded-lg">
        <div className="card-body">
          <h5 className="card-header">Personal Information</h5>
          <p>
            <strong>ID:</strong> {profile.id}
          </p>
          <p>
            <strong>First Name:</strong> {profile.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {profile.last_name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Age:</strong> {profile.age}
          </p>
        </div>
        <center>
          <button
            className="btn btn-secondary h-25 w-25 m-3"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop1"
          >
            Update Profile
          </button>
        </center>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <DeleteUser />
      </div>

      <div
        className="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <UpdateProfile />
      </div>
    </div>
  );
};

export default MyProfile;
