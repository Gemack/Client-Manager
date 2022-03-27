import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TextField, Tooltip } from "@mui/material";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import "./Detail.css";
import { Card, Row, Col, ListGroup, Button, Modal } from "react-bootstrap";

const Details = ({ logout }) => {
  //  this logout function is from the parent App.js //

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [balanceUpdate, setBalanceUpdate] = useState(false);
  const [Balance, setBalance] = useState({});
  const [client, setClient] = useState([]);
  const { id } = useParams();
  const Navigate = useNavigate();

  const onChange = (e) => {
    setBalance(e.target.value);
  };
  const getClientDetail = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/client/${id}`);
    setClient(res.data);
  };

  const Update = async () => {
    const UpdatedBalance = {
      Balance,
    };
    if (UpdatedBalance.Balance === "") {
      UpdatedBalance.Balance = 0;
    }

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/client/sig/${id}`,
        UpdatedBalance
      );
      getClientDetail();
      toast("Balance Updated", {
        position: "top-center",
        autoClose: 2000,
        type: "success",
        className: "toasty-success",
      });
      setBalanceUpdate(!balanceUpdate);
    } catch {}
  };

  const onDelete = () => {
    Delete();
    handleClose();
  };
  const Delete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/client/${id}`);
      Navigate("/home");
      toast("Client Deleted", {
        position: "bottom-center",
        autoClose: 2000,
        type: "success",
        className: "toasty-delete",
      });
    } catch {}
  };

  useEffect(() => {
    getClientDetail();
  }, []);

  let balanceForm = "";

  if (balanceUpdate) {
    balanceForm = (
      <form>
        <TextField
          name="Balance"
          value={Balance}
          onChange={onChange}
          id="standard-basic"
          variant="standard"
          label="Update Balance"
          type="number"
          className="balanceUpdate"
        />
        <Button variant="primary" onClick={Update}>
          Update
        </Button>
      </form>
    );
  } else {
    balanceForm = null;
  }

  //  ============== This function Style the color of the balance ========== //
  const BalanceStyle = (x) => {
    if (x === 0) return "green";
    else {
      return "red";
    }
  };

  // =================================================================
  return (
    <div className="Details">
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this client ?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                onDelete();
              }}
            >
              yes
            </Button>
            <Button variant="primary" onClick={handleClose}>
              no
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Navbar logout={logout} />
      <div className="Detail-head">
        <Link to="/home" className="backLink">
          <FaArrowLeft />
          back Home
        </Link>

        <div className="operations">
          <Tooltip title="Update This Existing client">
            <Link className="edit" to={`/detail/update/${client.id}`}>
              <MdEditNote size={40} style={{ color: "white" }} />
            </Link>
          </Tooltip>
          <Tooltip title="Delete This Existing Client">
            <button className="delete" onClick={handleShow}>
              <AiFillDelete size={40} style={{ color: "white" }} />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="client-body">
        <Card>
          <Card.Header style={{ fontSize: "1.9rem" }}>
            {client.FirstName} {client.LastName}
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={8} sm={6}>
                <Card.Title style={{ fontSize: "1.9rem" }}>
                  Client ID: <span>{client.id}</span>
                </Card.Title>
              </Col>
              <Col md={4} sm={6}>
                <Card.Title>
                  Client Balance:{" "}
                  <span style={{ color: BalanceStyle(client.Balance) }}>
                    &#8358;{client.Balance}
                  </span>{" "}
                  <Tooltip title="Update Client Balance">
                    <small
                      onClick={() => setBalanceUpdate(!balanceUpdate)}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      <FaPen />
                    </small>
                  </Tooltip>
                  {balanceForm}
                </Card.Title>
              </Col>
            </Row>
            <hr />
            <ListGroup variant="flush">
              <ListGroup.Item>
                Contact email: <span>{client.email}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Contact phone: <span>{client.Phone}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Details;
