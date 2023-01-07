import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  var fav = store.favorites;
  return (
    <div>
      <nav className="navbar mb-3">
        <div id="navbar-image">
          <Link to={"/"}>
            <img
              id="local-nav-logo-mobile"
              src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_horiz_2x-f98247cb30aa_c622cfa9.png?region=0,0,732,75"
              alt="Portal Nav - Bottom"
            />
          </Link>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites: {fav.length === 0 ? "0" : fav.length}
          </button>
          <ul className="dropdown-menu">
            {fav.map((elem, index) => {
              return (
                <li className="fav-container dropdown-item" key={index}>
                  <div className="container">
                      <div className="row">
                        <div className="col-2" onClick={()=>actions.addFavorite(elem.type,elem.name,elem.uid)}>
                          <span>
                            <i className="fa fa-trash"></i>
                          </span>
                        </div>
                        <div className="col-6">
                          <Link
                          className="dropdown-item"
                            to={`/${elem.type}/${elem.id}`}
                          >
                            {elem.name}
                          </Link>
                        </div>
                      </div >
                    </div>
                  
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};
