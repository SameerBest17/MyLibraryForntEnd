import React, { useState } from "react";
import BackgroundImage from "../../assets/images/bg.png";
import StudentForm from "../Forms/StudentForm";
import BookForm from "../Forms/BookForm";

const Homepage = () => {
  const [isShowStudentForm, setisShowStudentForm] = useState(false);
  const [isShowSBookForm, setisShowBookForm] = useState(false);

  const handleLStudentClick = () => {
    setisShowStudentForm((isShowStudentForm) => !isShowStudentForm);
  };

  const handleLBookClick = () => {
    setisShowBookForm((isShowBookForm) => !isShowBookForm);
  };

  return (
    <header style={HeaderStyle}>
      <h1 className="main-title text-center">Welcome to Library Portal</h1>
      <p className="main-para text-center">
        This Portal is only For Library Management{" "}
      </p>
      <div>
        {isShowSBookForm ? <BookForm handleClick={handleLBookClick} /> : null}
        {isShowStudentForm ? (
          <StudentForm handleClick={handleLStudentClick} />
        ) : null}
      </div>
      <div className="buttons text-center">
        <button
          className="primary-button"
          id="page_btn"
          onClick={handleLStudentClick}
        >
          <span>Add New Student </span>
        </button>

        <button
          className="primary-button"
          id="page_btn"
          onClick={handleLBookClick}
        >
          <span>Add New Book </span>
        </button>
      </div>
    </header>
  );
};
const HeaderStyle = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

export default Homepage;
