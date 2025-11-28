import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import StudentList from "./components/StudentList.jsx";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Rooms from "./pages/Rooms.jsx";
import AddRoom from "./pages/AddRoom.jsx";
import Customers from "./pages/Customers.jsx";
import AddCustomer from "./pages/AddCustomer.jsx";
import Bookings from "./pages/Bookings.jsx";
import AddBookings from "./pages/AddBookings.jsx";
import EditCustomer from "./pages/EditCustomer.jsx";
import EditRoom from "./pages/EditRoom.jsx";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="p-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/add" element={<AddRoom />} />
            <Route path="/rooms/edit/:id" element={<EditRoom />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/add" element={<AddCustomer />} />
            <Route path="/customers/edit/:id" element={<EditCustomer />} />

            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/add" element={<AddBookings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
