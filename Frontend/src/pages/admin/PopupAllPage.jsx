import React, { useState, useEffect } from "react";
import axios from "axios";

import AdminPage from "./../../components/admin/AdminPage";
import AdminTable from "../../components/admin/AdminTable";
import { Link } from "react-router-dom";

import { API_URL, S3_URL } from "../../utils/const";
import LinkButton from "../../components/common/LinkButton";

const PopupAllPage = () => {
	const [popups, setPopups] = useState([]);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/popup/all?limit=${SIZE}&skip=${page}`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((res) => {
			setPopups(res.data.popups);
			setTotal(res.data.total);
		});
	}, [page]);

	return (
		<AdminPage>
			<h1>페이지 팝업</h1>
			<LinkButton to="/admin/popup/create" type="Link">
				페이지 팝업 생성
			</LinkButton>
			<br />
			<AdminTable page={page} setPage={setPage} SIZE={SIZE} total={total}>
				<thead>
					<tr>
						<th>번호</th>
						<th>제목</th>
						<th>이미지</th>
						<th>팝업 시작 날짜</th>
						<th>팝업 종료 날짜</th>
						<th>수정</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{popups.map((popup) => {
						return (
							<tr>
								<td>{popup.id}</td>
								<td>{popup.title}</td>
								<td>
									<a
										href={`${S3_URL}/upload/${popup.image_filename}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{popup.image_filename}
									</a>
								</td>
								<td>{popup.popup_start_date}</td>
								<td>{popup.popup_end_date}</td>
								<td>
									<Link to={`/admin/popup/edit/${popup.id}`}>수정</Link>
								</td>
								<td>
									<Link to={`/admin/popup/delete/${popup.id}`}>삭제</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</AdminTable>
		</AdminPage>
	);
};

export default PopupAllPage;
