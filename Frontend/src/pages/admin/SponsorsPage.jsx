import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import AuthContext from "../../context/AuthContext";
import AdminPage from "../../components/admin/AdminPage";
import { API_URL } from "../../utils/const";

const SponsorsPage = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/file/sponsor/all`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.token}`,
			},
		}).then((res) => {
			setCompanies(res.data);
		});
	}, [authCtx]);

	return (
		<AdminPage>
			<h1>후원 목록</h1>
			<StyledCompanyContainer>
				<StyledCompanyItem>고유 ID</StyledCompanyItem>
				<StyledCompanyItem>유저 고유 ID</StyledCompanyItem>
				<StyledCompanyItem>성명 (단체명)</StyledCompanyItem>
				<StyledCompanyItem>전화번호</StyledCompanyItem>
				<StyledCompanyItem>주민등록번호 (사업자등록번호)</StyledCompanyItem>
				<StyledCompanyItem>주소</StyledCompanyItem>
				<StyledCompanyItem>희망 사용처</StyledCompanyItem>
				<StyledCompanyItem>기부 내용</StyledCompanyItem>
				<StyledCompanyItem>수정</StyledCompanyItem>
				<StyledCompanyItem>삭제</StyledCompanyItem>
				{companies.map((company) => {
					return (
						<>
							<StyledCompanyItem>{company.id}</StyledCompanyItem>
							<StyledCompanyItem>{company.user.id}</StyledCompanyItem>
							<StyledCompanyItem>{company.name}</StyledCompanyItem>
							<StyledCompanyItem>{company.phone}</StyledCompanyItem>
							<StyledCompanyItem>
								{company.identification_number}
							</StyledCompanyItem>
							<StyledCompanyItem>{company.address}</StyledCompanyItem>
							<StyledCompanyItem>{company.usage}</StyledCompanyItem>
							<StyledCompanyItem>{company.detail}</StyledCompanyItem>
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
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

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

export default SponsorsPage;
