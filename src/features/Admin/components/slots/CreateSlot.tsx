import { toast } from "react-toastify";
import { postWithAuth } from "../../../../shared/services/api";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

const CreateSlot = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("user_id");
  const AuthToken = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  const validateCreateSlot = yup.object({
    availableDate: yup
      .date()
      .min(new Date(), "Due date cannot be less than today !!")
      .required("Date is required")
      .typeError("Invalid date format"),
    availableTime: yup
      .mixed()
      .test("is-between", "Time should be between 10AM to 6PM", (value) => {
        if (typeof value !== "string") return false;
        const time = value.split(":").map(Number);
        const hours = time[0];
        return hours >= 10 && hours <= 18;
      })
      .required("Time is required"),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        availableDate: "",
        availableTime: "",
      },
      validationSchema: validateCreateSlot,
      onSubmit: async (e: any) => {
        const payload = {
          slot: {
            user_id: `${id}`,
            available_days: values.availableDate,
            available_time: values.availableTime,
          },
        };

        postWithAuth("/slots", payload, config)
          .then(() => {
            toast.dark("Slot Created Successfully!");
            navigate("/admin");
          })
          .catch((error) => {
            toast.error("Try Again with valid credentials!");
            console.error("Error:", error.message);
          });
      },
    });

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            Add Slot
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
                type="date"
                name="availableDate"
                placeholder="Available Date"
                value={values.availableDate}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.availableDate &&
              touched.availableDate &&
              typeof errors.availableDate === "string" ? (
                <p style={{ color: "red" }}>{errors.availableDate}</p>
              ) : null}
            </div>
            <div className="form-group">
              <input
                type="time"
                name="availableTime"
                placeholder="Available Time"
                value={values.availableTime}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.availableTime &&
              touched.availableTime &&
              typeof errors.availableTime === "string" ? (
                <p style={{ color: "red" }}>{errors.availableTime}</p>
              ) : null}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-success">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSlot;
