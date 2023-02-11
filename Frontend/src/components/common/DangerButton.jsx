import React from "react";
import styled from "styled-components";

const StyledDangerButton = styled.button`
	padding: 10px 20px;
	font-size: 20px;
	font-weight: 600;
	margin: auto 0;
	background-color: #ffffff;
	color: #ff0000;
	border: 1px solid #ff0000;
	border-radius: 5px;
	cursor: pointer;
`;

const DangerButton = ({ children, onClick }) => {
	return <StyledDangerButton onClick={onClick}>{children}</StyledDangerButton>;
};

export default DangerButton;
