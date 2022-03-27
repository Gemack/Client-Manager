import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Card, TextField } from "@mui/material";
import { BsFillShieldLockFill } from "react-icons/bs";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Button } from "react-bootstrap";

const Login = ({ auth }) => {
  const [formData, setFormData] = useState({
    UserName: "",
    Password: "",
  });

  // Destructure from the Form state
  const { UserName, Password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const Navigate = useNavigate();

  const onSubmit = async () => {
    const user = { name: UserName, password: Password };

    try {
      await axios.post("http://127.0.0.1:8000/api/client/reg", user);
      auth();
      Navigate("/home");
      toast("Logged in Successful", {
        position: "bottom-center",
        autoClose: 2000,
        type: "success",
        className: "toasty-success",
      });
    } catch {
      toast("Logged in Fail", {
        position: "bottom-center",
        autoClose: 2000,
        type: "error",
        className: "login-fail",
      });
    }
  };

  return (
    <div className="login">
      <Card className="login-container">
        <BsFillShieldLockFill color="blue" size={50} />
        <h1>provide authorization</h1>
        <form>
          <div className="inputField">
            <TextField
              id="standard-basic"
              variant="standard"
              label="username"
              type="text"
              className="text"
              name="UserName"
              value={UserName}
              onChange={onChange}
            />
          </div>
          <div className="inputField">
            <TextField
              id="standard-basic"
              variant="standard"
              label="password"
              type="password"
              className="text"
              name="Password"
              value={Password}
              onChange={onChange}
            />
          </div>
        </form>
        <Button variant="primary" style={{ width: "70%" }} onClick={onSubmit}>
          Login
        </Button>
      </Card>
    </div>
  );
};

export default Login;
