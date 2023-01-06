import React from "react";
import styled from "styled-components";

import Header from "../components/base/Header";
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

const StyledDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 20px;

	& > * + * {
		margin-left: 40px;
	}
`;

const HomePage = () => {
	return (
		<div>
			<Header />
			<StyledHomePage>
				<h1
					style={{
						fontSize: "40px",
						fontWeight: "600",
						textAlign: "center",
						marginBottom: "12px",
						width: "100%",
					}}
				>
					Foundation for Medical Innovation
				</h1>
				<span
					style={{
						fontSize: "25px",
						fontWeight: "400",
						textAlign: "center",
						display: "block",
						width: "100%",
					}}
				>
					재단법인 미래의학연구재단은 과학기술정보통신부 소관 비영리법인 ·
					지정기부금단체 · 중소밴처기업부 창업기획자 등록기관입니다.
				</span>
				<StyledDiv>
					<MainLeftGrid />
					<MainRightGrid />
				</StyledDiv>
				<Banners />
			</StyledHomePage>
		</div>
	);
};

export default HomePage;
