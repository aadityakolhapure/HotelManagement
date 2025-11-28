import axios from "axios";
import { useState } from "react";

function AddCustomer() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:7208/api/Customer", {
        Name: Name,
        Email: Email,
        Phone: Phone,
      })
      .then(() => console.log("Customer Added"))
      .catch((err) => console.error(err));

    setName("");
    setEmail("");
    setPhone("");

    window.location.href = "/customers";
  };
  return (
    <>
      <h1>Add Customer</h1>
      <form action="" className="p-3 border rounded" method="post">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}>
          Add Customer
        </button>
      </form>
    </>
  );
}

export default AddCustomer;
