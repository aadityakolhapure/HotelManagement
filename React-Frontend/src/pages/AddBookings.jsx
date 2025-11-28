import { useEffect, useState } from "react";
import axios from "axios";

export default function AddBookings() {
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    loadDropdownData();
  }, []);

  const loadDropdownData = () => {
    axios
      .get("https://localhost:7208/api/Customer")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Customer API Error:", err));

    axios
      .get("https://localhost:7208/api/Room")
      .then((res) => setRooms(res.data))
      .catch((err) => console.error("Room API Error:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerId || !roomId || !checkIn || !checkOut) {
      alert("Please fill all fields!");
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      alert("Check-out must be after check-in!");
      return;
    }

    const bookingData = {
      customerId,
      roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      status: "Active",
    };

    axios
      .post("https://localhost:7208/api/Booking", bookingData)
      .then(() => {
        alert("Booking Created Successfully!");
        window.location.href = "/bookings";
      })
      .catch((err) => {
        console.error(err);
        alert("Error: Room might already be booked!");
      });
  };

  return (
    <>
      <h1>Add Booking</h1>

      <form className="p-3 border rounded" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Customer</label>
          <select
            className="form-control"
            onChange={(e) => setCustomerId(e.target.value)}
            required>
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.customerId} value={c.customerId}>
                {c.name} ({c.email})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Room</label>
          <select
            className="form-control"
            onChange={(e) => setRoomId(e.target.value)}
            required>
            <option value="">Select Room</option>
            {rooms.map((r) => (
              <option key={r.roomId} value={r.roomId}>
                Room {r.roomNumber} ({r.type})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Check-In Date</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Check-Out Date</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <button className="btn btn-primary">Create Booking</button>
      </form>
    </>
  );
}
