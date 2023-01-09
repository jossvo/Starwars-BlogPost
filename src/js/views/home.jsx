import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

import ImgNotFound from "../../img/404.jpeg";
import "../../styles/home.css";

const Home = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);

  var itemsArr = ["people","planets","species","starships","vehicles"]
  useEffect(() => {
    itemsArr.forEach(elem=>{
      actions.getList(elem);
    })
  }, []);
  function errorImage(e) {
    e.target.src="https://assets.materialup.com/uploads/52ccfcff-ec98-4166-927d-467a9a52bdf9/preview.png"
  }
  return (
    <div>
      {[store.people,store.planets,store.species,store.starships,store.vehicles].map((elem, elemIndex) => {
        if (elem) {
          let title = "";
          elemIndex === 0 ? (title = "Characters") :
           (title = itemsArr[elemIndex].charAt(0).toUpperCase()+itemsArr[elemIndex].slice(1));
          let type = "";
          title === "Characters" ? (type = "people") :
           (type = itemsArr[elemIndex]);

          return (
            <div key={elemIndex}>
              <div className="titleDiv">
                <h3 className="hrTitle typeTitle">{title}</h3>
              </div>
              <div className="character-container ">
                {elem.map((item, index) => {
                  return (
                    <div className="character card" key={index}>
                      <Link id="cardLink" to={`/${type}/${item.uid}`}></Link>
                      <img
                        src={`https://starwars-visualguide.com/assets/img/${title.toLocaleLowerCase()}/${
                                item.uid
                              }.jpg`
                        }
                        onError={errorImage}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-decal"></div>
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                      </div>
                      <h5 
                      onClick={()=>{
                        actions.addFavorite(type,item.name,item.uid)
                      }}
                      className="favorite"
                      >
                          <i className={
                            store.favorites.some((x) => x.name === item.name)?
                            "fa-solid fa-heart":
                            "fa-regular fa-heart"
                            }
                          ></i>
                      </h5>
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
