import axios from "axios";
import { useState } from "react";

function AddRoom() {
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://localhost:7208/api/Room", {
        RoomNumber: roomNumber,
        Type: type,
        Price: price,
        Status: status,
      })
      .then(() => {
        alert("Room Added Successfully");

        setRoomNumber("");
        setType("");
        setPrice("");
        setStatus("");

        window.location.href = "/rooms";
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>Add Room</h1>

      <form className="p-3 border rounded" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Room Number</label>
          <input
            type="text"
            className="form-control"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Room Type</label>
          <input
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Status</label>
          <input
            type="text"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Add Room
        </button>
      </form>
    </>
  );
}

export default AddRoom;
