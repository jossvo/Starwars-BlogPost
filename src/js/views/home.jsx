import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

import tatooineImg from "../../img/Tatooine.png";
import "../../styles/home.css";

const Home = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);

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
                <h3 className="hrTitle typeTitle">{title}</h3>
                <nav>
                  <ul className="pagination">
                    <li>
                      <Link className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="page-link" href="#">
                        1
                      </Link>
                    </li>
                    <li>
                      <Link className="page-link" href="#">
                        1
                      </Link>
                    </li>
                    <li>
                      <Link className="page-link" href="#">
                        1
                      </Link>
                    </li>
                    <li>
                      <Link className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="character-container ">
                {elem.map((item, index) => {
                  return (
                    <div className="character card" key={index}>
                      <Link id="cardLink" to={`/${type}/${item.uid}`}></Link>
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
