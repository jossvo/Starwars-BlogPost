import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import HorizontalScroll from "./horizontalScroll.jsx";

import ImgNotFound from "../../img/404.jpeg";
import "../../styles/home.css";

const Home = () => {
  return (
    <div>
      <HorizontalScroll itemType="films"/>
      <HorizontalScroll itemType="people"/>
      <HorizontalScroll itemType="planets"/>
      <HorizontalScroll itemType="species"/>
      <HorizontalScroll itemType="starships"/>
      <HorizontalScroll itemType="vehicles"/>
    </div>
  );
};

export default Home;
