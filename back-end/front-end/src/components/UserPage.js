import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import img from "../imgs/exercise.png";
import img2 from "../imgs/timer.png";
import img3 from "../imgs/date.png";
import img4 from "../imgs/trash.png";

function UserPage() {
	// Variables
	const user = useHistory().location.state;
	const pageWidth = window.innerWidth;

	// useState hooks for setting user data
	const [userData, setUserData] = useState([]);
	const [exercise, setExercise] = useState({
		name: user,
		description: "",
		duration: "",
		date: "",
	});

	// useState hook for proper styling
	const [style, setStyle] = useState({
		del: { display: "none" },
		table: { padding: "13px" },
		tabPos: { left: "25vw" },
		modal: { display: "none" },
		effect: "",
	});

	// useEffect for setting user data and adjusting styling
	useEffect(() => {
		if (pageWidth === 768) {
			axios
				.get("http://localhost:5000/exercise/" + user)
				.then((res) => {
					setStyle({
						del: { display: "none" },
						table: { padding: "13px" },
						tabPos: { left: "25vw" },
						modal: { display: "none" },
						effect: "",
					});
					setUserData([...res.data]);
				})
				.catch((err) => console.log(err));
		} else if (pageWidth <= 490 && pageWidth >= 390) {
			axios
				.get("http://localhost:5000/exercise/" + user)
				.then((res) => {
					setStyle({
						del: { display: "none" },
						table: { padding: "13px" },
						tabPos: { left: "15vw" },
						modal: { display: "none" },
						effect: "",
					});
					setUserData([...res.data]);
				})
				.catch((err) => console.log(err));
		} else if (pageWidth <= 380) {
			axios
				.get("http://localhost:5000/exercise/" + user)
				.then((res) => {
					setStyle({
						del: { display: "none" },
						table: { padding: "13px" },
						tabPos: { left: "10vw" },
						modal: { display: "none" },
						effect: "",
					});
					setUserData([...res.data]);
				})
				.catch((err) => console.log(err));
		} else {
			axios
				.get("http://localhost:5000/exercise/" + user)
				.then((res) => {
					console.log(res.data);
					setStyle({
						del: { display: "none" },
						table: { padding: "13px" },
						tabPos: { left: "" },
						modal: { display: "none" },
						effect: "",
					});
					setUserData([...res.data]);
				})
				.catch((err) => console.log(err));
		}

		// eslint-disable-next-line
	}, []);

	// useEffect hook for proper modal effect
	useEffect(() => {
		if (style.effect === "ld ld-blur-out")
			setTimeout(() => {
				setStyle({
					effect: style.effect,
					modal: { display: "none" },
					del: style.del,
					table: style.table,
					tabPos: style.tabPos,
				});
			}, 1000);
		// eslint-disable-next-line
	}, [style.effect]);

	// handler for opening modal
	const openModal = () => {
		setStyle({
			effect: "ld ld-blur-in",
			modal: { display: "initial" },
			del: style.del,
			table: style.table,
			tabPos: style.tabPos,
		});
	};

	// handler for user input
	const descriptionHandler = (e) => {
		setExercise({
			name: exercise.name,
			description: e.target.value,
			duration: exercise.duration,
			date: exercise.date,
		});
	};

	// handler for user input
	const dateHandler = (e) => {
		setExercise({
			name: exercise.name,
			description: exercise.description,
			duration: exercise.duration,
			date: e.target.value,
		});
	};

	// handler for user input
	const durationHandler = (e) => {
		setExercise({
			name: exercise.name,
			description: exercise.description,
			duration: e.target.value,
			date: exercise.date,
		});
	};
	// handler to save user input
	const saveHandler = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/exercise", {
				username: exercise.name,
				description: exercise.description,
				duration: exercise.duration,
				date: exercise.date,
			})
			.then((res) => {
				if (userData.length < 1) {
					setUserData([res.data]);
					closeModal();
				} else {
					setUserData([...userData, res.data]);
					closeModal();
				}
			})
			.catch((err) => console.log(err));
	};
	// handler to close modal
	const closeModal = () => {
		setStyle({
			effect: "ld ld-blur-out",
			del: style.del,
			table: style.table,
			tabPos: style.tabPos,
		});
		setExercise({
			name: exercise.name,
			description: "",
			duration: "",
			date: "",
		});
	};
	// handler for deleting user input
	const onDelete = (id, index) => {
		console.log(index);
		let newData = userData.filter((value, i) => i !== index);
		axios
			.delete("http://localhost:5000/exercise/" + id)
			.then((res) => {
				console.log("My");
				setUserData([...newData]);
			})
			.catch((err) => console.log("CCCC" + err));
	};
	// Date format function
	const dateFormatter = (s) => {
		let b = s.split("-");

		[b[1], b[2]] = [b[2], b[1]];
		return b.reverse().join("/");
	};
	// handler for styling user input after deletion
	const delHandler = () => {
		if (style.del.display === "none") {
			if (pageWidth <= 490 && pageWidth >= 401) {
				setStyle({
					modal: style.modal,
					del: { display: "table-cell" },
					table: { padding: "" },
					tabPos: { left: "10vw" },
				});
			} else if (pageWidth <= 400) {
				setStyle({
					modal: style.modal,
					del: { display: "table-cell" },
					table: { padding: "" },
					tabPos: { left: "2vw" },
				});
			} else {
				setStyle({
					modal: style.modal,
					del: { display: "table-cell" },
					table: { padding: "" },
					tabPos: { left: "" }, // not needed table centers fine
				});
			}
		} else if (style.del.display !== "none") {
			if (pageWidth <= 490 && pageWidth >= 390) {
				setStyle({
					modal: style.modal,
					del: { display: "none" },
					table: { padding: "" },
					tabPos: { left: "15vw" },
				});
			} else if (pageWidth <= 380) {
				setStyle({
					modal: style.modal,
					del: { display: "none" },
					table: { padding: "" },
					tabPos: { left: "10vw" },
				});
			} else {
				setStyle({
					modal: style.modal,
					del: { display: "none" },
					tabPos: { left: "" },
					table: { padding: "13px" },
				});
			}
		}
	};

	// User Page Component
	return (
		<>
			<Navbar />
			<div className="main">
				<h1>Hi, {exercise.name || "Noraly"}!</h1>
				<div id="add">
					<button id="x" onClick={openModal}>
						Add
					</button>
					<button onClick={delHandler}>Delete</button>
				</div>

				<div className={style.effect} style={style.modal} id="modal">
					<div id="modal-content">
						<label>Exercise:</label>
						<input
							value={exercise.description}
							onChange={descriptionHandler}
							type="text"
							name="exercise"
						/>
						<br />
						<label>Duration(mins):</label>
						<input
							value={exercise.duration}
							onChange={durationHandler}
							type="number"
							name="duration"
						/>
						<br />
						<label>Date:</label>
						<input
							value={exercise.date}
							onChange={dateHandler}
							type="date"
							name="date"
						/>
						<br />
						<button onClick={saveHandler} type="submit">
							Save
						</button>

						<button onClick={closeModal} type="button">
							Cancel
						</button>
					</div>
				</div>

				<table style={style.tabPos}>
					<thead>
						<tr>
							<th>
								Exercise
								<img className="ld ld-breath" alt="exercise" src={img} />
							</th>
							<th>
								Duration
								<img className="" alt="timer" src={img2} />
							</th>
							<th id="date">
								Date <img className="" alt="calendar" src={img3} />
							</th>
							<th style={style.del}>
								Delete <img className="ld ld-measure" alt="trash" src={img4} />
							</th>
						</tr>
					</thead>

					<tbody>
						{userData.length < 1 ? (
							<tr>
								<td style={style.table}>
									{exercise.description || "Add exercise info"}
								</td>
								<td style={style.table}>{exercise.duration || "..."}</td>
								<td style={style.table}>
									{exercise.date
										? dateFormatter(exercise.date.substring(0, 10))
										: "..."}
								</td>
								<td style={style.del}>
									<button
										onClick={() =>
											setExercise({ duration: "", description: "", date: "" })
										}
										id="delBtn"
									>
										Delete
									</button>
								</td>
							</tr>
						) : (
							userData.map((ex, i) => (
								<tr key={ex.description + i}>
									<td style={style.table}>{ex.description}</td>
									<td style={style.table}>{ex.duration}</td>
									<td style={style.table}>
										{dateFormatter(ex.date.substring(0, 10))}
									</td>
									<td style={style.del}>
										<button onClick={() => onDelete(ex._id, i)} id="delBtn">
											Delete
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default UserPage;
