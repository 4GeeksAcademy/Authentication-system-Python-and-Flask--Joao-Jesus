import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const [msg, setMsg] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		const myToken = localStorage.getItem(' jwt-token')
		
		if (myToken) {
			fetch(process.env.BACKEND_URL + "/api/hello", {
						method: 'GET',
						headers: {
							'Authorization': 'Bearer' + myToken,
							"Content-Type": "application/json"
						}
					}).then((res) => res.json())
					.then((data) => { 
						setMsg(data.message)
					}).catch((error) => {
						console.log("Error loading message from backend", error)
					})
		}else {
			navigate('/login')
		}

					
	})

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{msg || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
