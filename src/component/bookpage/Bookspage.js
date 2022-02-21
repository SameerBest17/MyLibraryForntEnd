import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function createData(id, name, author, borrowedBy, borrowedDate, returnDate) {
  return { id, name, author, borrowedBy, borrowedDate, returnDate };
}
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "author", headerName: "Author", width: 150 },
  { field: "borrowedBy", headerName: "Borrowed By", width: 300 },
  { field: "borrowedDate", headerName: "Borrowed Date", width: 130 },
  { field: "returnDate", headerName: "Expected Return Date", width: 130 },
];
const dateString = (date) => {
  var dateObj = new Date(date);
  var month = dateObj.getUTCMonth() + 1; //months from 1-12.
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  return year + "/" + month + "/" + day;
};
export default function DataTable({ setBook }) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = () => {
    axios
      .get(`http://localhost:8080/book`)
      .then((res) => {
        const bookList = res.data;

        setBooks(bookList);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const rows = books.map((book) => {
    let brodate,
      returndate = null;
    if (book.borrowedDate && book.expectedReturnDate) {
      brodate = dateString(book.borrowedDate);
      returndate = dateString(book.expectedReturnDate);
    }

    return createData(
      book.id,
      book.name.toUpperCase(),
      book.author.toUpperCase(),
      book.borrowedBy?.toUpperCase(),
      brodate,
      returndate
    );
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellClick={(e) => {
          setBook(e.row);

          navigate("/book");
        }}
      />
    </div>
  );
}
