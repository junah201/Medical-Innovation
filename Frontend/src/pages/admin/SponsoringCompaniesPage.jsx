import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import AdminTable from "../../components/admin/AdminTable";
import { API_URL, S3_URL } from "./../../utils/const";
import Message from "../../components/common/Message";
import LinkButton from "../../components/common/LinkButton";

const SponsoringCompaniesPage = () => {
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/sponsoring_company/all`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json",
			},
		}).then((res) => {
			setCompanies(res.data);
		});
	}, []);

	return (
		<AdminPage>
			<h1>후원 기업 목록</h1>
			<Message>
				<Link to="/support/sponsor">후원자 소개 페이지</Link> 에 표시되는
				후원기업 목록입니다.
			</Message>
			<LinkButton to="/admin/sponsoring_company/upload">
				후원기업 업로드
			</LinkButton>
			<br />
			<AdminTable>
				<thead>
					<tr>
						<th>번호</th>
						<th>기업명</th>
						<th>링크</th>
						<th>파일명</th>
						<th>연도</th>
						<th>수정</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{companies.map((company) => {
						return (
							<tr>
								<td>{company.id}</td>
								<td>{company.name}</td>
								<td>{company.link}</td>
								<td>
									<a
										href={`${S3_URL}/banner/${company.filename}`}
										alt={company.filename}
									>
										{company.filename}
									</a>
								</td>
								<td>{company.year}</td>
								<td>
									<Link to={`/admin/sponsoring_company/edit/${company.id}`}>
										수정
									</Link>
								</td>
								<td>
									<Link to={`/admin/sponsoring_company/delete/${company.id}`}>
										삭제
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

export default SponsoringCompaniesPage;
