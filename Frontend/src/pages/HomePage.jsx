import React from "react";
import styled from "styled-components";

import MainLeftGrid from "../components/main/MainLeftGrid";
import MainRightGrid from "../components/main/MainRightGrid";
import Banners from "../components/base/Banners";

const StyledHomePage = styled.main`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30px;
`;

const StyledHomeWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 20px;

	& > * + * {
		margin-left: 40px;
	}
`;

const StyledHomeTitle = styled.h1`
	font-size: 40px;
	font-weight: 600;
	text-align: center;
	margin-bottom: 12px;
	width: 100%;

	@media screen and (max-width: 991px) {
		display: none;
	}
	@media screen and (min-width: 992px) {
	}
`;

const StyledHomeDescription = styled.span`
	font-size: 24px;
	font-weight: 400;
	text-align: center;
	display: block;
	width: 100%;
	@media screen and (max-width: 991px) {
		font-size: 14px;
		font-weight: 600;
	}
	@media screen and (min-width: 992px) {
		& br {
			display: none;
		}
	}
`;

const HomePage = () => {
	return (
		<>
			<StyledHomePage>
				<StyledHomeTitle>Foundation for Medical Innovation</StyledHomeTitle>
				<StyledHomeDescription>
					재단법인 미래의학연구재단은 과학기술정보통신부 소관
					<br />
					비영리법인 · 지정기부금단체 · 중소밴처기업부 등록 창업기획자입니다.
				</StyledHomeDescription>
				<StyledHomeWrapper>
					<MainLeftGrid />
					<MainRightGrid />
				</StyledHomeWrapper>
			</StyledHomePage>
			<Banners />
		</>
	);
};

export default HomePage;
