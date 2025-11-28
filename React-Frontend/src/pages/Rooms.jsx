import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    LoadRooms();
  }, []);

  const LoadRooms = () => {
    axios
      .get("https://localhost:7208/api/Room")
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));
  };

  

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom">
          <h1 className="h3">Rooms</h1>

          <Link to="/rooms/add" className="btn btn-primary">
            Add Room
          </Link>
        </div>

        

        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Room No</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room.roomId}>
                <td>{room.roomNumber}</td>
                <td>{room.type}</td>
                <td>{room.price}</td>
                <td>{room.status}</td>
                <td>
                  <Link
                    to={`/rooms/edit/${room.roomId}`}
                    className="btn btn-primary me-2">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Rooms;
