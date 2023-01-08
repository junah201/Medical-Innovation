import React from "react";
import styled from "styled-components";

const StyledSubNavButton = styled.a`
	width: 250px;
	height: 40px;
	text-align: center;

	font-size: 22.5px;
	font-weight: 600;

	color: ${(props) => (props.isSelect ? "#204397" : "#494949")};
	border-bottom: ${(props) =>
		props.isSelect ? "4px solid #204397" : "1px solid #494949"};

	& + & {
		margin-left: 10px;
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
