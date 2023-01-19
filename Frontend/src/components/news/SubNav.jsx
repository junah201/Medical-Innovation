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
				href="/news/press_release"
				text="보도자료"
				isSelect={props.select === "보도자료"}
			></SubNavButton>
			<SubNavButton
				href="/news/photos"
				text="사진"
				isSelect={props.select === "사진"}
			></SubNavButton>
			<SubNavButton
				href="/news/other"
				text="자료실"
				isSelect={props.select === "자료실"}
			></SubNavButton>
		</StyledSubNav>
	);
};

export default SubNav;
