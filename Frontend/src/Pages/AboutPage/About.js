import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./About.css";

const About = () => {
  return (
    <div className="About">
      <Link to="/home" className="backLink">
        {" "}
        <FaArrowLeft />
        back Home
      </Link>
      <Container className="aboutContainer">
        <Card className="aboutCard">
          <Card.Body>
            <Card.Title className="aboutTitle">about</Card.Title>
            <Card.Subtitle style={{ margin: "2rem 0rem" }}>
              Client Manager v1.0
            </Card.Subtitle>
            <p>
              This is A Content Management System built with React (Javascript)
              and Laravel (PHP). This App allow you to manage amount owed by
              Debtors.{" "}
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default About;
