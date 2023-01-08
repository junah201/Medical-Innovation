import React from "react";
import styled from "styled-components";

import longLogo from "../../static/images/long_logo.png";
import msitLogo from "../../static/images/과학기술정보통신부.png";

const StyledTopFooter = styled.div`
	width: 100vw;
	height: 100px;
	background-color: #474747;
	display: flex;
	justify-content: center;
	align-items: center;

	&,
	& * {
		color: #ffffff;
		font-size: 20px;
	}
	& > * + * {
		margin-left: 30px;
	}
`;

const StyledBottomFooter = styled.div`
	width: 100vw;
	height: 100px;
	background-color: #ffffff;
	display: flex;
	justify-content: end;
	align-items: center;

	padding: 0 5%;

	& > * + * {
		margin-left: 30px;
	}

	& img {
		height: 60px;
	}
`;

const Footer = () => {
	return (
		<footer>
			<StyledTopFooter>
				<a href="/privacy-policy">개인정보처리방침</a>
				<p>(03080) 서울시 종로구 대학로 101, 12634호</p>
				<p>TEL : 02-2072-2226</p>
				<p>Copyright(c) 2016 재단법인 미래의학연구재단. All rights reserved.</p>
			</StyledTopFooter>
			<StyledBottomFooter>
				<a href="/">
					<img src={longLogo} alt="미래의학연구재단" />
				</a>
				<a
					href="https://www.msit.go.kr/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={msitLogo} alt="과학기술정보통신부" />
				</a>
			</StyledBottomFooter>
		</footer>
	);
};

export default Footer;
