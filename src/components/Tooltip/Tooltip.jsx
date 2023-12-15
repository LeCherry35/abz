import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Tooltip = ({text, x = 0, y = 0, visible = false}) => {

	Tooltip.propTypes = {
		text: PropTypes.string,
		x: PropTypes.number,
		y: PropTypes.number,
		visible: PropTypes.bool
	};

	const tooltip = useRef(null);
    
	useEffect(() => {
		if (visible) tooltip.current.style.display = "block";
		else tooltip.current.style.display = "none";
		tooltip.current.innerText = text;
		tooltip.current.style.top = String(y + 10) + "px";
		tooltip.current.style.left = String(x + 10) + "px";
	});

	return (
		<div className="tooltip" ref={tooltip}></div>
	);
};

export default Tooltip;