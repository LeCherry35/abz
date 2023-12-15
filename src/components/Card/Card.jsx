import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Tooltip from "../Tooltip";
import Avatar from "../Avatar";

const Card = ({ name, email, photo, position, phone }) => {	

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
			<Avatar photoUrl={photo} />
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