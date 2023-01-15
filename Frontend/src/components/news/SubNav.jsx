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
				href="/news/announcement"
				text="공지사항"
				isSelect={props.select === "공지사항"}
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
