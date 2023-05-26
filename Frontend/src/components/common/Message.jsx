import React from "react";
import styled from "styled-components";

const StyledMessage = styled.div`
	padding: 20px;
	border-radius: 10px;
	background-color: #f7f7f7;
	font-size: 20px;

	& > * + * {
		margin-top: 10px;
	}

	& p {
		padding-left: 5px;
	}

	& p > strong {
		margin: 0 5px;
	}

	& p > span {
		font-weight: 600;
		font-size: 24px;
	}

	& a:hover {
		text-decoration: underline;
	}

	@media screen and (max-width: 991px) {
		font-size: 16px;

		& p > span {
			font-weight: 600;
			font-size: 20px;
		}
	}
	@media screen and (min-width: 992px) {
	}
`;

const Message = ({ children }) => {
	return <StyledMessage>{children}</StyledMessage>;
};

export default Message;
