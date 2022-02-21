import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
export default function ButtonAppBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#222" }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ mr: 2 }}>
            My Library
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home Page{" "}
          </Button>
          <Button color="inherit" onClick={() => navigate("/students")}>
            Student List
          </Button>
          <Button color="inherit" onClick={() => navigate("/books")}>
            Book List
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
