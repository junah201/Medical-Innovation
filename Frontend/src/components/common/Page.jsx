import React from "react";
import styled from "styled-components";

import Header from "components/base/Header";
import Footer from "components/base/Footer";

const StyledPage = styled.main`
	display: flex;
	justify-content: center;
	padding: 20px;

	@media screen and (max-width: 991px) {
		padding: 15;
		min-height: calc(100vh - 200px);
	}
	@media screen and (min-width: 992px) {
		min-height: calc(100vh - 300px);
	}
`;

const StyledWrapper = styled.div`
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	padding: 30px 80px;
	width: 100%;
	max-width: 1230px;

	& h1 {
		font-size: 30px;
		border-left: 5px solid #204397;
		padding-left: 10px;
		margin-bottom: 20px;
	}

	@media screen and (max-width: 991px) {
		min-width: none;
		padding: 15px 15px;
	}
	@media screen and (min-width: 992px) {
	}
`;

const Page = (props) => {
	return (
		<>
			<Header />
			<StyledPage>
				<StyledWrapper>{props.children}</StyledWrapper>
			</StyledPage>
			<Footer />
		</>
	);
};

export default Page;
