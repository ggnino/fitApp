import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";
import axios from "axios";

function LoginPage() {
	// useState hooks for user input and styling
	const [input, setInput] = useState({ username: "", password: "" });
	const [style, setStyle] = useState({
		input: { border: "", boxShadow: "" },
		msg: {
			display: "none",
		},
		input2: { border: "", boxShadow: "" },
		msg2: {
			display: "none",
		},
		err: "",
		err2: "",
		err3: {
			display: "none",
		},
	});

	// useHistory hook for navigation
	const history = useHistory();

	// submit handler
	const submitter = (e) => {
		e.preventDefault();

		// adjust styling if theres any error in user input
		if (input.username.length === 0 && input.password.length === 0) {
			setStyle({
				input: { border: "2px solid red", boxShadow: "0px 2px 25px red" },
				msg: {
					display: "inline",
					color: "red",
					fontSize: "1rem",
					padding: 0,
				},
				input2: { border: "2px solid red", boxShadow: "0px 2px 25px red" },
				msg2: {
					display: "inline",
					color: "red",
					fontSize: "1rem",
					padding: 0,
				},
				err: "Please enter username.",
				err2: "Please enter password.",
				err3: {
					display: "none",
				},
			});
		} else if (input.username.length === 0) {
			setStyle({
				input: { border: "2px solid red", boxShadow: "0px 2px 25px red" },
				msg: {
					display: "inline",
					color: "red",
					fontSize: "1rem",
					padding: 0,
				},
				input2: style.input2,
				msg2: style.msg2,
				err: "Please enter username.",
				err2: style.err2,
				err3: {
					display: "none",
				},
			});
		} else {
			axios
				.post("/login", input)
				.then((res) => {
					if (res.data === "Successfully Authenticated!") {
						setStyle({
							input: { border: "", boxShadow: "" },
							msg: {
								display: "none",
							},
							input2: { border: "", boxShadow: "" },
							msg2: {
								display: "none",
							},
							err: "",
							err2: "",
							err3: {
								display: "none",
							},
						});
						setTimeout(() => history.push("/user", input.username), 500);
					} else if (res.data === "Incorrect password") {
						setStyle({
							input: { border: "", boxShadow: "" },
							msg: {
								display: "none",
							},
							input2: { border: "", boxShadow: "" },
							msg2: {
								display: "none",
							},
							err: "",
							err2: "",
							err3: {
								display: "initial",
								color: "red",
								marginLeft: "40vw",
							},
						});
					} else if (res.data === "Please enter password.") {
						setStyle({
							input: { border: "", boxShadow: "" },
							msg: {
								display: "none",
							},
							input2: {
								border: "2px solid red",
								boxShadow: "0px 2px 25px red",
							},
							msg2: {
								display: "inline",
								color: "red",
								fontSize: "1rem",
								padding: 0,
							},
							err: "",
							err2: "Please enter password.",
							err3: {
								display: "none",
							},
						});
					} else console.log("error");
				})
				.catch((err) => console.log(err));
		}
	};
	// Login Page Component
	return (
		<>
			<Navbar />
			<div className="main">
				<h1>Login Page</h1>
				<form onSubmit={submitter}>
					<h3 style={style.err3}>Incorrect Username and/or password.</h3>
					<label>Username:</label>
					<label style={style.msg}>{style.err}</label>
					<input
						style={style.input}
						type="text"
						name="username"
						onChange={(e) =>
							setInput({ username: e.target.value, password: input.password })
						}
					/>
					<label>Password:</label>
					<label style={style.msg2}>{style.err2}</label>
					<input
						style={style.input2}
						type="password"
						name="password"
						onChange={(e) =>
							setInput({ username: input.username, password: e.target.value })
						}
					/>
					<button id="regBtn" type="submit" name="register">
						Login
					</button>
				</form>
			</div>
		</>
	);
}

export default LoginPage;
