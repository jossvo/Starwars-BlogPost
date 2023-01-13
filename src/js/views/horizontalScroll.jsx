import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

import ImgNotFound from "../../img/404.jpeg";
import "../../styles/home.css";

const HorizontalScroll = ({itemType}) => {
  const { store, actions } = useContext(Context);
  const [currentPage,setCurrentPage]=useState(1)
  const [totalPages,setTotalPages]=useState(1)

  useEffect(() => {
    async function fetchData(){
      actions.getList(itemType,currentPage);
    }
    fetchData()
  },[currentPage]);
  function errorImage(e) {
    e.target.src=ImgNotFound
  }

  var elem = store[itemType]
  
  if (elem) {
    let title = "";
    itemType === "people" ? (title = "Characters") :
    (title = itemType.charAt(0).toUpperCase()+itemType.slice(1));

     var paginationDiv =(
      <nav className="ms-auto">
        <ul className="pagination">
          <li>
            <Link className={currentPage===1?"page-link disbledLink":"page-link"} 
            aria-label="Previous" onClick={()=>currentPage!=1?setCurrentPage(currentPage-1):""}>
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>
          {Array(store[itemType+"Pages"]).fill("").map((e, index) => {
              let page=index+1
              return (
                <li key={index} className={currentPage===page?"activePage":""}>
                  <Link className="page-link" to={""} onClick={()=>setCurrentPage(page)}>
                    {page}
                  </Link>
                </li>
              );
            })}
          <li>
            <Link className={currentPage===store[itemType+"Pages"]?"page-link disbledLink":"page-link"} 
            aria-label="Previous" onClick={()=>currentPage!=store[itemType+"Pages"]?setCurrentPage(currentPage+1):""}>
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    )

    return (
      <div className={itemType==="films"?"charLib":""}>
        <div className="titleDiv">
          <h3 className="hrTitle typeTitle">{title}</h3>
          {itemType==="films"?"":paginationDiv}
        </div>
        
        <div className="character-container" style={itemType==="films"?{justifyContent:"center"}:{justifyContent:"left"}}>
          {elem.map((item, index) => {
            let elemName =""
              itemType==="films"?elemName=item.properties.title
              :elemName=item.name;
              return (
                <div className={"character card"} key={index}>
                  <Link id="cardLink" to={`/${itemType}/${item.uid}`}></Link>
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
                    actions.addFavorite(itemType,elemName,item.uid)
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
};

export default HorizontalScroll;