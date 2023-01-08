import React from "react";
import { Route, Routes, Switch, Redirect } from "react-router-dom";

import Header from "./components/base/Header";
import Footer from "./components/base/Footer";

import HomePage from "./pages/HomePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
