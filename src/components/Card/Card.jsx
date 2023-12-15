import React, { useCallback, useEffect, useState } from "react";
import defaultAvatar from "../../img/photo-cover.svg";
import PropTypes from "prop-types";
import Tooltip from "../Tooltip";

const Card = ({ name, email, photo, position, phone }) => {

	const [isImageLoaded, setIsImageLoaded] = useState(false);
	/*  check if photo is loaded  */
	useEffect(() => {
		const getImage = photo => new Promise(resolve=> {
			const img = new Image();
			img.onload = () => {
				resolve("ok");
			};
			img.src = photo;
		});
		getImage(photo).then(res => {
			if(res ==="ok")setIsImageLoaded(true);
		});
	},[]);

	

	Card.propTypes = {
		name: PropTypes.string,
		email: PropTypes.string,
		photo: PropTypes.string,
		position: PropTypes.string,
		phone: PropTypes.string,
	};

	const [tooltipData, setTooltipData] = useState({text: "", x:0, y:0, visible: false});

	const showTooltip = useCallback((e, text) => {
		const y = e.clientY;
		const x = e.clientX;
		setTooltipData({x, y, visible: true, text});
	});

	const hideTooltip = useCallback(() => {
		setTooltipData({text: "", x:0, y:0, visible: false});
	});

	return (
		<div className="card-container">
			<Tooltip {...tooltipData}/>
			<div className="card-container__avatar">
				<img src={isImageLoaded ? photo : defaultAvatar} alt="avatar"/>
			</div>
			<p className="text truncatedText" onMouseEnter={e => showTooltip(e,name)} onMouseLeave={()=> hideTooltip()}>{name}</p>
			<div className="card-container__info">
				<p className="text truncatedText">{position}</p>
				<p className="text truncatedText" onMouseEnter={e => showTooltip(e, email)} onMouseLeave={()=> hideTooltip()}>{email}</p>
				<p className="text truncatedText">{phone}</p>
			</div>
		</div>
	);
};

export default Card;