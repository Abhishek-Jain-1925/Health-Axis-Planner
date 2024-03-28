import "../shared/style.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../../shared/services/api";
import { useFormik } from "formik";
import * as yup from "yup";

const Signup = () => {
  const navigate = useNavigate();

  const validateSignup = yup.object({
    firstName: yup
      .string()
      .max(20, "Name length must be less than 20 characters")
      .required("First Name is required"),
    lastName: yup
      .string()
      .max(20, "Name length must be less than 20 characters")
      .required("Last Name is required"),
    email: yup.string().email().required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z0-9]/, "Password can contain letters & digits."),
    age: yup
      .number()
      .positive()
      .integer()
      .min(0, "Age never be negative")
      .required("Age is required"),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        age: "",
      },
      validationSchema: validateSignup,
      onSubmit: async (e: any) => {
        e.preventDefault();
        const payload = {
          user: {
            email: values.email,
            password: values.password,
            first_name: values.firstName,
            last_name: values.lastName,
            age: values.age,
            specialization: "Patient",
            role_id: 3,
          },
        };

        await post("/users", payload)
          .then(() => {
            toast.dark("Signup Successfully, You can login now !!");
            navigate("/login");
          })
          .catch((err) => {
            toast.dark("Error Occurred !!");
            console.log(err.message);
          });
      },
    });

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            required
          />
          {errors.firstName &&
          touched.firstName &&
          typeof errors.firstName === "string" ? (
            <p style={{ color: "red" }}>{errors.firstName}</p>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.lastName &&
          touched.lastName &&
          typeof errors.lastName === "string" ? (
            <p style={{ color: "red" }}>{errors.lastName}</p>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            minLength={6}
            required
          />
          {errors.age && touched.age && typeof errors.age === "string" ? (
            <p style={{ color: "red" }}>{errors.age}</p>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.email && touched.email && typeof errors.email === "string" ? (
            <p style={{ color: "red" }}>{errors.email}</p>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            minLength={6}
            required
          />
          {errors.password &&
          touched.password &&
          typeof errors.password === "string" ? (
            <p style={{ color: "red" }}>{errors.password}</p>
          ) : null}
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p className="mt-2">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
