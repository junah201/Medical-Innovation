import { Route, Routes } from "react-router-dom";

import HomePage from "pages/HomePage";
import PrivacyPolicyPage from "pages/PrivacyPolicyPage";

import LoginPage from "pages/auth/LoginPage";
import LogoutPage from "pages/auth/LogoutPage";
import SignupPage from "pages/auth/SignupPage";
import MyPage from "pages/auth/MyPage";

import NotFoundPage from "pages/error/NotFoundPage";
import PreparingPage from "pages/error/PreparingPage";

import FounderPage from "pages/introduction/FounderPage";
import ChairmanMessagePage from "pages/introduction/ChairmanMessagePage";
import MissionAndHistoryPage from "pages/introduction/MissionAndHistoryPage";
import OrgchartAndProjectPage from "pages/introduction/OrgchartAndProjectPage";

import SponsorshipPage from "pages/support/SponsorshipPage";
import BenefitsPage from "pages/support/BenefitsPage";
import SponsorPage from "pages/support/SponsorPage";
import HistoryPage from "pages/support/HistoryPage";
import SponsorshipFormPage from "pages/support/SponsorshipFormPage";

import AcceleratingPage from "pages/programs/AcceleratingPage";
import ResearchSupportProjectPage from "pages/programs/ResearchSupportProjectPage";
import TrandPage from "pages/programs/TrendPage";

import AnnouncementPage from "pages/news/AnnouncementPage";
import PressReleasePage from "pages/news/PressReleasePage";
import ColumnPage from "pages/news/ColumnPage";
import PhotoPage from "pages/news/PhotoPage";

import PostPage from "pages/PostPage";

import RegistrationPage from "pages/private_event/RegistrationPage";

import PostsPage from "pages/admin/post/PostsPage";
import PostUploadPage from "pages/admin/post/PostUploadPage";
import PostEditPage from "pages/admin/post/PostEditPage";
import PostDeletePage from "pages/admin/post/PostDeletePage";
import UserAllPage from "pages/admin/user/UserAllPage";
import BannerUploadPage from "pages/admin/banner/BannerUploadPage";
import BannersPage from "pages/admin/banner/BannersPage";
import BannerDeletePage from "pages/admin/banner/BannerDeletePage";
import BannerEditPage from "pages/admin/banner/BannerEditPage";
import SponsoringCompaniesPage from "pages/admin/sponsoring_company/SponsoringCompaniesPage";
import SponsoringCompanyUploadPage from "pages/admin/sponsoring_company/SponsoringCompanyUploadPage";
import SponsoringCompanyDeletePage from "pages/admin/sponsoring_company/SponsoringCompanyDeletePage";
import SponsoringCompanyEditPage from "pages/admin/sponsoring_company/SponsoringCompanyEditPage";
import SponsorsPage from "pages/admin/SponsorsPage";
import MousPage from "pages/admin/mou/MousPage";
import MouDeletePage from "pages/admin/mou/MouDeletePage";
import MouUploadPage from "pages/admin/mou/MouUploadPage";
import MouEditPage from "pages/admin/mou/MouEditPage";
import AdvisorsPage from "pages/admin/advisor/AdvisorsPage";
import AdvisorDeletePage from "pages/admin/advisor/AdvisorDeletePage";
import AdvisorUploadPage from "pages/admin/advisor/AdvisorUploadPage";
import AdvisorEditPage from "pages/admin/advisor/AdvisorEditPage";
import PublicEventsPage from "pages/admin/public_event/PublicEventsPage";
import PublicEventDetailPage from "pages/admin/public_event/PublicEventDetailPage";
import PublicEventCreatePage from "pages/admin/public_event/PublicEventCreatePage";
import PublicEventEditPage from "pages/admin/public_event/PublicEventEditPage";
import ParticipantsPage from "pages/admin/ParticipantsPage";
import AdEmailAllPage from "pages/admin/ad_email/AdEmailAllPage";
import AdEmailSendAll from "pages/admin/ad_email/AdEmailSendAll";
import HistoryAllPage from "pages/admin/history/HistoryAllPage";
import HistoryCreatePage from "pages/admin/history/HistoryCreatePage";
import HistoryDeletePage from "pages/admin/history/HistoryDeletePage";
import HistoryEditPage from "pages/admin/history/HistoryEditPage";
import SupportingStartupAllPage from "pages/admin/supporting_startup/SupportingStartupAllPage";
import SupportingStartupCreatePage from "pages/admin/supporting_startup/SupportingStartupCreatePage";
import SupportingStartupEditPage from "pages/admin/supporting_startup/SupportingStartupEditPage";
import SupportingStartupDeletePage from "pages/admin/supporting_startup/SupportingStartupDeletePage";
import PrivateEventsPage from "pages/admin/private_event/PrivateEventsPage";
import PrivateEventCreatePage from "pages/admin/private_event/PrivateEventCreatePage";
import PrivateEventEditPage from "pages/admin/private_event/PrivateEventEditPage";
import PrivateEventPage from "pages/admin/private_event/PrivateEventPage";
import PrivateParticipantAllPage from "pages/admin/private_event/PrivateParticipantAllPage";
import PrivateParticipantDetailPage from "pages/admin/private_event/PrivateParticipantDetailPage";
import PopupAllPage from "pages/admin/popup/PopupAllPage";
import PopupCreatePage from "pages/admin/popup/PopupCreatePage";
import PopupEditPage from "pages/admin/popup/PopupEditPage";
import PopupDeletePage from "pages/admin/popup/PopupDeletePage";

