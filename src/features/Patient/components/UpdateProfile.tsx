import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { patchWithAuth, get } from "../../../shared/services/api";

const UpdateProfile = () => {
  const id = localStorage.getItem("user_id");
  const AuthToken = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prefill = await get(`/users/${id}`, config);
        setFormData(prefill.data);
        setDataLoaded(true);
      } catch (err: any) {
        console.log("Error fetching user data:", err.message);
      }
    };

    fetchData();
  }, [id, config]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      user: {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        age: formData.age,
        role_id: 3,
      },
    };

    patchWithAuth(`/users/${id}`, payload, config)
      .then((res: any) => {
        toast.dark("Profile updated !!");
        console.log("Form submitted with Data :", res.data);
      })
      .catch((err: any) => {
        toast.dark("Invalid Credentials!");
        console.log(err);
      });
  };

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            Update Profile
          </h1>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                minLength={6}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-secondary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
