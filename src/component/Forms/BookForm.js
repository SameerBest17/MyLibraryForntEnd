import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Popup = ({ handleClick, setBooks }) => {
  const [book, setBook] = useState({
    name: "",
    author: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book, //spread operator
      [name]: value,
    });
  };
  const createBook = () => {
    const { name, author } = book;
    if (name && author) {
      axios
        .post(`http://localhost:8080/book`, book)
        .then((res) => {
          alert("Added new Book");
          handleClick();
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("invalid input");
    }
  };
  return (
    <div className="popup-box ">
      <div className="box">
        <span className="close-icon" onClick={handleClick}>
          x
        </span>
        <h2>Book Details</h2>
        <br />
        <form action="/">
          <TextField
            id="outlined-basic"
            label="Book Name"
            variant="outlined"
            value={book.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />

          <TextField
            type="text"
            name="author"
            label="Book Authore"
            variant="outlined"
            required
            value={book.author}
            onChange={handleChange}
            autoComplete="off"
          />
          <br />
          <br />
          <Button variant="outlined" onClick={createBook}>
            Add Book
          </Button>
        </form>
        <footer></footer>
      </div>
    </div>
  );
};
export default Popup;
