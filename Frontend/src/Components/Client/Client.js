import { useState, useEffect } from "react";
import axios from "axios";
import "./Client.css";
import { FaUsers } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Client = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const client = await axios.get("http://127.0.0.1:8000/api/client");
      setData(client.data);
    } catch {}
  };

  useEffect(() => {
    getData();
  }, []);

  // Nicely format the Client Balance
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //  For styling Balance
  const BalanceStyle = (x) => {
    if (x === 0) return "green";
    else {
      return "red";
    }
  };

  const amount = data?.map((d) => d.Balance);
  const amountOwned = amount.reduce((a, b) => a + b, 0);

  return (
    <div className="Client">
      <div className="amountOwed">
        Total Amount Owed: <span>&#8358;</span>
        {numberWithCommas(amountOwned)}
      </div>
      <h2>
        <FaUsers size={33} />
        Clients
      </h2>
      <div className="client-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dt) => (
              <tr key={dt.id}>
                <td style={{ fontSize: "1.5rem" }}>
                  {dt.FirstName} {dt.LastName}
                </td>
                <td>{dt.email}</td>
                <td style={{ color: BalanceStyle(dt.Balance) }}>
                  <span>&#8358;</span>
                  {numberWithCommas(dt.Balance)}
                </td>
                <td>
                  <Link to={`/detail/${dt.id}`} className="detailLink">
                    {" "}
                    <BiDetail size={30} />
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Client;
