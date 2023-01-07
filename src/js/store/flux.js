const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: { favorites: []},
    actions: {
      getList: async (element) => {
        let response = await fetch(`https://www.swapi.tech/api/${element}`);
        if (!response.ok)
          console.error(`Error en la petición ${response.statusText}`);
        else {
          let data = await response.json();
          let newStore = {};
          newStore[element] = data.response || data.results;
          setStore(newStore);
        }
      },
      getDetail: async (element, id) => {
        try {
          let response = await fetch(
            `https://www.swapi.tech/api/${element}/${id}`
          );
          if (!response.ok) {
            console.error(`Error en la petición ${response.statusText}`);
            return null;
          } else {
            let data = await response.json();
            return data.result.properties;
          }
        } catch (error) {
          return null;
        }
      },
      addFavorite: (type, chrName, id) => {
        let fav = [...getStore().favorites];
        if(fav.length===0)fav.push({"name":chrName, "type": type, "id": id })
        else{
          fav.every((elem,index)=>{
            if(elem.name==chrName){
              fav.splice(index, 1)
              return false;
            }else{
              fav.push({"name":chrName, "type": type, "id": id })
              return true;
            }
          })
        }
        
        setStore({"favorites":fav});
      },
    },
  };
};

export default getState;
