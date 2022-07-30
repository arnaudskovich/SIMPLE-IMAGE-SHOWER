import React, { useCallback, useEffect, useState } from "react";
import ShowerButton from "./ShowerButton";
import "./Main.css";
import a from "../images/a.jpg";
import b from "../images/b.jpg";
import c from "../images/c.jpg";
import d from "../images/d.jpg";
import e from "../images/e.jpg";
import f from "../images/f.jpg";
import g from "../images/g.jpg";
import h from "../images/h.jpg";
import no_photo from "../images/no_photo.png";

export default function Main({ delay, images, preview }) {
	if (images.length === 0) {
		if (preview)
			images = [
				{ image: a, desc: "Description de la photo a" },
				{ image: b, desc: "Description de la photo b" },
				{ image: c, desc: "Description de la photo c" },
				{ image: d, desc: "Description de la photo d" },
				{ image: e, desc: "Description de la photo e" },
				{ image: f, desc: "Description de la photo f" },
				{ image: g, desc: "Description de la photo g" },
				{ image: h, desc: "Description de la photo h" },
			];
		else images = [{ image: no_photo, desc: "Preview mode is disabled and no photo was passed to the component" }];
	}
	const [active, setActive] = useState(0);
	const [hovered, setHovered] = useState(false);
	const matchActive = useCallback(
		(id, flow) => {
			id += flow;
			if (id >= images.length) id = 0;
			if (id < 0) id = images.length - 1;
			return id;
		},
		[images]
	);
	useEffect(() => {
		if (!hovered) {
			const interval = setInterval(() => setActive(matchActive(active, 1)), delay);
			return () => clearInterval(interval);
		}
	}, [active, delay, hovered, matchActive]);
	//const getPrev = (active) => (active - 1 >= 0 ? active - 1 : images.length - 1);
	//const getNext = (active) => (active + 1 < images.length ? active + 1 : 0);
	return (
		<div className="showerMain" style={{ backgroundImage: `url(${images[active].image})` }}>
			<div className="showerMainFlou">
				<div className="slide-container">
					<div className="control left">
						<button className="btn" onClick={() => setActive(matchActive(active, -1))}>
							&laquo;
						</button>
					</div>
					<div className="image-container">
						<div className="prev" /*style={{ backgroundImage: `url(${images[getPrev(active)]})` }}*/></div>
						<div
							className={"current" + (images[active].image === no_photo ? " no-photo" : "")}
							onMouseEnter={() => setHovered(true)}
							onMouseLeave={() => setHovered(false)}
							style={{ backgroundImage: `url(${images[active].image})` }}
						>
							<div className="message">
								<p>{images[active].desc}</p>
							</div>
						</div>
						<div className="next" /*style={{ backgroundImage: `url(${images[getNext(active)]})` }}*/></div>
					</div>
					<div className="control right">
						<button className="btn" onClick={() => setActive(matchActive(active, 1))}>
							&raquo;
						</button>
					</div>
				</div>
				<div className="slide-cursor-container">
					{images.map((image, index) => (
						<ShowerButton index={index} active={active} setActive={setActive} key={index} />
					))}
				</div>
			</div>
		</div>
	);
}
