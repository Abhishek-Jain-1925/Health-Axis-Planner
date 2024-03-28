import { useState } from "react";
import "../shared/style.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../../shared/services/api";
import * as yup from "yup";
import { useFormik } from "formik";

const Login = () => {
  const navigate = useNavigate();
  const validateLogin = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z0-9]/, "Password can contain letters & digits."),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validateLogin,
      onSubmit: async (e: any) => {
        const payload = {
          email: values.email,
          password: values.password,
        };

        await post("/login", payload)
          .then((res) => {
            toast.dark("Login Successful!");

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_id", res.data.user.id);

            if (res.data.user.role_id == 3) {
              navigate("/profile");
            } else if (
              res.data.user.role_id == 2 ||
              res.data.user.role_id == 1
            ) {
              navigate("/admin");
            }
          })
          .catch((err) => {
            toast.dark("Invalid Credentials!");
            console.error("Login Error: ", err.response.data.message);
          });
      },
    });

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
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
            required
          />
          {errors.password &&
          touched.password &&
          typeof errors.password === "string" ? (
            <p style={{ color: "red" }}>{errors.password}</p>
          ) : null}
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="mt-2">
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
