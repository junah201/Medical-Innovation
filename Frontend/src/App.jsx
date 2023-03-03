import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import SignupPage from "./pages/auth/SignupPage";
import MyPage from "./pages/auth/MyPage";

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

import RegistrationPage from "./pages/event/RegistrationPage";

import PostsPage from "./pages/admin/PostsPage";
import PostUploadPage from "./pages/admin/PostUploadPage";
import PostEditPage from "./pages/admin/PostEditPage";
import PostDeletePage from "./pages/admin/PostDeletePage";
import UsersPage from "./pages/admin/UsersPage";
import BannerUploadPage from "./pages/admin/BannerUploadPage";
import BannersPage from "./pages/admin/BannersPage";
import BannerDeletePage from "./pages/admin/BannerDeletePage";
import BannerEditPage from "./pages/admin/BannerEditPage";
import SponsoringCompaniesPage from "./pages/admin/SponsoringCompaniesPage";
import SponsoringCompanyUploadPage from "./pages/admin/SponsoringCompanyUploadPage";
import SponsoringCompanyDeletePage from "./pages/admin/SponsoringCompanyDeletePage";
import SponsoringCompanyEditPage from "./pages/admin/SponsoringCompanyEditPage";
import SponsorsPage from "./pages/admin/SponsorsPage";
import MousPage from "./pages/admin/MousPage";
import MouDeletePage from "./pages/admin/MouDeletePage";
import MouUploadPage from "./pages/admin/MouUploadPage";
import MouEditPage from "./pages/admin/MouEditPage";
import AdvisorsPage from "./pages/admin/AdvisorsPage";
import AdvisorDeletePage from "./pages/admin/AdvisorDeletePage";
import AdvisorUploadPage from "./pages/admin/AdvisorUploadPage";
import AdvisorEditPage from "./pages/admin/AdvisorEditPage";
import PublicEventsPage from "./pages/admin/PublicEventsPage";
import PublicEventDetailPage from "./pages/admin/PublicEventDetailPage";
import PublicEventCreatePage from "./pages/admin/PublicEventCreatePage";
import ParticipantsPage from "./pages/admin/ParticipantsPage";
import AdEmailAllPage from "./pages/admin/AdEmailAllPage";
import AdEmailSendAll from "./pages/admin/AdEmailSendAll";
import HistoryAllPage from "./pages/admin/HistoryAllPage";
import HistoryCreatePage from "./pages/admin/HistoryCreatePage";
import HistoryDeletePage from "./pages/admin/HistoryDeletePage";
import HistoryEditPage from "./pages/admin/HistoryEditPage";
import SupportingStartupAllPage from "./pages/admin/SupportingStartupAllPage";
import SupportingStartupCreatePage from "./pages/admin/SupportingStartupCreatePage";
import SupportingStartupEditPage from "./pages/admin/SupportingStartupEditPage";
import SupportingStartupDeletePage from "./pages/admin/SupportingStartupDeletePage";

import MouPage from "./pages/MouPage";
import AdvisoryGroupPage from "./pages/AdvisoryGroupPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} noindex={false} />
			<Route path="/login" element={<LoginPage />} noindex={false} />
			<Route path="/logout" element={<LogoutPage />} />
			<Route path="/signup" element={<SignupPage />} noindex={false} />
			<Route path="/me" element={<MyPage />} noindex={true} />
			<Route
				path="/privacy-policy"
				element={<PrivacyPolicyPage />}
				noindex={false}
			/>
			<Route path="/mou" element={<MouPage />} noindex={false} />
			<Route
				path="/advisory_group"
				element={<AdvisoryGroupPage />}
				noindex={false}
			/>
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
			<Route path="/event/:id">
				<Route
					path="registration"
					element={<RegistrationPage />}
					noindex={false}
				/>
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
				<Route path="" element={<UsersPage />} />
				<Route path="post">
					<Route path="all" element={<PostsPage />} />
					<Route path="upload" element={<PostUploadPage />} />
					<Route path="edit/:id" element={<PostEditPage />} />
					<Route path="delete/:id" element={<PostDeletePage />} />
				</Route>
				<Route path="banner">
					<Route path="all" element={<BannersPage />} />
					<Route path="upload" element={<BannerUploadPage />} />
					<Route path="edit/:id" element={<BannerEditPage />} />
					<Route path="delete/:id" element={<BannerDeletePage />} />
				</Route>
				<Route path="sponsoring_company">
					<Route path="all" element={<SponsoringCompaniesPage />} />
					<Route path="upload" element={<SponsoringCompanyUploadPage />} />
					<Route path="edit/:id" element={<SponsoringCompanyEditPage />} />
					<Route path="delete/:id" element={<SponsoringCompanyDeletePage />} />
				</Route>
				<Route path="sponsoring">
					<Route path="all" element={<SponsorsPage />} />
				</Route>
				<Route path="mou">
					<Route path="all" element={<MousPage />} />
					<Route path="upload" element={<MouUploadPage />} />
					<Route path="edit/:id" element={<MouEditPage />} />
					<Route path="delete/:id" element={<MouDeletePage />} />
				</Route>
				<Route path="advisor">
					<Route path="all" element={<AdvisorsPage />} />
					<Route path="upload" element={<AdvisorUploadPage />} />
					<Route path="edit/:id" element={<AdvisorEditPage />} />
					<Route path="delete/:id" element={<AdvisorDeletePage />} />
				</Route>
				<Route path="public_event">
					<Route path="all" element={<PublicEventsPage />} />
					<Route path="create" element={<PublicEventCreatePage />} />
					<Route path="detail/:id" element={<PublicEventDetailPage />} />
					<Route path="edit/:id" element={<AdvisorEditPage />} />
					<Route path="delete/:id" element={<AdvisorDeletePage />} />
				</Route>
				<Route path="participant">
					<Route path="all" element={<ParticipantsPage />} />
				</Route>
				<Route path="ad_email">
					<Route path="all" element={<AdEmailAllPage />} />
					<Route path="send/all" element={<AdEmailSendAll />} />
				</Route>
				<Route path="history">
					<Route path="all" element={<HistoryAllPage />} />
					<Route path="create" element={<HistoryCreatePage />} />
					<Route path="edit/:id" element={<HistoryEditPage />} />
					<Route path="delete/:id" element={<HistoryDeletePage />} />
				</Route>
				<Route path="supporting_startup">
					<Route path="all" element={<SupportingStartupAllPage />} />
					<Route path="create" element={<SupportingStartupCreatePage />} />
					<Route path="edit/:id" element={<SupportingStartupEditPage />} />
					<Route path="delete/:id" element={<SupportingStartupDeletePage />} />
				</Route>
				<Route path="uesrs" element={<UsersPage />} />
			</Route>
			<Route path="/post/:id" element={<PostPage />} noindex={false} />
			<Route path="/404" element={<NotFoundPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
