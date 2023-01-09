import React from "react";
import styled from "styled-components";

const StyledPage = styled.main`
	display: flex;
	justify-content: center;
	padding: 20px;
`;

const StyledWrapper = styled.div`
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	padding: 30px 80px;
	width: 1230px;

	& h1 {
		font-size: 30px;
		border-left: 5px solid #204397;
		padding-left: 10px;
	}
`;

const Page = (props) => {
	return (
		<StyledPage>
			<StyledWrapper>{props.children}</StyledWrapper>
		</StyledPage>
	);
};

export default Page;
