const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				

					const myToken = localStorage.getItem(' jwt-token')

					fetch(process.env.BACKEND_URL + "/api/hello", {
						method: 'GET',
						headers: {
							'Authorization': 'Bearer' + myToken,
							"Content-Type": "application/json"
						}
					}).then((res) => res.json())
					.then((data) => { 
						setStore({message: data.message})
					}).catch((error) => {
						console.log("Error loading message from backend", error)
					})
				
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
