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
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/user/me`,
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				if (res.data.first_judging_permission === true) return;
				if (res.data.second_judging_permission === true) return;

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
