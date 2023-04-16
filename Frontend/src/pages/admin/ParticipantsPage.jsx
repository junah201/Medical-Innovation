import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import AdminPage from "components/admin/AdminPage";
import AdminTable from "components/admin/AdminTable";
import { API_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import Message from "components/common/Message";
import SelectInput from "components/form/SelectInput";
import LinkButton from "components/common/LinkButton";

const ParticipantsPage = () => {
	const [publicEvents, setPublicEvents] = useState([]);
	const [selectedEventId, setSelectedEventId] = useState(2);
	const [participants, setParticipants] = useState([]);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	const authCtx = useContext(AuthContext);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/public_event/all?skip=0&limit=300`,
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setPublicEvents(res.data.events);
			setSelectedEventId(res.data.events[0].id);
		});
	}, [authCtx.accessToken]);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/participant/${selectedEventId}/all?limit=${SIZE}&skip=${page}`,
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setParticipants(res.data.participants);
			setTotal(res.data.total);
		});
	}, [authCtx.accessToken, selectedEventId, page, total]);

	const onSelectHandler = (e) => {
		e.preventDefault();
		console.log(e.target.value);
		setSelectedEventId(e.target.value);
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/participant/${e.target.value}/all`,
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setParticipants(res.data.participants);
		});
	};

	return (
		<AdminPage>
			<h1>행사 참가자 목록</h1>
			<Message>tip :</Message>
			<SelectInput onChange={onSelectHandler} value={selectedEventId}>
				{publicEvents.map((publicEvent) => {
					return (
						<option key={publicEvent.id} value={publicEvent.id}>
							{publicEvent.name}
						</option>
					);
				})}
			</SelectInput>
			<LinkButton
				type="a"
				to={`${API_URL}/api/v1/participant/${selectedEventId}/all/excel`}
			>
				참가자 목록 다운로드
			</LinkButton>
			<br />
			<AdminTable setPage={setPage} page={page} SIZE={SIZE} total={total}>
				<thead>
					<tr>
						<th>번호</th>
						<th>이름</th>
						<th>성별</th>
						<th>생년월일</th>
						<th>전화번호</th>
						<th>이메일</th>
						<th>소속기관</th>
						<th>직책</th>
						<th>상세정보</th>
					</tr>
				</thead>
				<tbody>
					{participants.map((participant) => {
						return (
							<tr key={participant.id}>
								<td>{participant.id}</td>
								<td>{participant.name}</td>
								<td>{participant.gender}</td>
								<td>{participant.birth}</td>
								<td>{participant.phone}</td>
								<td>{participant.email}</td>
								<td>{participant.organization_name}</td>
								<td>{participant.job_position}</td>
								<td>상세정보</td>
							</tr>
						);
					})}
				</tbody>
			</AdminTable>
		</AdminPage>
	);
};

export default ParticipantsPage;
