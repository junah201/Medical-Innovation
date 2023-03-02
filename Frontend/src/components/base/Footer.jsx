import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import longLogo from "../../static/images/long_logo.png";
import msitLogo from "../../static/images/과학기술정보통신부.png";
import cbtci from "../../static/images/세포치료실용화센터CI.png";
import khidi from "../../static/images/연구중심병원.png";
import snubio from "../../static/images/협동과정줄기세포생물학.png";

const StyledFooter = styled.footer`
	border-top: 1px solid #000000;
	overflow: hidden;
	width: 100%;

	& img {
		overflow: hidden;
	}
`;

const StyledBottomFooter = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	height: 100px;
	background-color: #474747;

	& a:hover {
		text-decoration: underline;
	}

	& > div {
		display: flex;
		flex-direction: column;
	}

	& * {
		color: #ffffff;
	}
	& > * + * {
		margin-left: 30px;
	}

	@media screen and (max-width: 991px) {
		& * {
			font-size: 10px;
		}
		& br {
		}
	}
	@media screen and (min-width: 992px) {
		& * {
			font-size: 16px;
		}

		& br {
		}
	}
`;

const StyledTopFooter = styled.div`
	height: 100px;
	background-color: #ffffff;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	& img {
		height: 60px;
	}

	@media screen and (max-width: 991px) {
		display: block;
		padding: 0;

		& > div {
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			justify-items: center;
		}
	}
	@media screen and (min-width: 992px) {
	}
`;

const StyledTopFooterItem = styled.a`
	@media screen and (max-width: 991px) {
		& img {
			height: ${(props) => (props.height ? 30 : 40)}px;
		}
	}
	@media screen and (min-width: 992px) {
		& img {
			height: ${(props) => (props.height ? 40 : 60)}px;
		}
	}
`;

const Footer = () => {
	return (
		<StyledFooter>
			<StyledTopFooter>
				<div>
					<StyledTopFooterItem href="/" height="50">
						<img src={longLogo} alt="미래의학연구재단" />
					</StyledTopFooterItem>
					<StyledTopFooterItem
						href="http://www.celltherapy.re.kr"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src={cbtci} alt="StyledTopFooter" />
					</StyledTopFooterItem>
					<StyledTopFooterItem
						href="https://www.khidi.or.kr/rndhospital"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src={khidi} alt="StyledTopFooter" />
					</StyledTopFooterItem>
				</div>

				<div>
					<StyledTopFooterItem
						href="https://www.khidi.or.kr/rndhospital"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src={snubio} alt="StyledTopFooter" />
					</StyledTopFooterItem>
					<StyledTopFooterItem
						href="https://www.msit.go.kr/"
						target="_blank"
						rel="noopener noreferrer"
						height="50"
					>
						<img src={msitLogo} alt="과학기술정보통신부" />
					</StyledTopFooterItem>
				</div>
			</StyledTopFooter>
			<StyledBottomFooter>
				<div>
					<strong>재단법인 미래의학연구재단</strong>
					<p>이사장 : 전승호</p>
					<p>주소 : (04736) 서울특별시 성동구 독서당로 166</p>
					<p>
						Copyright(c) 2016 재단법인 미래의학연구재단. All rights reserved.
					</p>
				</div>
				<div>
					<strong>관련 링크</strong>
					<Link to="/privacy-policy">개인정보처리방침</Link>
					<Link to="/mou">협력기관</Link>
					<Link to="/advisory_group">임원현황</Link>
				</div>
			</StyledBottomFooter>
		</StyledFooter>
	);
};

export default Footer;
