import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Desktop } from "../responsive/responsive";

import BlankDiv from "../common/BlankDiv";

import cellTherapy from "../../static/images/세포치료실용화센터.png";
import cardiovascularLab from "../../static/images/서울대병원심혈관연구실.png";
import snuh from "../../static/images/서울대병원.png";
import youtube from "../../static/images/youtube.png";
import facebook from "../../static/images/facebook.png";

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 250px);
	grid-template-rows: 250px 250px 125px;
	grid-gap: 20px;
`;

const StyledGridImgItem = styled.div`
	background-color: "#ffffff";
	overflow: hidden;
	overflow: hidden;

	&:hover img {
		transform: scale(1.1);
		transition: transform 0.5s;
	}
`;

const StyledGridItem = styled.div`
	background-color: ${(props) => props.color || "#ffffff"};
	padding: 20px;

	& h3 {
		height: 60px;
		font-size: 20px;
		font-weight: 500;
		color: #ffffff;
	}

	& p {
		height: 128px;
		font-size: 15px;
		color: #ffffff;
		word-break: keep-all;
	}

	& a {
		color: #ffffff;
		text-decoration: none;
		border: 1px solid #ffffff;
		padding: 5px 9px;
	}

	& a:hover {
		text-decoration: underline;
	}

	& a + a {
		margin-left: 16px;
	}
`;

const StyledGridBottomItem = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	grid-column: 1 / 3;
	grid-row: 3 / 4;
	background-color: ${(props) => props.color || "#ffffff"};

	& a:link,
	a:visited {
		color: #000000;
	}

	& div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	& > div > a {
		font-size: 15px;
		font-weight: 600;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	& > div:hover > a {
		text-decoration: underline;
	}
`;

const MainLeftGrid = () => {
	return (
		<Desktop>
			<StyledGrid>
				<StyledGridImgItem
					style={{
						backgroundColor: "#FFFFFF",
					}}
				>
					<div
						style={{
							backgroundColor: "#FFFFFF",
						}}
					>
						<Link to="/introduction/founder">
							<img
								src="/images/Chairmans/김효수.png"
								width="250px"
								alt="김효수"
							/>
						</Link>
					</div>
				</StyledGridImgItem>
				<StyledGridItem color="#2763BA">
					<h3>재단 소개</h3>
					<p>
						과기부 소관 비영리법인 중소벤처기업부 창업기획자 기획재정부
						지정기부금단체
					</p>
					<Link to="/mou">협력기관</Link>
					<Link to="/advisory_group">임원현황</Link>
				</StyledGridItem>
				<StyledGridItem color="#2CA48F">
					<h3>FMI 벤처투자조합</h3>
					<p>바이오헬스 혁신기업의 지속 가능한 성장과 미래</p>
					<Link to="/preparing">바로가기</Link>
				</StyledGridItem>
				<StyledGridItem color="#008ACE">
					<h3>후원 안내</h3>
					<p>
						대한민국 보건의료의 발전을 추구하시는 여러분 모두가 후원자가 되어
						주십시오.
					</p>
					<Link to="/support/sponsorship">후원하기</Link>
					<Link to="/support/sponsor">후원기업</Link>
				</StyledGridItem>
				<StyledGridBottomItem>
					<div>
						<a href="http://www.celltherapy.re.kr/">
							<img
								src={cellTherapy}
								width="50px"
								height="50px"
								alt="세포치료 실용화 센터"
							/>
							<BlankDiv height="10px" />
							세포치료
							<br />
							실용화 센터
						</a>
					</div>
					<div>
						<a href="https://cardiolabacting.wixsite.com/cvstemcell">
							<img
								src={cardiovascularLab}
								width="50px"
								height="50px"
								alt="서울대병원 심혈관연구실"
							/>
							<BlankDiv height="10px" />
							서울대병원
							<br />
							심혈관연구실
						</a>
					</div>
					<div>
						<a href="http://www.celltherapy.re.kr/">
							<img
								src={snuh}
								width="50px"
								height="50px"
								alt="순환기내과 TAVI"
							/>
							<BlankDiv height="10px" />
							순환기내과
							<br />
							TAVI
						</a>
					</div>
					<div>
						<a href="https://blog.naver.com/snuh_heart2">
							<img
								src={snuh}
								width="50px"
								height="50px"
								alt="순환기내과 매직셀"
							/>
							<BlankDiv height="10px" />
							순환기내과
							<br />
							매직셀
						</a>
					</div>
					<div>
						<a
							href="https://www.youtube.com/channel/UCmXV9TzHG-Ys_VxwNinfuNw"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={youtube}
								width="45px"
								height="45px"
								alt="미래의학연구재단 유튜브"
							/>
						</a>
						<BlankDiv height="10px" />
						<a
							href="https://www.facebook.com/people/%EB%AF%B8%EB%9E%98%EC%9D%98%ED%95%99%EC%97%B0%EA%B5%AC%EC%9E%AC%EB%8B%A8/100028283547245/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={facebook}
								width="45px"
								height="45px"
								alt="미래의학연구재단 페이스북"
							/>
						</a>
					</div>
				</StyledGridBottomItem>
			</StyledGrid>
		</Desktop>
	);
};

export default MainLeftGrid;
