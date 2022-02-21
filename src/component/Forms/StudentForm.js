import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Popup = ({ handleClick }) => {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student, //spread operator
      [name]: value,
    });
  };
  const createStudent = () => {
    const { email, firstName, lastName } = student;
    if (email && firstName && lastName) {
      axios
        .post(`http://localhost:8080/student`, student)
        .then((res) => {
          alert("Added student");
          handleClick();
        })
        .catch((error) => {
          alert("Failed to Add Student Try Again", error);
          alert(error);
        });
    } else {
      alert("Invalid Email or first name or last name");
    }
  };
  return (
    <div className="popup-box ">
      <div className="box">
        <span className="close-icon" onClick={handleClick}>
          x
        </span>
        <h2>Student Details</h2>
        <form action="/">
          <br />
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            value={student.firstName}
            onChange={handleChange}
            required
            autoComplete="off"
          />

          <TextField
            type="text"
            name="lastName"
            label="Last name"
            variant="outlined"
            required
            value={student.lastName}
            onChange={handleChange}
            autoComplete="off"
          />
          <TextField
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            required
            value={student.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <br />
          <br />
          <Button variant="outlined" onClick={createStudent}>
            Add Student
          </Button>
        </form>
        <footer></footer>
      </div>
    </div>
  );
};
export default Popup;
