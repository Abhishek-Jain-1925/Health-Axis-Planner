import { useEffect, useState } from "react";
import { get } from "../../../shared/services/api";
import { toast } from "react-toastify";

interface IMyAppointments {
  id: number;
  slot_id: number;
  doctor_name: string;
  available_date: string;
  time_slot: string;
}

const MyAppointments = () => {
  const [appointments, setAppointments] = useState<IMyAppointments[]>([]);
  const AuthToken = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  };
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await get("/my_slots", config);
        setAppointments(response.data);
      } catch (error: any) {
        toast.dark("Error while fetching Appointments!");
      }
    };

    fetchAppointments();
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
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3 className="mt-3">My Appointments -</h3>
      </div>
      <div className="contents" style={{ display: "flex", flexWrap: "wrap" }}>
        {appointments.map((appt, index) => (
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
                height: "200px",
                overflow: "hidden",
                backgroundColor: "#f2f2f2",
              }}
            >
              <div className="card-body" style={{ padding: "15px" }}>
                <h5 className="card-header mb-2">Slot ID: {appt.slot_id}</h5>
                <p>Doctor Name : {appt.doctor_name}</p>
                <p>Date : {appt.available_date}</p>
                <p>Time : {appt.time_slot}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
