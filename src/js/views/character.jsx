import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import ImgNotFound from "../../img/404.jpeg";
import "../../styles/demo.css";

const CharacterDetails = () => {
  const { element, id } = useParams();
  const { store, actions } = useContext(Context);
  const [elementData, setElementdata] = useState(null);
  const [planetData, setPlanetData] = useState(null);

  useEffect(() => {
    async function getdata() {
      setElementdata(await actions.getDetail(element, id));
    }
    getdata();
  });
  useEffect(() => {
    if(element==="people"){
      async function getdata() {
        setPlanetData(await actions.getDetail("planets", parseInt(elementData?.homeworld.slice(elementData.homeworld.lastIndexOf("/") + 1))));
      }
      getdata();
    }
  },[elementData]);

  function errorImage(e) {
    e.target.src=ImgNotFound
  }

  var elementArr = []
  var elemType=element
  function titleCase(str) {
    //let string = stringConvert.charAt(0).toUpperCase() + stringConvert.slice(1)
    return str;
  }

  if(elementData){
    if(element==="people")elemType="characters"
    for (const [key, value] of Object.entries(elementData)) {
      if(key==="created")break;
      elementArr.push(key)
    }
  }

  return (
    <div id="charContainer">
      <img
        id="characterDetailImg"
        src={`https://starwars-visualguide.com/assets/img/${elemType}/${id}.jpg`}
        onError={errorImage}
        alt=""
      />
      <div className="charInfo">
        <h3>{elementData?.name}</h3>
        <ul id="charDetailLi">
          {elementData
            ? elementArr.map((elem, index) => {
              var tempVar = elementData[elem]
              if(tempVar!="" && !tempVar.includes("http")&& typeof tempVar==="string"){
                return (
                  <li key={index}>
                    <span>
                      <i className="fa-brands fa-galactic-senate"></i>
                    </span>
                    {`  ${titleCase(elem.replace("_"," "))}: ` + titleCase(elementData[elem])}
                  </li>
                );
              }
              })
            : ""}
            {planetData?<li>
              <span><i className="fa-brands fa-galactic-senate"></i></span>
              {"  Homeworld: "}{titleCase(planetData.name)}
            </li>
            :""
            }
            
        </ul>
        <div
          className="bottom"
          style={{ width: "40%", marginLeft: "5%" }}
        ></div>
      </div>
    </div>
  );
};

export default CharacterDetails;
