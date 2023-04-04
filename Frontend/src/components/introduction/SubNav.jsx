import React from "react";
import styled from "styled-components";

import SubNavButton from "components/common/SubNavButton";

const StyledSubNav = styled.nav`
	display: flex;
	justify-content: center;
	margin-bottom: 30px;
`;

const SubNav = (props) => {
	return (
		<StyledSubNav>
			<SubNavButton
				href="/introduction/founder"
				text="설립자 소개"
				select={props.select === "설립자 소개"}
			></SubNavButton>
			<SubNavButton
				href="/introduction/message"
				text="이사장 인사말"
				select={props.select === "이사장 인사말"}
			></SubNavButton>
			<SubNavButton
				href="/introduction/mission_and_history"
				text="설립 취지 및 연혁"
				select={props.select === "설립 취지 및 연혁"}
			></SubNavButton>
			<SubNavButton
				href="/introduction/orgchart_and_project"
				text="조직도 및 주요사업"
				select={props.select === "조직도 및 주요사업"}
			></SubNavButton>
		</StyledSubNav>
	);
};

export default SubNav;
