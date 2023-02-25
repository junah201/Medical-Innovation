import React from "react";
import styled from "styled-components";

const StyledSubmitButton = styled.button`
	background-color: #204498;
	color: #ffffff;
	font-size: 16px;
	padding: 8px;
	max-width: 600px;
`;

const SubmitButton = ({ onClick }) => {
	return <StyledSubmitButton onClick={onClick}>제출</StyledSubmitButton>;
};

export default SubmitButton;
