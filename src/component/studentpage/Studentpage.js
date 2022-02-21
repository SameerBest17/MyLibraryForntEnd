import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const editCard = (
  studentDetails,
  edit,
  handleEidt,
  handlechange,
  upadteStudent,
  handleDiscard,
  handleDelete
) => {
  console.log(studentDetails, edit);
  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          Student Details
        </Typography>

        <br />
        {edit ? (
          <>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              First Name
            </Typography>
            <Typography sx={{ mb: 2 }} variant="body2">
              {studentDetails.firstName}
            </Typography>
          </>
        ) : (
          <TextField
            label={"First Name"}
            name="firstName"
            value={studentDetails.firstName}
            onChange={handlechange}
            id="margin-none"
          />
        )}

        {edit ? (
          <>
            {" "}
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Last Name
            </Typography>
            <Typography variant="body2">{studentDetails.lastName}</Typography>
          </>
        ) : (
          <>
            <br />
            <br />
            <TextField
              label={"Last Name"}
              name="lastName"
              value={studentDetails.lastName}
              onChange={handlechange}
              id="margin-none"
            />
          </>
        )}
      </CardContent>
      <CardActions sx={{ ml: "42%" }}>
        {edit ? (
          <>
            <Button size="small" onClick={handleEidt}>
              Edit Details
            </Button>
            <Button size="small" onClick={handleDelete}>
              Delete Student
            </Button>
          </>
        ) : (
          <>
            <Button size="small" onClick={upadteStudent}>
              Done
            </Button>
            <Button size="small" onClick={handleDiscard}>
              Discard
            </Button>
          </>
        )}
      </CardActions>
    </React.Fragment>
  );
};

export default function OutlinedCard({ student }) {
  const navigate = useNavigate();
  if (Object.keys(student).length === 0) {
    navigate("/students");
  }
  const { id } = student;
  const [studentDetails, setStudentDetails] = useState(student);
  const [edit, setEdit] = useState(true);
  const handleEidt = () => {
    setEdit(!edit);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({
      ...studentDetails, //spread operator
      [name]: value,
    });
  };
  const handleDiscard = () => {
    setStudentDetails(student);
    handleEidt();
  };

  const updateStudent = () => {
    const { firstName, lastName } = studentDetails;
    if (firstName && lastName) {
      axios
        .put(`http://localhost:8080/student/${id}`, studentDetails)
        .then((res) => {
          student = studentDetails;
          handleEidt();
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("invalid input");
    }
  };
  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete the Student from database?"
      )
    ) {
      axios
        .delete(`http://localhost:8080/student/${id}`)
        .then((res) => {
          handleEidt();
          navigate("/students");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("invalid input");
    }
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        {editCard(
          studentDetails,
          edit,
          handleEidt,
          handleChange,
          updateStudent,
          handleDiscard,
          handleDelete
        )}
      </Card>
    </Box>
  );
}
