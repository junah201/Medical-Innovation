import React from "react";
import styled from "styled-components";

import SubNavButton from "../common/SubNavButton";

const StyledSubNav = styled.nav`
	display: flex;
	justify-content: center;
	margin-bottom: 30px;
`;

const SubNav = (props) => {
	return (
		<StyledSubNav>
			<SubNavButton
				href="/programs/openinnovation"
				text="오픈 이노베이션"
				isSelect={props.select === "오픈 이노베이션"}
			></SubNavButton>
			<SubNavButton
				href="/programs/accelerating"
				text="연구자 중심 창업지원"
				isSelect={props.select === "연구자 중심 창업지원"}
			></SubNavButton>
			<SubNavButton
				href="/programs/research_support_project"
				text="연구발굴지원사업"
				isSelect={props.select === "연구발굴지원사업"}
			></SubNavButton>
			<SubNavButton
				href="/programs/orgchart_and_project"
				text="최신 동향 보편적 공유"
				isSelect={props.select === "최신 동향 보편적 공유"}
			></SubNavButton>
		</StyledSubNav>
	);
};

export default SubNav;
