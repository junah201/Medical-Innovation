import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import AdminTable from "../../components/admin/AdminTable";
import { API_URL } from "./../../utils/const";

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
			<AdminTable column={7}>
				<div>고유 ID</div>
				<div>기업명</div>
				<div>링크</div>
				<div>파일명</div>
				<div>연도</div>
				<div>수정</div>
				<div>삭제</div>
				{companies.map((company) => {
					return (
						<>
							<div>{company.id}</div>
							<div>{company.name}</div>
							<div>{company.link}</div>
							<div>{company.filename}</div>
							<div>{company.year}</div>
							<div>
								<Link to={`/admin/sponsoring_company/edit/${company.id}`}>
									수정하기
								</Link>
							</div>
							<div>
								<Link to={`/admin/sponsoring_company/delete/${company.id}`}>
									삭제하기
								</Link>
							</div>
						</>
					);
				})}
			</AdminTable>
		</AdminPage>
	);
};

export default SponsoringCompaniesPage;
