import { TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "./AddPage.css";

const AddPage = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    Phone: "",
    Balance: "",
  });

  const Navigate = useNavigate();

  const { FirstName, LastName, email, Phone, Balance } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const getData = async () => {
    try {
      const client = await axios.get("http://127.0.0.1:8000/api/client");
      setData(client.data);
    } catch {}
  };

  const onSubmit = async () => {
    const newClient = { FirstName, LastName, email, Phone, Balance };

    try {
      await axios.post("http://127.0.0.1:8000/api/client", newClient);
      Navigate("/home");
      getData();
      toast("New Client Added", {
        position: "bottom-center",
        autoClose: 2000,
        type: "success",
        className: "toasty-success",
      });
    } catch {
      toast("Something went wrong", {
        position: "bottom-center",
        autoClose: 2000,
        type: "error",
        className: "toasty-fail",
      });
    }
  };
  return (
    <div className="AddPage">
      <Link to="/home" className="backLink" style={{ marginTop: "1rem" }}>
        {" "}
        <FaArrowLeft />
        back Home
      </Link>
      <h2>add new client</h2>
      <form>
        <div className="addinput">
          <TextField
            name="FirstName"
            value={FirstName}
            onChange={onChange}
            id="outlined-basic"
            variant="outlined"
            label="Firstname"
            type="text"
            style={{ width: "80%" }}
          />
        </div>
        <div className="addinput">
          <TextField
            name="LastName"
            value={LastName}
            onChange={onChange}
            id="outlined-basic"
            variant="outlined"
            label="Lastname"
            type="text"
            style={{ width: "80%" }}
          />
        </div>
        <div className="addinput">
          <TextField
            name="email"
            value={email}
            onChange={onChange}
            id="outlined-basic"
            variant="outlined"
            label="Email"
            type="email"
            style={{ width: "80%" }}
          />
        </div>
        <div className="addinput">
          <TextField
            name="Phone"
            value={Phone}
            onChange={onChange}
            id="outlined-basic"
            variant="outlined"
            label="Phone Number"
            type="number"
            style={{ width: "80%" }}
          />
        </div>
        <div className="addinput">
          <TextField
            name="Balance"
            value={Balance}
            onChange={onChange}
            id="outlined-basic"
            variant="outlined"
            label="Balance"
            type="number"
            style={{ width: "80%" }}
          />
        </div>
        <Button variant="primary" style={{ width: "70%" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddPage;
