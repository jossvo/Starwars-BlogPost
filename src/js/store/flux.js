const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: { favorites: []},
    actions: {
      getList: async (element,page=1) => {
        let response = await fetch(`https://www.swapi.tech/api/${element}?page=${page}&limit=10`);
        if (!response.ok)
          console.error(`Error en la petición ${response.statusText}`);
        else {
          let data = await response.json();
          let newStore = {};
          newStore[element] = data.response || data.results || data.result;
          newStore[element+"Pages"]=data.total_pages
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
				const store = getStore();
				const actions = getActions();
				let valueExist, valueIndex;
				for (let i = 0; i < store.favorites.length; i++) {
					if(store.favorites[i].name == chrName){
						valueExist = true
						valueIndex = i;
					}
				}
				if (valueExist === true) {
					actions.removeFavorite(valueIndex)
				} else {
					setStore({favorites: [...store.favorites, {"name":chrName, "type": type, "id": id }]})
				}
      },
      removeFavorite: (index) => {
				const store = getStore();
				setStore({favorites: [
					...store.favorites.slice(0, index),
					...store.favorites.slice(index + 1, store.favorites.length)
					]})
      }
      // removeFavorite:(chrName)=>{
      //   let fav = [...getStore().favorites];
      //   fav.every((elem,index)=>{
      //     if(elem.name===chrName){
      //       fav.splice(index, 1)
      //       return false;
      //     }
      //   })
      // },
      // addFavorite: (type, chrName, id) => {
      //   let fav = [...getStore().favorites];
      //   if(fav.length===0)fav.push({"name":chrName, "type": type, "id": id })
      //   else{
      //     fav.every((elem,index)=>{
      //       if(elem.name===chrName){
      //         fav.splice(index, 1)
      //         return false;
      //       }else{
      //         fav.push({"name":chrName, "type": type, "id": id })
      //         return false;
      //       }
      //     })
      //   }
        
      //   setStore({"favorites":fav});
      // }
    },
  };
};

export default getState;
