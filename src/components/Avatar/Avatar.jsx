import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import defaultAvatar from "../../img/photo-cover.svg";


const Avatar = ({photoUrl}) => {

	Avatar.propTypes = {
		photoUrl: PropTypes.string
	};

	const [isImageLoaded, setIsImageLoaded] = useState(false);
	
	/*  check if photo is loaded  */
	useEffect(() => {
		const getImage = photo => new Promise(resolve=> {
			const img = new Image();
			img.onload = () => {
				resolve();
			};
			img.src = photo;
		});
		getImage(photoUrl).then(() => {
			setIsImageLoaded(true);
		});
	},[]);
	return (
		<div className="avatar-container">
			<img className="avatar-container__image" src={isImageLoaded ? photoUrl : defaultAvatar} alt="avatar"/>
		</div>
	);
};

export default Avatar;