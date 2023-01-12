import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Pagination from "../../../pagination.jsx";

import ImgNotFound from "../../img/404.jpeg";
import "../../styles/home.css";

const Home = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);

  var itemsArr = ["films","people","planets","species","starships","vehicles"]
  useEffect(() => {
    itemsArr.forEach(elem=>{
      actions.getList(elem); //aqui debería de agregar el pages pero se podría hacer un array de currentpages?
    })
  }, []);
  function errorImage(e) {
    e.target.src=ImgNotFound
  }

  return (
    <div className="charLib">
      {[store.films,store.people,store.planets,store.species,store.starships,store.vehicles].map((elem, elemIndex) => {
        if (elem) {
          let title = "";
          elemIndex === 1 ? (title = "Characters") :
           (title = itemsArr[elemIndex].charAt(0).toUpperCase()+itemsArr[elemIndex].slice(1));
          let type = "";
          title === "Characters" ? (type = "people") :
           (type = itemsArr[elemIndex]);

          return (
            <div key={elemIndex}>
              <div className="titleDiv">
                <h3 className="hrTitle typeTitle">{title}</h3>
                <Pagination pages={5} element={type} currentPage={1} />
              </div>
              <div className="character-container ">
                {elem.map((item, index) => {
                  let elemName =""
                    type==="films"?elemName=item.properties.title
                    :elemName=item.name;
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
                          <h5 className="card-title">{elemName}</h5>
                        </div>
                        <h5 
                        onClick={()=>{
                          actions.addFavorite(type,elemName,item.uid)
                        }}
                        className="favorite"
                        >
                            <i className={
                              store.favorites.some((x) => x.name === elemName)?
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
