import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "../AddPage/AddPage.css";

const Update = () => {
  const [client, setClient] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useParams();

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
    const UpdatedClient = { FirstName, LastName, email, Phone, Balance };

    if (UpdatedClient.FirstName === "") {
      UpdatedClient.FirstName = client.FirstName;
    }
    if (UpdatedClient.LastName === "") {
      UpdatedClient.LastName = client.LastName;
    }
    if (UpdatedClient.email === "") {
      UpdatedClient.email = client.email;
    }
    if (UpdatedClient.Phone === "") {
      UpdatedClient.Phone = client.Phone;
    }
    if (UpdatedClient.Balance === "") {
      UpdatedClient.Balance = client.Balance;
    }

    try {
      axios.put(`http://127.0.0.1:8000/api/client/${id}`, UpdatedClient);
      console.log("Suceesss");
      getData();
      Navigate("/home");
      toast("Updated Successful", {
        position: "bottom-right",
        autoClose: 2000,
        type: "success",
        className: "toasty-success",
      });
    } catch (err) {}
  };

  const getClientDetail = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/client/${id}`);
    setClient(res.data);
  };

  useEffect(() => {
    getClientDetail();
  }, []);

  return (
    <div className="AddPage">
      <Link to="/home" className="backLink" style={{ marginTop: "1rem" }}>
        {" "}
        <FaArrowLeft />
        back Home
      </Link>
      <h2>Update client</h2>
      <form>
        <div className="addinput">
          <TextField
            name="FirstName"
            id="outlined-basic"
            variant="outlined"
            value={FirstName}
            onChange={onChange}
            label={client.FirstName}
            type="text"
            style={{ width: "80%" }}
          />
        </div>
        <div className="addinput">
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="LastName"
            value={LastName}
            onChange={onChange}
            type="text"
            style={{ width: "80%" }}
            label={client.LastName}
          />
        </div>
        <div className="addinput">
          <TextField
            name="email"
            id="outlined-basic"
            variant="outlined"
            label={client.email}
            value={email}
            onChange={onChange}
            type="email"
            style={{ width: "80%" }}
          />
        </div>
        <div className="addinput">
          <TextField
            name="Phone"
            id="outlined-basic"
            variant="outlined"
            type="number"
            value={Phone}
            onChange={onChange}
            style={{ width: "80%" }}
            label={client.Phone}
          />
        </div>
        <div className="addinput">
          <TextField
            name="Balance"
            id="outlined-basic"
            variant="outlined"
            type="number"
            style={{ width: "80%" }}
            label={client.Balance}
            value={Balance}
            onChange={onChange}
          />
        </div>
        <Button variant="primary" style={{ width: "70%" }} onClick={onSubmit}>
          Update
        </Button>
      </form>
    </div>
  );
};

export default Update;
