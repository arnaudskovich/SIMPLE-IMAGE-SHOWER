import React from "react";
import "./ShowerButton.css";

export default function ShowerButton({ index, active, setActive }) {
	return (
		<button className={"showerButton" + (active === index ? " active" : "")} onClick={() => setActive(index)}></button>
	);
}
