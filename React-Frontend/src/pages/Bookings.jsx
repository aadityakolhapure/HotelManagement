import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    axios
      .get("https://localhost:7208/api/Booking")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  };

  const deleteBooking = (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    axios
      .delete(`https://localhost:7208/api/Booking/${id}`)
      .then(() => loadBookings())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h1 className="h3">Bookings</h1>
        <Link to="/bookings/add" className="btn btn-primary">
          Add Booking
        </Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Room</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.bookingId}>
              <td>{b.customer?.name}</td>
              <td>{b.room?.roomNumber}</td>
              <td>{b.checkInDate?.split("T")[0]}</td>
              <td>{b.checkOutDate?.split("T")[0]}</td>
              <td>{b.status}</td>

              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteBooking(b.bookingId)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}

          {bookings.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No Bookings Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
