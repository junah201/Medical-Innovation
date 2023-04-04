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
		<>
			<StyledSubNav>
				<SubNavButton
					href="/programs/event"
					text="프로그램안내"
					select={props.select === "프로그램안내"}
				></SubNavButton>
				<SubNavButton
					href="/programs/accelerating"
					text="스타트업지원"
					select={props.select === "스타트업지원"}
				></SubNavButton>
				<SubNavButton
					href="/programs/research_support_project"
					text="학술연구지원"
					select={props.select === "연구발굴 지원사업"}
				></SubNavButton>
				<SubNavButton
					href="/programs/trand"
					text="최신동향보고"
					select={props.select === "최신 동향 보편적 공유"}
				></SubNavButton>
			</StyledSubNav>
			<br />
			<StyledSubNav></StyledSubNav>
		</>
	);
};

export default SubNav;
