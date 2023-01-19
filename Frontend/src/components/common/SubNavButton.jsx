import React from "react";
import styled from "styled-components";

const StyledSubNavButton = styled.a`
	width: calc(100% / 4);
	min-height: 40px;
	text-align: center;

	font-size: 22.5px;
	font-weight: 600;

	color: ${(props) => (props.isSelect ? "#204397" : "#494949")};
	border-bottom: ${(props) =>
		props.isSelect ? "4px solid #204397" : "1.5px solid #494949"};

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

const SubNavButton = ({ text, href, isSelect }) => {
	return (
		<StyledSubNavButton href={href} isSelect={isSelect}>
			{text}
		</StyledSubNavButton>
	);
};

export default SubNavButton;
