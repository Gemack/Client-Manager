import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { BsFillPeopleFill } from "react-icons/bs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Navbar = ({ logout }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onClick = () => {
    logout();
    handleClose();
  };
  return (
    <nav>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you what to logout of the application?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>no</Button>
            <Button
              onClick={() => {
                onClick();
              }}
              autoFocus
            >
              yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Container className="NavContainer">
        <Link to="/home" className="homeLink">
          <h1>
            <BsFillPeopleFill size={50} />
            Client <span> Manager</span>
          </h1>
        </Link>
        <ul>
          <li>
            <button to="/" className="navLink-button" onClick={handleClickOpen}>
              Sign out
            </button>
          </li>
          <li>
            <Link to="/about" className="navLink">
              About
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
