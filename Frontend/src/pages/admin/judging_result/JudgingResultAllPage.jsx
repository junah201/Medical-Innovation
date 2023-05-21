import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AdminPage from "components/admin/AdminPage";
import AdminTable from "components/admin/AdminTable";
import { API_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import Message from "components/common/Message";
import SelectInput from "components/form/SelectInput";
import LinkButton from "components/common/LinkButton";
import { Link } from "react-router-dom";

const JudgingResultAllPage = () => {
	const [judgingEvents, setJudgingEvents] = useState([]);
	const [selectedEventId, setSelectedEventId] = useState(4);
	const [judgingResults, setJudgingResults] = useState([]);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	const authCtx = useContext(AuthContext);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/judging_event/all?skip=0&limit=300`,
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setJudgingEvents(res.data.events);
			setSelectedEventId(res.data.events[0].id);
		});
	}, [authCtx.accessToken]);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/judging_result/${selectedEventId}/all?limit=${SIZE}&skip=${page}`,
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setJudgingResults(res.data.results);
			setTotal(res.data.total);
		});
	}, [authCtx.accessToken, selectedEventId, page, total]);

	const onSelectHandler = (e) => {
		e.preventDefault();
		console.log(e.target.value);
		setSelectedEventId(e.target.value);
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/judging_result/${e.target.value}/all`,
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setJudgingResults(res.data.results);
		});
	};

	return (
		<AdminPage>
			<h1>심사 결과</h1>
			<Message>tip :</Message>
			<LinkButton
				type="a"
				to={`${API_URL}/api/v1/judging_result/${selectedEventId}/all/excel`}
			>
				심사 결과 목록 다운로드
			</LinkButton>
			<SelectInput onChange={onSelectHandler} value={selectedEventId}>
				{judgingEvents.map((publicEvent) => {
					return (
						<option key={publicEvent.id} value={publicEvent.id}>
							{publicEvent.name}
						</option>
					);
				})}
			</SelectInput>
			<br />
			<AdminTable setPage={setPage} page={page} SIZE={SIZE} total={total}>
				<thead>
					<tr>
						<th>번호</th>
						<th>이름</th>
						<th>N차</th>
						<th>점수</th>
						<th>생성일</th>
						<th>수정일</th>
						<th>상세정보</th>
					</tr>
				</thead>
				<tbody>
					{judgingResults.map((judgingResult) => {
						return (
							<tr key={judgingResult.id}>
								<td>{judgingResult.id}</td>
								<td>{judgingResult?.user?.name}</td>
								<td>{judgingResult.nth}차</td>
								<td>{judgingResult.total_score}</td>
								<td>{judgingResult.created_at.replace("T", " ")}</td>
								<td>{judgingResult.updated_at.replace("T", " ")}</td>
								<td>
									<Link to={`/admin/judging_result/detail/${judgingResult.id}`}>
										상세정보
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</AdminTable>
		</AdminPage>
	);
};

export default JudgingResultAllPage;
