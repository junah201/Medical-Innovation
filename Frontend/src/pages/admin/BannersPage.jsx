import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import AdminTable from "../../components/admin/AdminTable";
import { API_URL } from "../../utils/const";
import Message from "../../components/common/Message";

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
			<h1>Banners</h1>
			<Message>배너 목록</Message>
			<AdminTable column={9}>
				<div>고유 id</div>
				<div>회사명</div>
				<div>파일명</div>
				<div>링크</div>
				<div>배너 종료 시점</div>
				<div>배너 생성 시점</div>
				<div>배너 수정 시점</div>
				<div>수정</div>
				<div>삭제</div>
				{banners.map((banner) => {
					return (
						<>
							<div>{banner.id}</div>
							<div>{banner.name}</div>
							<div>{banner.filename}</div>
							<div>{banner.link}</div>
							<div>{banner.banner_end_at}</div>
							<div>{banner.created_at}</div>
							<div>{banner.updated_at}</div>
							<div>
								<Link to={`/admin/banner/edit/${banner.id}`}>수정하기</Link>
							</div>
							<div>
								<Link to={`/admin/banner/delete/${banner.id}`}>삭제하기</Link>
							</div>
						</>
					);
				})}
			</AdminTable>
		</AdminPage>
	);
};

export default BannersPage;
