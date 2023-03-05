import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import MainLeftGrid from "../components/main/MainLeftGrid";
import MainRightGrid from "../components/main/MainRightGrid";
import { API_URL, S3_URL } from "../utils/const";
import PopupView from "../components/popup/PopupView";

import Header from "../components/base/Header";
import Banners from "../components/base/Banners";
import Footer from "../components/base/Footer";

import { Desktop } from "../components/responsive/responsive";

const StyledHomePage = styled.main`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30px;

	@media screen and (max-width: 991px) {
		padding: 10px 0;
	}
	@media screen and (min-width: 992px) {
	}
`;

const StyledHomeWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 20px;

	@media screen and (max-width: 991px) {
		padding: 0px;
	}
	@media screen and (min-width: 992px) {
	}

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
		font-size: 3vw;
		font-weight: 600;
	}
	@media screen and (max-width: 1420px) {
		& br {
			display: block;
		}
	}
	@media screen and (min-width: 1421px) {
		& br {
			display: none;
		}
	}
`;

const HomePage = () => {
	const [popups, setPopups] = useState([]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/popup/all/active`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				console.log(res.data.popups);
				setPopups(res.data.popups);
			}
		});
	}, []);

	return (
		<>
			<Header />
			<Desktop>
				{popups.map((popup) => {
					return (
						<PopupView
							key={popup.id}
							title={popup.title}
							filename={popup.image_filename}
						/>
					);
				})}
			</Desktop>
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
			<Footer />
		</>
	);
};

export default HomePage;
