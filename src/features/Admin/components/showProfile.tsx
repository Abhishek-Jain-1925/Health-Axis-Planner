import { useEffect, useState } from "react";
import { get } from "../../../shared/services/api";
import { toast } from "react-toastify";

const ShowProfile = () => {
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
      </div>
      <div
        className="card"
        style={{
          width: "100%",
          height: "400px",
          overflow: "hidden",
          backgroundColor: "#f2f2f2",
        }}
      >
        <div className="card-body">
          <h5 className="card-header">Personal Information</h5>
          <p>
            <strong>ID:</strong> {profile.id}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>First Name:</strong> {profile.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {profile.last_name}
          </p>
          <p>
            <strong>Age:</strong> {profile.age}
          </p>
          <p>
            <strong>Specialization:</strong> {profile.specialization}
          </p>
          <p>
            <strong>Role ID:</strong> {profile.role_id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;
