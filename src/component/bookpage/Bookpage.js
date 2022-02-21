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
  bookDetails,
  edit,
  handleEidt,
  handlechange,
  upadteBook,
  handleDiscard,
  handleDelete
) => {
  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h4" component="div">
          Book Details
        </Typography>

        <br />
        {edit ? (
          <>
            <Typography sx={{ mb: 1 }} color="text.secondary" variant="body2">
              Name
            </Typography>
            <Typography sx={{ mb: 2 }} variant="body2">
              {bookDetails.name}
            </Typography>
          </>
        ) : (
          <TextField
            label={"Name"}
            name="name"
            value={bookDetails.name}
            onChange={handlechange}
            id="margin-none"
          />
        )}

        {edit ? (
          <>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Author
            </Typography>
            <Typography sx={{ mb: 2 }} variant="body2">
              {bookDetails.author}
            </Typography>
          </>
        ) : (
          <TextField
            label={"Author"}
            name="author"
            value={bookDetails.author}
            onChange={handlechange}
            id="margin-none"
          />
        )}
        {edit ? (
          <>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Borrowed By
            </Typography>
            <Typography sx={{ mb: 2 }} variant="body2">
              {bookDetails.borrowedBy}
            </Typography>
          </>
        ) : (
          <TextField
            label={"Borrowed By"}
            name="borrowedBy"
            value={bookDetails.borrowedBy}
            onChange={handlechange}
            id="margin-none"
          />
        )}
        {edit ? (
          <>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Borrowed Date
            </Typography>
            <Typography sx={{ mb: 2 }} variant="body2">
              {bookDetails.borrowedDate}
            </Typography>
          </>
        ) : (
          <>
            <br />
            <br />
            <label htmlFor="borrowed-date">Borrowed Date:</label>

            <input
              type="date"
              id="borrowed-date"
              label="Borrowed Date"
              name="borrowedDate"
              value={bookDetails.borrowedDate}
              onChange={handlechange}
            ></input>
          </>
        )}
        {edit ? (
          <>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Expected Return Date
            </Typography>
            <Typography sx={{ mb: 2 }} variant="body2">
              {bookDetails.returnDate}
            </Typography>
          </>
        ) : (
          <>
            <t />
            <label htmlFor="return-date">Expected Return Date :</label>
            <input
              type="date"
              id="return-date"
              name="returnDate"
              label="Retrun Date"
              value={bookDetails.returnDate}
              onChange={handlechange}
            ></input>
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
              Delete Book
            </Button>
          </>
        ) : (
          <>
            <Button size="small" onClick={upadteBook}>
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

export default function OutlinedCard({ book }) {
  const navigate = useNavigate();

  const { id } = book;
  const [bookDetails, setBookDetails] = useState(book);
  const [edit, setEdit] = useState(true);
  if (Object.keys(bookDetails).length === 0) {
    navigate("/books");
  }
  const handleEidt = () => {
    setEdit(!edit);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({
      ...bookDetails, //spread operator
      [name]: value,
    });
  };
  const handleDiscard = () => {
    setBookDetails(book);
    handleEidt();
  };

  const updateBook = () => {
    axios
      .put(`http://localhost:8080/book/${id}`, { bookDetails })
      .then((res) => {
        book = bookDetails;
        handleEidt();
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleDelete = () => {
    if (
      window.confirm("Are you sure you want to delete the book from database?")
    ) {
      axios
        .delete(`http://localhost:8080/book/${id}`)
        .then((res) => {
          handleEidt();
          navigate("/books");
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
          bookDetails,
          edit,
          handleEidt,
          handleChange,
          updateBook,
          handleDiscard,
          handleDelete
        )}
      </Card>
    </Box>
  );
}
