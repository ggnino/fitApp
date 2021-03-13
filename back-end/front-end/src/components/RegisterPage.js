import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
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
	});
	// useHistory hook for navigation
	const history = useHistory();

	// submit handler
	const submitter = (e) => {
		e.preventDefault();

		// checking input, adjust styling if theres errors
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
			});
		} else {
			axios
				.post("/register", input)
				.then((res) => {
					if (res.data === "User Already Exists") {
						setStyle({
							input: { border: "2px solid red", boxShadow: "0px 2px 25px red" },
							msg: {
								display: "initial",
								color: "red",
								fontSize: "1rem",
								padding: 0,
							},
							input2: style.input2,
							msg2: style.msg2,
							err: "User Already Exists",
							err2: "",
						});
					} else if (
						res.data === "Password length must be greater than 3 chars."
					) {
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
								display: "initial",
								color: "red",
								fontSize: "1rem",
								padding: 0,
							},
							err: "",
							err2: "Password length must be greater than 3 characters.",
						});
					} else {
						setStyle({
							input: { border: "", boxShadow: "" },
							msg: {
								display: "none",
							},
							input2: { border: "", boxShadow: "" },
							msg2: {
								display: "none",
							},
						});
						setTimeout(() => history.push("/login"), 500);
					}
				})
				.catch((err) => console.log("Error: " + err));
		}
	};
	// Register Page Component
	return (
		<>
			<Navbar />
			<div className="main">
				<h1>Register Page</h1>
				<form onSubmit={submitter}>
					<label>Username:</label>
					<label style={style.msg}>{style.err}</label>
					<input
						style={style.input}
						onChange={(e) =>
							setInput({
								username: e.target.value,
								password: input.password,
							})
						}
						type="text"
						name="username"
					/>
					<label>Password:</label>
					<label style={style.msg2}>{style.err2}</label>
					<input
						style={style.input2}
						onChange={(e) =>
							setInput({
								username: input.username,
								password: e.target.value,
							})
						}
						type="password"
						name="password"
					/>
					<button id="regBtn" type="submit" name="register">
						Register
					</button>
				</form>
			</div>
		</>
	);
}

export default RegisterPage;
