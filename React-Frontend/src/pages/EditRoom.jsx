import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditRoom = () => {
  const [rooms, setRooms] = useState({
    roomnumber: "",
    type: "",
    price: "",
    status: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    LoadRooms();
  }, []);

  const LoadRooms = () => {
    axios
      .get("https://localhost:7208/api/Room/" + id)
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setRooms({ ...rooms, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:7208/api/Room/" + id, rooms)
      .then(() => navigate("/rooms"))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-3">Edit Rooms</h2>

        <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
          <div className="mb-3">
            <label className="form-label">Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={rooms.roomNumber}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Type</label>
            <input
              type="text"
              name="type"
              value={rooms.type}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="text"
              name="price"
              value={rooms.price}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <input
              type="text"
              name="status"
              value={rooms.status}
              onChange={handleChange}
              className="form-control"
              required
              readOnly
            />
          </div>

          <button type="submit" className="btn btn-primary me-2">
            Update
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/rooms")}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default EditRoom;
