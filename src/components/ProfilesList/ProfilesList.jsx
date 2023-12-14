import React, { useCallback, useEffect, useState } from "react";
import Card from "../Card";
import Button from "../Button";
import Loader from "../Loader";
import Service from "../../services";
import { useSuccesfulRegListener } from "../../events";


const ProfilesList = () => {

	const count = 6;
	const [ profiles, setProfiles ] = useState([]);
	const [ nextPageLink, setNextPageLink ] = useState(null); /*  indicates if there are more profiles to show to display button */
	const [ isLoading, setIsLoading ] = useState(false);
	// const [error, setError] = useState(null);

	useEffect(()=> {
		fetchProfiles(0, count);
	},[]);

	useSuccesfulRegListener(()=> {
		fetchProfiles(0, count);
	});
    
	const fetchProfiles = useCallback( async (offset,count) => {
		setIsLoading(true);
		// setError(null);
		
		try {

			const res = await Service.getProfiles(offset, count);

			if(offset === 0) setProfiles(res.data.users);
			else setProfiles([...profiles, ...res.data.users]);
		
			setNextPageLink(res.data.links.next_url);

		} catch(e) {

			const errorMessage = e instanceof Error ? e.message : "Unknown Error";
			console.log(errorMessage);
			// setError(errorMessage);

		} finally {

			setIsLoading(false);

		}
	});

	return (
		<div className="profiles-container container">
			<h2 className="heading">Working with GET request</h2>
			<div className="profiles-container__profiles-list" >
				{profiles.map((profile, id) => <Card {...profile} key={"profile_" + id}/>)}
			</div>
			{isLoading 
				? <Loader/>
				: nextPageLink && <Button name="Show more" onClick={() => fetchProfiles(profiles.length,count) }/> /*  hide button if last page is reached  */}
		</div>
	);
};

export default ProfilesList;