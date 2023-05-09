import React, { useState, useEffect } from "react";
import axios from "axios";
import Page from "components/common/Page";
import Events from "components/common/Events";
import { API_URL } from "utils/const";

const JudgingEventAllPage = () => {
	const [events, setEvents] = useState([]);

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
