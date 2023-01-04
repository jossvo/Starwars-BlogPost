import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

import tatooineImg from "../../img/Tatooine.png";
import "../../styles/home.css";

const Home = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    actions.getList("planets");
    actions.getList("people");
  }, []);
  //function to enable card onclick event when page finished loading
  window.addEventListener("load", function () {
    setLoading(false);
  });

  return (
    <div>
      {[store.people, store.planets].map((elem, elemIndex) => {
        if (elem) {
          let title = "";
          elemIndex === 0 ? (title = "Characters") : (title = "Planets");
          let type = "";
          title === "Characters" ? (type = "people") : (type = "planets");
          return (
            <div key={elemIndex}>
              <div className="titleDiv">
                <h3 className="hrTitle">{title}</h3>
              </div>
              <div className="character-container ">
                {elem.map((item, index) => {
                  return (
                      <div className="character card" key={index}>
                        <Link to={`/${type}/${item.uid}`}></Link>
                        <img
                          src={
                            title === "Planets" && item.uid === "1"
                              ? tatooineImg
                              : `https://starwars-visualguide.com/assets/img/${title.toLocaleLowerCase()}/${
                                  item.uid
                                }.jpg`
                          }
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-decal"></div>
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                        </div>
                        <div className="bottom"></div>
                      </div>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Home;
