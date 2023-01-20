import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/base/Header";
import Footer from "./components/base/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignupPage from "./pages/SignupPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

import NotFoundPage from "./pages/error/NotFoundPage";

import FounderPage from "./pages/introduction/FounderPage";
import ChairmanMessagePage from "./pages/introduction/ChairmanMessagePage";
import MissionAndHistoryPage from "./pages/introduction/MissionAndHistoryPage";
import OrgchartAndProjectPage from "./pages/introduction/OrgchartAndProjectPage";

import SponsorshipPage from "./pages/support/SponsorshipPage";
import BenefitsPage from "./pages/support/BenefitsPage";
import SponsorPage from "./pages/support/SponsorPage";
import HistoryPage from "./pages/support/HistoryPage";

import OpenInnovationPage from "./pages/programs/OpenInnovationPage";
import AcceleratingPage from "./pages/programs/AcceleratingPage";
import ResearchSupportProjectPage from "./pages/programs/ResearchSupportProjectPage";

import AnnouncementPage from "./pages/news/AnnouncementPage";
import PressReleasePage from "./pages/news/PressReleasePage";

import PostPage from "./pages/PostPage";

import PostUploadPage from "./pages/admin/PostUploadPage";

import MouPage from "./pages/MouPage";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
				<Route path="/mou" element={<MouPage />} />
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
					<Route path="sponsorship" element={<SponsorshipPage />} />
					<Route path="benefits" element={<BenefitsPage />} />
					<Route path="sponsor" element={<SponsorPage />} />
					<Route path="history" element={<HistoryPage />} />
				</Route>
				<Route path="/programs">
					<Route path="openinnovation" element={<OpenInnovationPage />} />
					<Route path="accelerating" element={<AcceleratingPage />} />
					<Route
						path="research_support_project"
						element={<ResearchSupportProjectPage />}
					/>
				</Route>
				<Route path="/news">
					<Route path="announcement" element={<AnnouncementPage />} />
					<Route path="press_release" element={<PressReleasePage />} />
				</Route>
				<Route path="/admin">
					<Route path="post_upload" element={<PostUploadPage />} />
				</Route>
				<Route path="/post/:id" element={<PostPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
