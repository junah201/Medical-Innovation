import React from "react";
import styled from "styled-components";

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
	overflow: hidden;
	height: 100px;
	background-color: #474747;
	display: flex;
	justify-content: center;
	align-items: center;

	& * {
		text-align: center;
	}

	&,
	& * {
		color: #ffffff;
		font-size: 20px;
	}
	& > * + * {
		margin-left: 30px;
	}

	@media screen and (max-width: 991px) {
		flex-direction: column;
		& * {
			font-size: 12px;
		}
		& br {
		}
	}
	@media screen and (min-width: 992px) {
		& * {
			font-size: 20px;
		}

		& br {
		}
	}
`;

const StyledTopFooter = styled.div`
	height: 100px;
	background-color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 0 5%;

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
				<a href="/privacy-policy">개인정보처리방침</a>
				<p>(03080) 서울시 종로구 대학로 101, 12634호</p>
				<p>전화번호 : 02-2072-2226</p>
				<p>Copyright(c) 2016 재단법인 미래의학연구재단. All rights reserved.</p>
			</StyledBottomFooter>
		</StyledFooter>
	);
};

export default Footer;
