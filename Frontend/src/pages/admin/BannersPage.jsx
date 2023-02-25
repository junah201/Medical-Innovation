import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import AuthContext from "../../context/AuthContext";
import AdminPage from "../../components/admin/AdminPage";
import AdminTable from "../../components/admin/AdminTable";
import { API_URL, S3_URL } from "../../utils/const";
import Message from "../../components/common/Message";
import LinkButton from "../../components/common/LinkButton";

const BannersPage = () => {
	const authCtx = useContext(AuthContext);

	const [banners, setBanners] = useState([]);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/banner/all?limit=${SIZE}&skip=${page}`,
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setBanners(res.data.banners);
			setTotal(res.data.total);
		});
	}, [page, authCtx]);

	return (
		<AdminPage>
			<h1>배너 목록</h1>
			<Message>tip : 배너 목록은 배너 종료 시점을 기준으로 정렬됩니다.</Message>
			<LinkButton to="/admin/banner/upload">배너 업로드</LinkButton>
			<br />
			<AdminTable page={page} setPage={setPage} SIZE={SIZE} total={total}>
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
								<td>
									<a
										href={`${S3_URL}/banner/${banner.filename}`}
										alt={banner.filename}
									>
										{banner.filename}
									</a>
								</td>
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
