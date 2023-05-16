import React, { useState, useEffect } from "react";
import axios from "axios";

import AdminPage from "components/admin/AdminPage";
import AdminTable from "components/admin/AdminTable";
import { Link } from "react-router-dom";

import { API_URL } from "utils/const";
import LinkButton from "components/common/LinkButton";

const AdEmailAllPage = () => {
	const [ad_emails, setAdEmails] = useState([]);
	const [send_to, setSendTo] = useState("");

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/ad_email/all?limit=${SIZE}&skip=${page}`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((res) => {
			setAdEmails(res.data.ad_emails);
			let tmp = "mailto:?bcc=";
			res.data.ad_emails.map((ad_email) => {
				if (ad_email.subscribe === true) {
					tmp += `${ad_email.email},`;
				}
				return null;
			});
			setSendTo(tmp);
			setTotal(res.data.total);
		});
	}, [page]);

	return (
		<AdminPage>
			<h1>광고 수신 이메일</h1>
			<div
				style={{
					display: "flex",
				}}
			>
				<LinkButton to="/admin/ad_email/create" type="Link">
					이메일 추가
				</LinkButton>
				<LinkButton to={send_to} type="a">
					전체 이메일 보내기 (숨은참조)
				</LinkButton>
				<LinkButton to="/admin/ad_email/send/all" type="Link">
					전체 이메일 보내기 (한명 씩)
				</LinkButton>
			</div>
			<br />
			<AdminTable page={page} setPage={setPage} SIZE={SIZE} total={total}>
				<thead>
					<tr>
						<th>번호</th>
						<th>유저ID</th>
						<th>이메일</th>
						<th>수신 여부</th>
						<th>기타 정보</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{ad_emails.map((ad_email) => {
						return (
							<tr>
								<td>{ad_email.id}</td>
								<td>{ad_email.user_id}</td>
								<td>{ad_email.email}</td>
								<td>{`${ad_email.subscribe}`}</td>
								<td>{ad_email.etc_info}</td>
								<td>
									<Link to={`/admin/ad_email/delete/${ad_email.id}`}>삭제</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</AdminTable>
		</AdminPage>
	);
};

export default AdEmailAllPage;
