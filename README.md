# 🏨 Hotel Management Web API

A backend Web API built using **ASP.NET Core**, **Entity Framework Core**, and **SQL Server**.
This system manages **Rooms, Customers, and Bookings**, including **double-booking prevention** and **auto room status updates**.

---

## 📌 Features

### 🧍 Customers Module

* Add Customer
* Edit Customer
* Delete Customer
* Get Customer by ID
* Get All Customers

### 🏨 Rooms Module

* Add Room
* Edit Room
* Delete Room
* Get Room by ID
* Get All Rooms
* Auto-update room status (Available ↔ Booked)

### 📅 Bookings Module

* Create Booking
* Prevent booking already booked rooms
* Block date overlapping (double-booking prevention)
* Cancel Booking
* Auto-change Room status
* Get all bookings with room + customer details

---

# 📦 Tech Stack

| Layer    | Technology            |
| -------- | --------------------- |
| Backend  | ASP.NET Core Web API  |
| ORM      | Entity Framework Core |
| Database | SQL Server            |
| Tools    | Postman     |
| Language | C#                    |

---

# 🗄️ Database Schema

### Rooms Table

| Column     | Type          |
| ---------- | ------------- |
| RoomId     | int (PK)      |
| RoomNumber | string        |
| Type       | string        |
| Price      | decimal(18,2) |
| Status     | string        |

### Customers Table

| Column     | Type     |
| ---------- | -------- |
| CustomerId | int (PK) |
| Name       | string   |
| Email      | string   |
| Phone      | string   |

### Bookings Table

| Column       | Type     |
| ------------ | -------- |
| BookingId    | int (PK) |
| CustomerId   | int (FK) |
| RoomId       | int (FK) |
| CheckInDate  | DateTime |
| CheckOutDate | DateTime |
| Status       | string   |

---

# 📁 Project Structure

```
HotelManagement/
│
├── Controllers/
│   ├── RoomController.cs
│   ├── CustomerController.cs
│   └── BookingController.cs
│
├── Models/
│   ├── Room.cs
│   ├── Customers.cs
│   └── Bookings.cs
│
├── Data/
│   └── ApplicationDbContext.cs
│
└── appsettings.json
```

---

# 🚀 Running the Project

### 1. Configure Database

Update your connection string in **appsettings.json**:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=HotelDB;Trusted_Connection=True;"
}
```

---

### 2. Create Database

Run these commands in **Package Manager Console**:

```
Add-Migration Initial
Update-Database
```

---

### 3. Run the API

Run the project:

```
dotnet run
```

OR press **F5** in Visual Studio.

---

### 4. Test Endpoints

Use:

* **Postman** → Import sample JSON below

---

# 🚀 API Endpoints

## 🧍 Customer APIs

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/api/Customer`      | Get all customers   |
| GET    | `/api/Customer/{id}` | Get single customer |
| POST   | `/api/Customer`      | Add new customer    |
| PUT    | `/api/Customer/{id}` | Edit customer       |
| DELETE | `/api/Customer/{id}` | Delete customer     |

---

## 🏨 Room APIs

| Method | Endpoint          | Description    |
| ------ | ----------------- | -------------- |
| GET    | `/api/Room`      | Get all rooms  |
| GET    | `/api/Room/{id}` | Get room by ID |
| POST   | `/api/Room`      | Add room       |
| PUT    | `/api/Room/{id}` | Edit room      |
| DELETE | `/api/Room/{id}` | Delete room    |

---

## 📅 Booking APIs

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/api/Booking`      | Get all bookings  |
| GET    | `/api/Booking/{id}` | Get booking by ID |
| POST   | `/api/Booking`      | Create booking    |
| DELETE | `/api/Booking/{id}` | Cancel booking    |

---

# ⛔ Double Booking Prevention Logic

Your API prevents booking a room during overlapping dates:

```csharp
booking.CheckInDate < b.CheckOutDate &&
booking.CheckOutDate > b.CheckInDate
```

This blocks:

* Same-day conflicts
* Overlapping stays
* Partial overlaps
* Full overlaps

✔ Ensures room cannot be booked twice
✔ Works like real hotel systems

---

# 🧪 Sample JSON for Postman

## ➕ Add Customer

```json
{
  "name": "Aaditya Kolhapure",
  "email": "aaditya@example.com",
  "phone": "8983081348"
}
```

---

## ➕ Add Room

```json
{
  "roomNumber": "103",
  "type": "Deluxe Non-AC",
  "price": 1500,
  "status": "Available"
}
```

---

## ➕ Create Booking

```json
{
  "customerId": 1,
  "roomId": 2,
  "checkInDate": "2025-02-20",
  "checkOutDate": "2025-02-25"
}
```

---

## ❌ Overlapping Booking (should FAIL)

```json
{
  "customerId": 3,
  "roomId": 2,
  "checkInDate": "2025-02-22",
  "checkOutDate": "2025-02-23"
}
```

---

## ❌ Booking Already Booked Room (should FAIL)

```json
{
  "customerId": 2,
  "roomId": 2,
  "checkInDate": "2025-03-01",
  "checkOutDate": "2025-03-05"
}
```

---

# 🗑 Cancel Booking

DELETE request (no JSON required):

```
DELETE /api/bookings/1
```

---

# 🎉 Conclusion

This **Hotel Management Web API** provides a complete backend solution with:

✔ Room Management
✔ Customer Management
✔ Booking System
✔ Date-Overlap Prevention
✔ Clean APIs tested in Postman

