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
      <div id="Logo">
        <h1 id="main-title">
          <span className="exploding-text bold">EXPLODING </span>
          <span className="white-text bold">KITTENS</span>
        </h1>
        <div id="edition">
          Scala
          <img src={scalaIcon} className="fwIcons" alt="" draggable="false" />
          + React
          <img src={reactIcon} className="fwIcons" alt="" draggable="false" />
          Edition
        </div>
      </div>
      <button className="start-button button">
        <Link to="/rooms" className="link">
          START
        </Link>
      </button>
      <img src={cat} id="cat-lighter" alt="" draggable="false" />
    </div>
  );
};
