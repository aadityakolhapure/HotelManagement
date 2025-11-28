import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditCustomer = () => {
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });

  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    LoadCustomer();
  }, []);

  const LoadCustomer = () => {
    axios
      .get("https://localhost:7208/api/Customer/" + id)
      .then((res) => setCustomer(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:7208/api/Customer/" + id, customer)
      .then(() => navigate("/customers"))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-3">Edit Customer</h2>

        <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary me-2">
            Update
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/customers")}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCustomer;
