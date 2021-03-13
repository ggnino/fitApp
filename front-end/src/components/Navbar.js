import React, { useState, useEffect } from "react";

function Navbar() {
	// Variable
	const path = window.location.pathname;

	// useState hook for navbar styling
	const [style, setStyle] = useState({});

	// useEffect hook for proper navbar render
	useEffect(() => {
		if (path === "/") {
			setStyle({
				login: { display: "" },
				hide: { display: "none" },
				nav: { backgroundColor: "transparent", position: "relative" },
				navBrand: { cursor: "default" },
				href: "#",
			});
		} else if (path === "/register" || path === "/login") {
			setStyle({
				login: { display: "none" },
				hide: { display: "none" },
				href: "/",
			});
		} else if (path === "/user") {
			setStyle({
				login: { display: "none" },
				hide: { display: "" },
				nav: { zIndex: 0 },
				navBrand: { cursor: "default" },
				href: "#",
			});
		} else {
			setStyle({
				login: { display: "none" },
				hide: { display: "" },
				href: "/",
			});
		}
	}, [path]);

	// Navbar Component
	return (
		<div style={style.nav} className="navbar">
			<div className="navBrand">
				<a style={style.navBrand} href={style.href}>
					FitTrack
				</a>
			</div>
			<a style={style.login} className="nav-item" href="/login">
				Login
			</a>
			<a style={style.hide} className="nav-item" href="/">
				Log Out
			</a>
		</div>
	);
}

export default Navbar;
