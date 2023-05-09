import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AuthContext from "context/AuthContext";

const StyledPage = styled.div`
	background: #fff;
	color: #000;
	min-height: 100vh;
	height: 100%;
	display: flex;
`;

const StyledPageWrapper = styled.main`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 32px;
	margin-left: 250px;

	& h1 {
		font-size: 30px;
		border-left: 5px solid #204397;
		padding-left: 10px;
		margin-bottom: 20px;
	}
`;

const AdminPage = ({ children }) => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		if (!authCtx.isLoggedIn) {
			alert("로그인이 필요한 서비스입니다.");
			navigate("/login");
			return;
		}
		if (!authCtx.isAdmin) {
			alert("권한이 부족합니다.");
			navigate("/");
			return;
		}
	}, [navigate, authCtx]);

	return (
		<StyledPage>
			<AdminHeader />
			<StyledPageWrapper>{children}</StyledPageWrapper>
		</StyledPage>
	);
};

export default AdminPage;
