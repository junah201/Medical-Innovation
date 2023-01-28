import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import { API_URL } from "./../../utils/const";

const SponsoringCompaniesPage = () => {
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/file/sponsoring_companies`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			setCompanies(res.data);
		});
	}, []);

	return (
		<AdminPage>
			<h1>후원 기업 목록</h1>
			<StyledCompanyContainer>
				<StyledCompanyItem>고유 ID</StyledCompanyItem>
				<StyledCompanyItem>기업명</StyledCompanyItem>
				<StyledCompanyItem>링크</StyledCompanyItem>
				<StyledCompanyItem>파일명</StyledCompanyItem>
				<StyledCompanyItem>연도</StyledCompanyItem>
				<StyledCompanyItem>수정</StyledCompanyItem>
				<StyledCompanyItem>삭제</StyledCompanyItem>
				{companies.map((company) => {
					return (
						<>
							<StyledCompanyItem>{company.id}</StyledCompanyItem>
							<StyledCompanyItem>{company.name}</StyledCompanyItem>
							<StyledCompanyItem>{company.link}</StyledCompanyItem>
							<StyledCompanyItem>{company.filename}</StyledCompanyItem>
							<StyledCompanyItem>{company.year}</StyledCompanyItem>
							<StyledCompanyItem>
								<Link to={`/admin/sponsoring_company/edit/${company.id}`}>
									수정하기
								</Link>
							</StyledCompanyItem>
							<StyledCompanyItem>
								<Link to={`/admin/sponsoring_company/delete/${company.id}`}>
									삭제하기
								</Link>
							</StyledCompanyItem>
						</>
					);
				})}
			</StyledCompanyContainer>
		</AdminPage>
	);
};

const StyledCompanyContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

	border-top: 2px solid silver;
	border-left: 2px solid silver;

	& > div {
		border-right: 2px solid silver;
		border-bottom: 2px solid silver;
	}

	& a:hover {
		text-decoration: underline;
	}
`;

const StyledCompanyItem = styled.div`
	text-align: center;
	padding: 5px;
`;

export default SponsoringCompaniesPage;
