import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <div className="bg-primary text-white text-center py-5">
        <h1 className="display-4 fw-bold">Hotel Management System</h1>
        <p className="lead mt-3">
          Manage Rooms, Customers, and Bookings Easily
        </p>
        <Link to="/rooms" className="btn btn-light btn-lg mt-3">
          Get Started
        </Link>
      </div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Features</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Room Management</h5>
                <p className="card-text">
                  Add, edit, and manage room details easily.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Customer Management</h5>
                <p className="card-text">
                  Keep track of customer records and contact details.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Booking System</h5>
                <p className="card-text">
                  Book rooms and prevent double bookings efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-light text-center text-muted py-3 mt-5 fixed-bottom">
        <small>© {new Date().getFullYear()} Hotel Management System</small>
      </footer>
    </div>
  );
}

export default Dashboard;
