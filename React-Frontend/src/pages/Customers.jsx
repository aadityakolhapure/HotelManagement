import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    LoadCustomers();
  }, []);

  const LoadCustomers = () => {
    axios
      .get("https://localhost:7208/api/Customer")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err));
  };

  const DeleteCustomer = (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    axios
      .delete(`https://localhost:7208/api/Customer/${id}`)
      .then(() => {
        alert("Customer Deleted");
        LoadCustomers();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
          <h1 className="h3">Customers</h1>

          <Link to="/customers/add" className="btn btn-primary">
            Add Customer
          </Link>
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
          />
          <button className="btn btn-primary" type="button">
            Search
          </button>
        </div>

        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((cust) => (
              <tr key={cust.customerId}>
                <td>{cust.name}</td>
                <td>{cust.email}</td>
                <td>{cust.phone}</td>

                <td>
                  <Link
                    to={`/customers/edit/${cust.customerId}`}
                    className="btn btn-primary me-2">
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => DeleteCustomer(cust.customerId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Customers;
