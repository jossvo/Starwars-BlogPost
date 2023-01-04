const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
		},
		actions: {
			getList: async (element)=>{
				let response = await fetch(`https://www.swapi.tech/api/${element}`)
				if(!response.ok)console.error(`Error en la petición ${response.statusText}`)
				else{
					let data=await response.json();
					let newStore={};
					newStore[element]= data.response|| data.results
					setStore(newStore)
				}
			},
			getDetail: async (element,id)=>{
				let response = await fetch(`https://www.swapi.tech/api/${element}/${id}`)
				console.log(response)
				if(!response.ok)console.error(`Error en la petición ${response.statusText}`)
				else{
					let data = await response.json()
					return data.result || data.results
				}
			}
		}
	};
};

export default getState;
