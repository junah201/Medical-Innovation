import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledSubNavButton = styled(Link)`
	width: calc(100% / 4);
	min-height: 40px;
	text-align: center;

	font-size: 22.5px;
	font-weight: 600;

	color: ${(props) => (props.select ? "#204397" : "#494949")};
	border-bottom: ${(props) =>
		props.select ? "4px solid #204397" : "1.5px solid #494949"};

	& + & {
		margin-left: 10px;
	}

	word-break: keep-all;

	@media screen and (max-width: 400px) {
		font-size: 14px;
		min-height: 25px;
	}
	@media screen and (min-width: 401px) and (max-width: 991px) {
		font-size: 14px;
		min-height: 30px;
	}
	@media screen and (min-width: 992px) {
	}
`;

const SubNavButton = ({ text, href, select }) => {
	return (
		<StyledSubNavButton to={href} select={select}>
			{text}
		</StyledSubNavButton>
	);
};

export default SubNavButton;
