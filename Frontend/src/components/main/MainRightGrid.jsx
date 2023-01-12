import React from "react";
import styled from "styled-components";

import BlankDiv from "../common/BlankDiv";

import preregistrationStatus from "../../static/images/사전등록현황.png";

const StyledMainLeftGrid = styled.div`
	display: grid;
	grid-template-columns: 390px 390px;
	grid-template-rows: 335px 300px;
	grid-gap: 30px;
`;

const StyledTopGridItem = styled.div`
	background-color: #ffffff;
	grid-column: 1 / 3;
	grid-row: 1 / 2;
	padding: 20px;

	& > li {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		list-style-type: none;
	}

	& > li > ol > button {
		font-size: 25px;
		font-weight: 600;
		color: ${(props) => props.color || "#838383"};
		border: none;
		background-color: transparent;
	}
`;

const StyledBottomItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& > div {
		width: 100%;
		height: 265px;
	}

	& > h3 {
		font-size: 20px;
		font-weight: 800;
	}
`;

const StyledStartupWrapper = styled.div`
	background-color: #ffffff;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-gap: 5px;
	padding: 6px;
`;

const StyledStartupContainer = styled.div`
	width: 100%;
	height: 100%;
	padding: 4px;
	overflow: hidden;
	border: 1px solid #e1e1e1;
	background-color: #ffffff;
	color: #000000;

	& a:visited {
		color: #000000;
	}

	& > a > span {
		font-size: 16px;
		font-weight: 600;
	}

	& > a > p {
		font-size: 12.5px;
	}
`;

const MainLeftGrid = () => {
	return (
		<StyledMainLeftGrid>
			<StyledTopGridItem>
				<li>
					<ol>
						<button>공지사항</button>
					</ol>
					<ol>
						<button>행사안내</button>
					</ol>
					<ol>
						<button>보도자료</button>
					</ol>
					<ol>
						<button>네트워크</button>
					</ol>
					<ol>
						<button>자료실</button>
					</ol>
				</li>
			</StyledTopGridItem>
			<StyledBottomItem>
				<h3>스타트업 지원</h3>
				<StyledStartupWrapper>
					<StyledStartupContainer>
						<a
							href="http://www.cellco.co.kr"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span>주식회사 셀코</span>
							<BlankDiv height="5px" />
							<p>해양 플랑크톤을 이용한 뼈이식재 제조기술 사업화</p>
						</a>
					</StyledStartupContainer>
					<StyledStartupContainer>
						<a
							href="http://thedonee.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span>㈜더도니</span>
							<BlankDiv height="5px" />
							<p>만성신장질환자들을 위한 자가칼륨측정기 개발</p>
						</a>
					</StyledStartupContainer>
					<StyledStartupContainer>
						<a
							href="http://fintkorea.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span>㈜파인트코리아</span>
							<BlankDiv height="5px" />
							<p>의료용 소재 맞춤제작을 위한 생분해성 복합소재 제조</p>
						</a>
					</StyledStartupContainer>
					<StyledStartupContainer>
						<a
							href="http://www.cellco.co.kr"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span>㈜포투가바이오</span>
							<BlankDiv height="5px" />
							<p>
								나노입자-세포화 기술과 단백질 결합 기술을 융합한 면역항암 플랫폼
								개발
							</p>
						</a>
					</StyledStartupContainer>
					<StyledStartupContainer>
						<a
							href="https://fitme3d.kr"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span>주식회사 핏미</span>
							<BlankDiv height="5px" />
							<p>
								AI 기반 성형수술용 의료영상 분석 및 맞춤 보형물 디자인 서비스를
								제공하는 가상성형 플랫폼
							</p>
						</a>
					</StyledStartupContainer>
					<StyledStartupContainer>
						<a href="/" target="_blank" rel="noopener noreferrer">
							<span>엘리펀트</span>
							<BlankDiv height="5px" />
							<p>소작기용 탈부착식 액체 기체 흡입기</p>
						</a>
					</StyledStartupContainer>
				</StyledStartupWrapper>
			</StyledBottomItem>
			<StyledBottomItem>
				<h3>산업분야별 참여 현황</h3>
				<div>
					<img
						src={preregistrationStatus}
						alt="산업분야별 참여 현황"
						width="390px"
						height="265px"
					></img>
				</div>
			</StyledBottomItem>
		</StyledMainLeftGrid>
	);
};

export default MainLeftGrid;