import MouPage from "pages/MouPage";
import AdvisoryGroupPage from "pages/AdvisoryGroupPage";
import EventsPage from "pages/programs/event/EventsPage";
import EventDetailPage from "pages/programs/event/EventDetailPage";
import EventRegistrationPage from "pages/programs/event/EventRegistrationPage";
import AdminJudgingEventAllPage from "pages/admin/judging_event/JudgingEventAllPage";
import AdminJudgingEventCreatePage from "pages/admin/judging_event/JudgingEventCreatePage";
import JudgingEventEditPage from "pages/admin/judging_event/JudgingEventEditPage";
import AdminJudgingEventDetailPage from "pages/admin/judging_event/JudgingEventDetailPage";
import AdminJudgingParticipantAllPage from "pages/admin/judging_participant/JudgingParticipantAllPage";
import JudgingEventAllPage from "pages/judging/JudgingEventAllPage";
import JudgingParticipantAllPage from "./pages/judging/JudgingParticipantAllPage";
import JudgingResultCreatePage from "pages/judging/judgingResultCreatePage";
import JudgingRegistrationPage from "pages/judging/JudgingRegistrationPage";
import UserPermissionEditPage from "./pages/admin/user/UserPermissionEditPage";
import AdminJudgingParticipantDetailPage from "./pages/admin/judging_participant/JudgingParticipantDetailPage";
import JudgingResultAllPage from "pages/admin/judging_result/JudgingResultAllPage";
import AdEmailCreate from "pages/admin/ad_email/AdEmailCreate";
import AdEmailDeletePage from "pages/admin/ad_email/AdEmailDeletePage";
import JudgingResultDetailPage from "pages/admin/judging_result/JudgingResultDetailPage";
import JudgingEventDetailPage from "pages/judging/JudgingEventDetailPage";

export const Router = () => {
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
				<Route path="event">
					<Route path="" element={<EventsPage />} noindex={false} />
					<Route path="all" element={<EventsPage />} noindex={false} />
					<Route
						path=":id/detail"
						element={<EventDetailPage />}
						noindex={false}
					/>
					<Route
						path=":id/registration"
						element={<EventRegistrationPage />}
						noindex={false}
					/>
				</Route>
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
			<Route path="private_event/:id">
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
				<Route path="" element={<UserAllPage />} />
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
					<Route path="edit/:id" element={<PublicEventEditPage />} />
					<Route path="delete/:id" element={<AdvisorDeletePage />} />
				</Route>
				<Route path="participant">
					<Route path="all" element={<ParticipantsPage />} />
				</Route>
				<Route path="ad_email">
					<Route path="all" element={<AdEmailAllPage />} />
					<Route path="send/all" element={<AdEmailSendAll />} />
					<Route path="create" element={<AdEmailCreate />} />
					<Route path="delete/:id" element={<AdEmailDeletePage />} />
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
				<Route path="private_event">
					<Route path="all" element={<PrivateEventsPage />} />
					<Route path="create" element={<PrivateEventCreatePage />} />
					<Route path="edit/:id" element={<PrivateEventEditPage />} />
					<Route path="delete/:id" element={<PrivateEventPage />} />
				</Route>
				<Route path="private_participant">
					<Route path="all" element={<PrivateParticipantAllPage />} />
					<Route path="detail/:id" element={<PrivateParticipantDetailPage />} />
				</Route>
				<Route path="popup">
					<Route path="all" element={<PopupAllPage />} />
					<Route path="create" element={<PopupCreatePage />} />
					<Route path="edit/:id" element={<PopupEditPage />} />
					<Route path="delete/:id" element={<PopupDeletePage />} />
				</Route>
				<Route path="judging_event">
					<Route path="all" element={<AdminJudgingEventAllPage />} />
					<Route path="create" element={<AdminJudgingEventCreatePage />} />
					<Route path="edit/:id" element={<JudgingEventEditPage />} />
					<Route path="detail/:id" element={<AdminJudgingEventDetailPage />} />
					<Route path="delete/:id" element={<NotFoundPage />} />
				</Route>
				<Route path="judging_participant">
					<Route path="all" element={<AdminJudgingParticipantAllPage />} />
					<Route
						path="detail/:id"
						element={<AdminJudgingParticipantDetailPage />}
					/>
				</Route>
				<Route path="judging_result">
					<Route path="all" element={<JudgingResultAllPage />} />
					<Route path="detail/:id" element={<JudgingResultDetailPage />} />
				</Route>
				<Route path="user">
					<Route path="all" element={<UserAllPage />} />
					<Route
						path="permission/edit/:id"
						element={<UserPermissionEditPage />}
					/>
				</Route>
			</Route>
			<Route path="/post/:id" element={<PostPage />} noindex={false} />
			<Route path="/404" element={<NotFoundPage />} />
			<Route path="judging">
				<Route
					path="event/all"
					element={<JudgingEventAllPage />}
					noindex={false}
				/>
				<Route
					path="event/:event_id/detail"
					element={<JudgingEventDetailPage />}
					noindex={false}
				/>
				<Route
					path="event/:event_id/register"
					element={<JudgingRegistrationPage />}
					noindex={false}
				/>
				<Route
					path="result/:event_id/all"
					element={<JudgingParticipantAllPage />}
					noindex={false}
				/>
				<Route
					path="result/:event_id/:participant_id/:nth/create"
					element={<JudgingResultCreatePage />}
					noindex={false}
				/>
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
