import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/base/Header";
import Footer from "./components/base/Footer";

import HomePage from "./pages/HomePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

import FounderPage from "./pages/introduction/FounderPage";
import ChairmanMessagePage from "./pages/introduction/ChairmanMessagePage";
import MissionAndHistoryPage from "./pages/introduction/MissionAndHistoryPage";
import OrgchartAndProjectPage from "./pages/introduction/OrgchartAndProjectPage";

import SponsorshipPage from "./pages/support/SponsorshipPage";
import BenefitsPage from "./pages/support/BenefitsPage";
import SponsorPage from "./pages/support/SponsorPage";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
				<Route path="/introduction">
					<Route path="founder" element={<FounderPage />}></Route>
					<Route path="message" element={<ChairmanMessagePage />}></Route>
					<Route
						path="mission_and_history"
						element={<MissionAndHistoryPage />}
					></Route>
					<Route
						path="orgchart_and_project"
						element={<OrgchartAndProjectPage />}
					></Route>
				</Route>
				<Route path="/support">
					<Route path="sponsorship" element={<SponsorshipPage />}></Route>
					<Route path="benefits" element={<BenefitsPage />}></Route>
					<Route path="sponsor" element={<SponsorPage />}></Route>
				</Route>
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
