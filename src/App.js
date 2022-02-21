import HomePage from "./component/homepage/Homepage";
import StudentsPage from "./component/studentpage/Studentspage";
import StudentPage from "./component/studentpage/Studentpage";
import BooksPage from "./component/bookpage/Bookspage";
import BookPage from "./component/bookpage/Bookpage";
import AppBar from "./component/appbar/Appbar";
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [selectedStudent, setSelectedStudent] = useState({});
  const [selectedBook, setSelectedBook] = useState({});
  return (
    <div className="App">
      <Router>
        <AppBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            path="/students"
            element={<StudentsPage setStudent={setSelectedStudent} />}
          />
          <Route
            path="/books"
            element={<BooksPage setBook={setSelectedBook} />}
          />
          <Route
            path="/student"
            element={
              Object.keys(selectedStudent).length !== 0 ? (
                <StudentPage student={selectedStudent} />
              ) : (
                <HomePage />
              )
            }
          />
          <Route
            path="/book"
            element={
              Object.keys(selectedBook).length !== 0 ? (
                <BookPage book={selectedBook} />
              ) : (
                <HomePage />
              )
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
const Footer = () => {
  return (
    <p className="text-center" style={FooterStyle}>
      Designed & coded by Sameer Tahir
    </p>
  );
};

const FooterStyle = {
  background: "#222",
  fontSize: ".8rem",
  color: "#fff",
  bottom: 1,
  padding: "1rem",
  margin: 2,
  width: "100%",
  height: "100%",
  opacity: ".9",
};

export default App;
