import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Page from "components/common/Page";
import Events from "components/common/Events";
import { API_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import { useNavigate } from "react-router-dom";

const JudgingEventAllPage = () => {
	const [events, setEvents] = useState([]);
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		const checkJudgingPermission = (JudgingPermissions) => {
			if (JudgingPermissions === undefined) return false;
			if (JudgingPermissions.length === 0) return false;

			for (let i = 0; i < JudgingPermissions.length; i++) {
				if (
					JudgingPermissions[i].first_judging_permission ||
					JudgingPermissions[i].second_judging_permission
				) {
					return true;
				}
			}

			return false;
		};

		axios({
			method: "GET",
			url: `${API_URL}/api/v1/user/me`,
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				console.log(res.data.judging_permissions);
				console.log(checkJudgingPermission(res.data.judging_permissions));
				if (checkJudgingPermission(res.data.judging_permissions)) return;

				alert("심사 권한이 없습니다.");
				navigate(`/me`);
			}
		});
	}, [authCtx.accessToken, navigate]);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/judging_event/all?skip=0&limit=100000`,
			headers: {
				accept: "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				setEvents(res.data.events);
				return;
			}
		});
	}, []);

	return (
		<Page>
			<h1>심사 행사</h1>
			<Events
				events={events}
				itemToLink={(item) => {
					return `/judging/result/${item.id}/all`;
				}}
			/>
		</Page>
	);
};

export default JudgingEventAllPage;
