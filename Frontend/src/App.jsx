import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignupPage from "./pages/SignupPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

import NotFoundPage from "./pages/error/NotFoundPage";
import PreparingPage from "./pages/error/PreparingPage";

import FounderPage from "./pages/introduction/FounderPage";
import ChairmanMessagePage from "./pages/introduction/ChairmanMessagePage";
import MissionAndHistoryPage from "./pages/introduction/MissionAndHistoryPage";
import OrgchartAndProjectPage from "./pages/introduction/OrgchartAndProjectPage";

import SponsorshipPage from "./pages/support/SponsorshipPage";
import BenefitsPage from "./pages/support/BenefitsPage";
import SponsorPage from "./pages/support/SponsorPage";
import HistoryPage from "./pages/support/HistoryPage";
import SponsorshipFormPage from "./pages/support/SponsorshipFormPage";

import OpenInnovationPage from "./pages/programs/OpenInnovationPage";
import AcceleratingPage from "./pages/programs/AcceleratingPage";
import ResearchSupportProjectPage from "./pages/programs/ResearchSupportProjectPage";
import TrandPage from "./pages/programs/TrendPage";

import AnnouncementPage from "./pages/news/AnnouncementPage";
import PressReleasePage from "./pages/news/PressReleasePage";
import ColumnPage from "./pages/news/ColumnPage";
import PhotoPage from "./pages/news/PhotoPage";

import PostPage from "./pages/PostPage";

import PostUploadPage from "./pages/admin/PostUploadPage";
import Users from "./pages/admin/Users";
import Posts from "./pages/admin/Posts";

import MouPage from "./pages/MouPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} noindex={false} />
			<Route path="/login" element={<LoginPage />} noindex={false} />
			<Route path="/logout" element={<LogoutPage />} />
			<Route path="/signup" element={<SignupPage />} noindex={false} />
			<Route
				path="/privacy-policy"
				element={<PrivacyPolicyPage />}
				noindex={false}
			/>
			<Route path="/mou" element={<MouPage />} noindex={false} />
			<Route path="/preparing" element={<PreparingPage />} />
			<Route path="/introduction" noindex={false}>
				<Route path="founder" element={<FounderPage />} noindex={false} />
				<Route
					path="message"
					element={<ChairmanMessagePage />}
					noindex={false}
				/>
				<Route
					path="mission_and_history"
					element={<MissionAndHistoryPage />}
					noindex={false}
				/>
				<Route
					path="orgchart_and_project"
					element={<OrgchartAndProjectPage />}
					noindex={false}
				/>
			</Route>
			<Route path="/support" noindex={false}>
				<Route
					path="sponsorship"
					element={<SponsorshipPage />}
					noindex={false}
				/>
				<Route path="benefits" element={<BenefitsPage />} noindex={false} />
				<Route path="sponsor" element={<SponsorPage />} noindex={false} />
				<Route path="history" element={<HistoryPage />} noindex={false} />
				<Route path="sponsorship_form" element={<SponsorshipFormPage />} />
			</Route>
			<Route path="/programs" noindex={false}>
				<Route
					path="openinnovation"
					element={<OpenInnovationPage />}
					noindex={false}
				/>
				<Route
					path="accelerating"
					element={<AcceleratingPage />}
					noindex={false}
				/>
				<Route
					path="research_support_project"
					element={<ResearchSupportProjectPage />}
					noindex={false}
				/>
				<Route path="trand" element={<TrandPage />} noindex={false} />
			</Route>
			<Route path="/news">
				<Route
					path="announcement"
					element={<AnnouncementPage />}
					noindex={false}
				/>
				<Route
					path="press_release"
					element={<PressReleasePage />}
					noindex={false}
				/>
				<Route path="column" element={<ColumnPage />} noindex={false} />
				<Route path="photo" element={<PhotoPage />} noindex={false} />
			</Route>
			<Route path="/admin">
				<Route path="" element={<PostUploadPage />} />
				<Route path="posts" element={<Posts />} />
				<Route path="post/edit/:id" element={<Users />} />
				<Route path="post_upload" element={<PostUploadPage />} />
				<Route path="uesrs" element={<Users />} />
			</Route>
			<Route path="/post/:id" element={<PostPage />} noindex={false} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
