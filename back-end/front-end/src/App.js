import React from "react";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import UserPage from "./components/UserPage";
import RegisterPage from "./components/RegisterPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path="/register">
					<RegisterPage />
				</Route>
				<Route path="/user">
					<UserPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
