import { useState } from "react";
import { toast } from "react-toastify";
import { deleteReq } from "../../../../shared/services/api";

const DeleteSlot = () => {
  const AuthToken = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  const handleDelete = (slotID: any) => {
    deleteReq(`/slots/${slotID}`, config)
      .then((response: any) => {
        toast.dark("Slot Deleted Successfully!");
        console.log("Slot Deleted with data:", response.data);
      })
      .catch((error) => {
        toast.error("Error while deleting slot ! ");
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            Alert !
          </h1>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          Are you sure, you want to delete slot ?
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSlot;
