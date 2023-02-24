import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import AdminTable from "../../components/admin/AdminTable";
import { API_URL } from "../../utils/const";
import Message from "../../components/common/Message";
import LinkButton from "../../components/common/LinkButton";

const BannersPage = () => {
	const [banners, setBanners] = useState([]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/banner/all`,
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then((res) => {
			setBanners(res.data);
		});
	}, []);

	return (
		<AdminPage>
			<h1>배너 목록</h1>
			<Message>tip : 배너 목록은 배너 종료 시점을 기준으로 정렬됩니다.</Message>
			<LinkButton to="/admin/banner/upload">배너 업로드</LinkButton>
			<br />
			<AdminTable>
				<thead>
					<tr>
						<th>번호</th>
						<th>회사명</th>
						<th>파일명</th>
						<th>링크</th>
						<th>배너 종료 시점</th>
						<th>배너 생성 시점</th>
						<th>배너 수정 시점</th>
						<th>수정</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{banners.map((banner) => {
						return (
							<tr key={banner.id}>
								<td>{banner.id}</td>
								<td>{banner.name}</td>
								<td>{banner.filename}</td>
								<td>{banner.link}</td>
								<td>{banner.banner_end_at.replace("T", " ")}</td>
								<td>{banner.created_at.replace("T", " ")}</td>
								<td>{banner.updated_at.replace("T", " ")}</td>
								<td>
									<Link to={`/admin/banner/edit/${banner.id}`}>수정</Link>
								</td>
								<td>
									<Link to={`/admin/banner/delete/${banner.id}`}>삭제</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</AdminTable>
		</AdminPage>
	);
};

export default BannersPage;
