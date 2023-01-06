import React from "react";
import styled from "styled-components";

import kimhyosoo from "../../static/images/KimHyoSoo.png";
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
	& div > img + img {
		margin-top: 12px;
	}
`;

const MainLeftGrid = () => {
	return (
		<StyledGrid>
			<StyledGridImgItem>
				<a href="/introduction/founder">
					<img src={kimhyosoo} width="250px" alt="김효수" />
				</a>
			</StyledGridImgItem>
			<StyledGridItem color="#2763BA">
				<h3>후원 안내</h3>
				<p>
					대한민국 보건의료의 발전을 추구하시는 여러분 모두가 후원자가 되어
					주십시오.
				</p>
				<a href="/support/support">후원하기</a>
				<a href="/support/sponsors">후원인 명단</a>
			</StyledGridItem>
			<StyledGridItem color="#2CA48F">
				<h3>재단 소개</h3>
				<p>
					과기부 소관 비영리법인 중소벤처기업부 창업기획자 기획재정부
					지정기부금단체
				</p>
				<a href="/support/sponsor">협력기관</a>
			</StyledGridItem>
			<StyledGridItem color="#008ACE">
				<h3>FMI 인베스트먼트</h3>
				<p>바이오헬스 혁신기업의 지속 가능한 성장과 미래</p>
				<a href="/support/sponsor">유관그룹</a>
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
						<br />
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
						<br />
						서울대병원
						<br />
						심혈관연구실
					</a>
				</div>
				<div>
					<a href="http://www.celltherapy.re.kr/">
						<img src={snuh} width="50px" height="50px" alt="순환기내과 TAVI" />
						<br />
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
						<br />
						순환기내과
						<br />
						매직셀
					</a>
				</div>
				<div>
					<img
						src={youtube}
						width="45px"
						height="45px"
						alt="미래의학연구재단 유튜브"
					/>
					<img
						src={facebook}
						width="45px"
						height="45px"
						alt="미래의학연구재단 페이스북"
					/>
				</div>
			</StyledGridBottomItem>
		</StyledGrid>
	);
};

export default MainLeftGrid;
