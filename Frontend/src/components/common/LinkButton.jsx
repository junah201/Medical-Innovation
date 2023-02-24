import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLinkButton = styled(Link)`
	justify-content: center;
	padding: 8px;
	border: 1px solid #2763ba;
	font-size: 15px;

	&:hover {
		text-decoration: underline;
	}
`;

const LinkButton = ({ to, children }) => {
	return (
		<div>
			<StyledLinkButton to={to}>{children}</StyledLinkButton>
		</div>
	);
};

export default LinkButton;
