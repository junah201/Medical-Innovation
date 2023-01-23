import React from "react";
import styled from "styled-components";

const StyledMessage = styled.div`
	margin-bottom: 60px;
	padding: 20px;
	border-radius: 10px;
	background-color: #f7f7f7;
	font-size: 20px;
	word-break: keep-all;

	& > * + * {
		margin-top: 10px;
	}

	& p > strong {
		margin: 0 5px;
	}

	@media screen and (max-width: 991px) {
		font-size: 16px;
	}
	@media screen and (min-width: 992px) {
	}
`;

const Message = ({ children }) => {
	return <StyledMessage>{children}</StyledMessage>;
};

export default Message;
