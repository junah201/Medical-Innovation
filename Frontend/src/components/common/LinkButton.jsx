import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLinkButton = styled.div`
	margin-left: 10px;

	& a {
		justify-content: center;
		padding: 8px;
		border: 1px solid #2763ba;
		font-size: 15px;
	}
	& a:hover {
		text-decoration: underline;
	}
`;

const LinkButton = ({ to, type, children }) => {
	return (
		<StyledLinkButton>
			{type === "Link" ? <Link to={to}>{children}</Link> : null}
			{type === "a" ? (
				<a href={to} target="_blank" rel="noopener noreferrer">
					{children}
				</a>
			) : null}
		</StyledLinkButton>
	);
};

export default LinkButton;
