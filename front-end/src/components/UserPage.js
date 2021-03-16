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
		modal: { display: "none" },
		effect: "",
	});

	// useEffect for setting user data and adjusting styling
	useEffect(() => {
		axios
			.get("/exercise/" + user)
			.then((res) => {
				setStyle({
					del: { display: "none" },
					modal: { display: "none" },
					effect: "",
				});
				setUserData([...res.data]);
			})
			.catch((err) => console.log(err));

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
			.post("/exercise", {
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
			.delete("/exercise/" + id)
			.then((res) => {
				setUserData([...newData]);
			})
			.catch((err) => console.log("CCCC" + err));
	};
	// Date format function
	const dateFormatter = (string) => {
		let date = string.split("-");

		[date[1], date[2]] = [date[2], date[1]];
		return date.reverse().join("/");
	};
	// handler for styling user input after deletion
	const delHandler = (display) => {
		if (display === "none") {
			setStyle({
				modal: style.modal,
				del: { display: "table-cell" },
			});
		} else if (display !== "none") {
			setStyle({
				modal: style.modal,
				del: { display: "none" },
			});
		}
	};

	// User Page Component
	return (
		<>
			<Navbar prop={{ openModal, delHandler, display: style.del.display }} />
			<div className="main">
				<h1>Hi, {exercise.name || "Noraly"}!</h1>

				<div className={style.effect} style={style.modal} id="modal">
					<div id="modal-content">
						<label id="label1">Exercise:</label>
						<input
							value={exercise.description}
							onChange={descriptionHandler}
							type="text"
							name="exercise"
						/>

						<label id="label2">Duration(mins):</label>
						<input
							value={exercise.duration}
							onChange={durationHandler}
							type="number"
							name="duration"
						/>

						<label id="label3">Date:</label>
						<input
							value={exercise.date}
							onChange={dateHandler}
							type="date"
							name="date"
						/>
						<div id="modBtns">
							<button onClick={saveHandler} type="submit">
								Save
							</button>

							<button onClick={closeModal} type="button">
								Cancel
							</button>
						</div>
					</div>
				</div>

				<table>
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
							<th>
								Date <img className="" alt="calendar" src={img3} />
							</th>
							<th style={style.del}>
								Delete <img className="ld ld-measure" alt="trash" src={img4} />
							</th>
						</tr>
					</thead>

					<tbody>
						{userData.map((ex, i) => (
							<tr key={ex.description + i}>
								<td>{ex.description}</td>
								<td>{ex.duration}</td>
								<td>{dateFormatter(ex.date.substring(0, 10))}</td>
								<td style={style.del}>
									<button onClick={() => onDelete(ex._id, i)} id="delBtn">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default UserPage;
