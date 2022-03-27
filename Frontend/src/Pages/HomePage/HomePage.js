import React from "react";
import { Tooltip } from "@mui/material";
import "./HomePage.css";
import Navbar from "../../Components/Navbar/Navbar";
import Client from "../../Components/Client/Client";
import Sidebar from "../../Components/SIdebar/Sidebar";

const HomePage = ({ logout, data }) => {
  return (
    <div className="homepage">
      <Navbar logout={logout} />
      <div className="Home-Container">
        <Client data={data} />
        <Tooltip
          title="Add A New Client"
          arrow
          placement="top-end"
          sx={{ width: 1400 }}
        >
          <span>
            <Sidebar />
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default HomePage;
