import React from "react";
import cat from "./images/catlighter.png";
import scalaIcon from "./images/scalaIcoWhite.png";
import reactIcon from "./images/reactico.svg";
import "./MainScreen.css";
import { Link } from "react-router-dom";

//clicking on the start could explode the page

export const MainScreen = () => {
  return (
    <div className="content">
      <h1>
        <span className="exploding-text bold">EXPLODING </span>{" "}
        <span className="white-text bold">KITTENS</span>
      </h1>
      <div id="edition">
        Scala
        <img src={scalaIcon} className="fwIcons" alt="" />
        + React
        <img src={reactIcon} className="fwIcons" alt="" />
        Edition
      </div>

      <button className="start-button button">
        <Link to="/rooms" className="link">
          START
        </Link>
      </button>
      <img src={cat} id="cat-lighter" alt="" />
    </div>
  );
};
