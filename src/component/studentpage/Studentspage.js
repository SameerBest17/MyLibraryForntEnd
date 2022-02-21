import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function createData(id, firstName, lastName) {
  return { id, firstName, lastName };
}
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },

  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];
export default function DataTable({ setStudent }) {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = () => {
    axios
      .get(`http://localhost:8080/student`)
      .then((res) => {
        const studentList = res.data;
        setStudents(studentList);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const rows = students.map((student) =>
    createData(
      student.id,
      student.first_name.toUpperCase(),
      student.last_name.toUpperCase()
    )
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellClick={(e) => {
          setStudent(e.row);

          navigate("/student");
        }}
      />
    </div>
  );
}
