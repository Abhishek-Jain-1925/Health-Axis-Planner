import { useEffect, useState } from "react";
import { get, patchWithAuth } from "../../../shared/services/api";
import { toast } from "react-toastify";

interface IAppointments {
  id: number;
  slot_id: number;
  Doctor_name: string;
  Patient_name: string;
  bookeded_at: string;
}

const payload = {
  status: "cancelled",
};

const ListAppointments = () => {
  const [appointments, setAppointments] = useState<IAppointments[]>([]);
  const AuthToken = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await get("/appointments", config);
        setAppointments(response.data);
      } catch (error: any) {
        toast.dark("Error fetching Appointments:", error.message);
      }
    };

    fetchAppointments();
  }, []);
  const handleDelAppt = (id: any) => {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };

    patchWithAuth(`/appointments/${id}`, payload, config)
      .then((response: any) => {
        toast.dark("Appointment Cancelled!");
        console.log("Appointment updated with data:", response.data);
      })
      .catch((error: any) => {
        toast.error("Error while updating status : ", error.message);
        console.error("Error:", error.message);
      });
  };
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
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3 className="mt-3">Appointments -</h3>
      </div>
      <div className="contents" style={{ display: "flex", flexWrap: "wrap" }}>
        {appointments.length > 0 ? (
          appointments.map((appt, index) => (
            <div
              key={index}
              style={{
                flex: "0 0 45%",
                margin: "10px",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                className="card"
                style={{
                  width: "100%",
                  height: "260px",
                  overflow: "hidden",
                  backgroundColor: "#f2f2f2",
                }}
              >
                <div className="card-body" style={{ padding: "15px" }}>
                  <h5 className="card-header mb-2">Slot ID: {appt.slot_id}</h5>
                  <p>Appointment ID : {appt.id}</p>
                  <p>Patient Name: {appt.Patient_name}</p>
                  <p>Booked at : {appt.bookeded_at}</p>
                </div>
                <center>
                  <button
                    className="btn btn-outline-danger s-btn"
                    onClick={() => handleDelAppt(appt.id)}
                  >
                    Cancel
                  </button>
                </center>
              </div>
            </div>
          ))
        ) : (
          <div>
            <br />
            <h2>No appointments available</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListAppointments;
