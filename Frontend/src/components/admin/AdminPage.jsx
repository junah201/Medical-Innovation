import React from "react";
import styled from "styled-components";

import AdminHeader from "./AdminHeader";

const StyledPage = styled.div`
	background: #fff;
	color: #000;
	height: 100vh;
	display: flex;
`;

const StyledPageWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 32px;

	& h1 {
		font-size: 30px;
		border-left: 5px solid #204397;
		padding-left: 10px;
		margin-bottom: 20px;
	}
`;

const AdminPage = ({ children }) => {
	return (
		<StyledPage>
			<AdminHeader />
			<StyledPageWrapper>{children}</StyledPageWrapper>
		</StyledPage>
	);
};

export default AdminPage;
