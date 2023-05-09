import React, { useState, useEffect } from "react";

import Page from "components/common/Page";
import Message from "components/common/Message";
import SubNav from "components/programs/SubNav";
import Events from "components/common/Events";
import axios from "axios";

import { API_URL } from "utils/const";

const EventsPage = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/public_event/all?skip=0&limit=100000`,
			headers: {
				accept: "application/json",
			},
		})
			.then((res) => {
				if (res.status === 200) {
					setEvents(res.data.events);
					return;
				}
			})
			.catch((err) => {
				console.log(err);
				alert("행사 목록을 불러오는데 실패했습니다.\n\n" + err);
			});
	}, []);

	return (
		<Page>
			<SubNav select="프로그램안내" />
			<h1>행사 목록</h1>
			<Message>재단법인 미래의학연구재단의 행사 목록입니다.</Message>
			<Events
				events={events}
				itemToLink={(item) => {
					return `/programs/event/${item.id}/detail`;
				}}
			/>
		</Page>
	);
};

export default EventsPage;
