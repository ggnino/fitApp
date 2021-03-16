import React, { useState, useEffect } from "react";

function Navbar(props) {
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
			const { prop } = props;
			const { openModal, delHandler, display } = prop;
			setStyle({
				login: { display: "none" },
				hide: { display: "" },
				nav: { zIndex: 0 },
				navBrand: { cursor: "default" },
				href: "#",
				open: openModal,
				del: delHandler,
				info: display,
			});
		} else {
			setStyle({
				login: { display: "none" },
				hide: { display: "" },
				href: "/",
			});
		}
	}, [path, props]);

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
			<div id="add">
				<button style={style.hide} onClick={style.open}>
					Add
				</button>
				<button style={style.hide} onClick={() => style.del(style.info)}>
					Delete
				</button>
			</div>
		</div>
	);
}

export default Navbar;
