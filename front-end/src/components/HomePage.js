import React, { useState, useEffect } from "react";
import bgImg from "../imgs/bgImg.jpg";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";

function HomePage() {
	// useState hook for styling
	const [style, setStyle] = useState({});
	const path = window.location.pathname;
	const history = useHistory();

	// useEffect hook for styling
	useEffect(() => {
		if (path === "/") {
			setStyle({
				background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImg}) center/cover no-repeat`,
				marginTop: 0,
				bottom: "0",
				height: "100vh",
				width: "100%",
				position: "absolute",
				padding: 0,
			});
		}
	}, [path]);

	const redirect = () => history.push("/register");

	return (
		<>
			<Navbar />
			<div style={style} className="main">
				<div id="greeting">
					<h1>Welcome!</h1>
					<p>Click start to register or login</p>
				</div>

				<button href="/register" className="btn" onClick={redirect}>
					Start
				</button>
			</div>
		</>
	);
}

export default HomePage;
