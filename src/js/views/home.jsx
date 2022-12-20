import React, { useContext, useEffect, useState } from "react";
import obiwanImage from "../../img/Obi Wan.jpg";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const Home = () => {
  const { store, actions } = useContext(Context);
  const [planetsInfo, setPlanetsInfo] = useState([]);

  useEffect(() => {
    actions.getList("planets");
  }, []);
  return (
    <div>
      <div className="titleDiv">
        <h3 className="hrTitle">Characters</h3>
      </div>
      <div className="character-container mt-5">
        <div className="character card" style={{ width: "18rem" }}>
          <img src={obiwanImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text" style={{ color: "black" }}>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
          <div className="bottom"></div>
        </div>
      </div>

      <div className="titleDiv">
        <h3 className="hrTitle">Planets</h3>
      </div>
      <div className="row character-container mt-5">
          {store.planets?.map((planet,index) => {
            return (
                <div
                  className="character card"
                  style={{ width: "18rem" }}
				  key={index}
                >
                  <img src={obiwanImage} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{planet.name}</h5>
                    <p className="card-text" style={{ color: "black" }}>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                  <div className="bottom"></div>
                </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
