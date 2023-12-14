import React from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner";
import ProfilesList from "./components/ProfilesList";
import RegistrationForm from "./components/ReigistrationForm";

function App() {
	
	return (
		<div className="App">
			<Header />
			<div className="App__content">
				<Banner />
				<ProfilesList />
				<RegistrationForm />
			</div>
		</div>
	);
}

export default App;