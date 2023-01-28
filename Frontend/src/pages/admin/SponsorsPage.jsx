import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import AuthContext from "../../context/AuthContext";
import AdminPage from "../../components/admin/AdminPage";
import { API_URL } from "../../utils/const";

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
			<StyledSponsorContainer>
				<StyledSponsorItem>고유 ID</StyledSponsorItem>
				<StyledSponsorItem>유저 고유 ID</StyledSponsorItem>
				<StyledSponsorItem>성명 (단체명)</StyledSponsorItem>
				<StyledSponsorItem>전화번호</StyledSponsorItem>
				<StyledSponsorItem>주민등록번호 (사업자등록번호)</StyledSponsorItem>
				<StyledSponsorItem>주소</StyledSponsorItem>
				<StyledSponsorItem>희망 사용처</StyledSponsorItem>
				<StyledSponsorItem>기부 내용</StyledSponsorItem>
				{companies.map((company) => {
					return (
						<>
							<StyledSponsorItem>{company.id}</StyledSponsorItem>
							<StyledSponsorItem>{company.user.id}</StyledSponsorItem>
							<StyledSponsorItem>{company.name}</StyledSponsorItem>
							<StyledSponsorItem>{company.phone}</StyledSponsorItem>
							<StyledSponsorItem>
								{company.identification_number}
							</StyledSponsorItem>
							<StyledSponsorItem>{company.address}</StyledSponsorItem>
							<StyledSponsorItem>{company.usage}</StyledSponsorItem>
							<StyledSponsorItem>{company.detail}</StyledSponsorItem>
						</>
					);
				})}
			</StyledSponsorContainer>
		</AdminPage>
	);
};

const StyledSponsorContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

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

const StyledSponsorItem = styled.div`
	text-align: center;
	padding: 5px;
`;

export default SponsorsPage;
