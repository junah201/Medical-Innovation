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
				select={props.select === "공지사항"}
			></SubNavButton>
			<SubNavButton
				href="/news/press_release"
				text="보도자료"
				select={props.select === "보도자료"}
			></SubNavButton>
			<SubNavButton
				href="/news/column"
				text="기고문"
				select={props.select === "기고문"}
			></SubNavButton>
			<SubNavButton
				href="/news/photo"
				text="사진"
				select={props.select === "사진"}
			></SubNavButton>
		</StyledSubNav>
	);
};

export default SubNav;
