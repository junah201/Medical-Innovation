import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import AuthContext from "context/AuthContext";
import AdminPage from "components/admin/AdminPage";
import { API_URL } from "utils/const";
import AdminTable from "components/admin/AdminTable";

const SponsorsPage = () => {
	const authCtx = useContext(AuthContext);
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/sponsor/all`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setCompanies(res.data);
		});
	}, [authCtx]);

	return (
		<AdminPage>
			<h1>후원 목록</h1>
			<AdminTable>
				<thead>
					<tr>
						<th>고유 ID</th>
						<th>유저 고유 ID</th>
						<th>성명 (단체명)</th>
						<th>전화번호</th>
						<th>주민등록번호 (사업자등록번호)</th>
						<th>주소</th>
						<th>희망 사용처</th>
						<th>기부 내용</th>
					</tr>
				</thead>
				<tbody>
					{companies.map((company) => {
						return (
							<tr key={company.id}>
								<td>{company.id}</td>
								<td>{company.user.id}</td>
								<td>{company.name}</td>
								<td>{company.phone}</td>
								<td>{company.identification_number}</td>
								<td>{company.address}</td>
								<td>{company.usage}</td>
								<td>{company.detail}</td>
							</tr>
						);
					})}
				</tbody>
			</AdminTable>
		</AdminPage>
	);
};

export default SponsorsPage;
