import { useState, useEffect } from "react";
import { deleteReq, get } from "../../../../shared/services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CreateSlot from "./CreateSlot";
import "../../shared/style.css";
import UpdateSlot from "./UpdateSlot";

interface ISlot {
  slot_id: number;
  doctor_name: string;
  available_date: string;
  time_slot: string;
}

const ViewSlots = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState<ISlot[]>([]);
  const AuthToken = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await get("/slots", config);
        console.log("Fetched Slots !!, ", response.data);
        setSlots(response.data);
      } catch (error: any) {
        console.error("Error fetching slots:", error.message);
      }
    };

    fetchSlots();
  }, []);

  const handleDelete = (slotID: any) => {
    deleteReq(`/slots/${slotID}`, config)
      .then((response: any) => {
        toast.dark("Slot Deleted Successfully!");
      })
      .catch((error) => {
        toast.error("Error while deleting slot ! ");
      });
  };

  const handleUpdate = (slotID: any) => {
    if (slotID) {
      localStorage.setItem("slot_id_update", slotID);
    }
  };

  return (
    <div
      className="main"
      style={{
        width: "80vw",
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
        <h3 className="mt-3">Slots -</h3>
        <button
          className="btn btn-outline-success h-25 w-25"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ alignSelf: "flex-end" }}
        >
          Create Slot
        </button>
      </div>
      <div className="contents" style={{ display: "flex", flexWrap: "wrap" }}>
        {slots.map((slot, index) => (
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
              <div className="card-body">
                <h5 className="card-header mb-2">Slot ID: {slot.slot_id}</h5>
                <p>Doctor Name: {slot.doctor_name}</p>
                <p>Available Date: {slot.available_date}</p>
                <p>Time Slot: {slot.time_slot}</p>
                <button
                  className="btn btn-outline-danger s-btn"
                  onClick={() => handleDelete(slot.slot_id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-secondary s-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#update"
                  onClick={() => handleUpdate(slot.slot_id)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <CreateSlot />
      </div>

      <div
        className="modal fade"
        id="update"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <UpdateSlot />
      </div>
    </div>
  );
};

export default ViewSlots;
