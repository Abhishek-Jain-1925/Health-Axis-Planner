import { useState, useEffect } from "react";
import { get, patchWithAuth } from "../../../shared/services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ISlot {
  slot_id: number;
  doctor_name: string;
  available_date: string;
  time_slot: string;
}

const Slots = () => {
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
        const response = await get("/slots", {
          headers: {
            Authorization: `Bearer ${AuthToken}`,
          },
        });
        console.log("Fetched Slots !!, ", response.data);
        setSlots(response.data);
      } catch (error: any) {
        console.error("Error fetching slots:", error.message);
      }
    };

    fetchSlots();
  }, []);

  const handleBook = (slot_id: any) => {
    patchWithAuth(`/slots/${slot_id}/book`, {}, config)
      .then((response: any) => {
        toast.dark("Slot Booked !");
        navigate("/profile");
      })
      .catch((error: any) => {
        console.error("Error while deleting user:", error);
        toast.dark("Error while booking slot !");
        navigate("/profile");
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
        <h3 className="mt-3">Pick Your Preffered Slot -</h3>
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
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-header mb-2">Slot ID: {slot.slot_id}</h5>
                <p>Doctor Name: {slot.doctor_name}</p>
                <p>Available Date: {slot.available_date}</p>
                <p>Time Slot: {slot.time_slot}</p>
                <button
                  className="btn btn-secondary w-50"
                  onClick={() => handleBook(slot.slot_id)}
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slots;
