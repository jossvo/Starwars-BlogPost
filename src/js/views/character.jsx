import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.css";

const CharacterDetails = () => {
  const { element, id } = useParams();
  const { store, actions } = useContext(Context);
  const [elementData, setElementdata] = useState(null);
  const [planetData, setPlanetData] = useState(null);

  useEffect(() => {
    async function getdata() {
      setElementdata(await actions.getDetail(element, id));
      setPlanetData(await actions.getDetail("planets", id));
    }
    getdata();
  });

  return (
    <div className="container">
      <h3></h3>
      <img
        id="characterDetailImg"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        alt=""
      />
      <p>{elementData?.height}</p>
      <img id="characterDetailImg" src={elementData?.homeworld} alt=""
      />
    </div>
  );
};

export default CharacterDetails;
