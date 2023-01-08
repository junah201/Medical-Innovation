import React from "react";
import styled from "styled-components";

import preregistrationStatus from "../../static/images/사전등록현황.png";

/*
import cellco from "../../static/images/cellco.png";
import thedonee from "../../static/images/thedonee.png";
import fintKorea from "../../static/images/fintkorea.png";
import fortugabio from "../../static/images/fortugabio.png";
import fitme from "../../static/images/fitme.png";
import elephant from "../../static/images/엘리펀트.png";
*/

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
	background-color: #d9d9d9;
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
	background-color: #ffffff;
	font-size: 12px;
	color: #000000;

	& a:visited {
		color: #000000;
	}

	& > a > span {
		font-size: 16px;
		font-weight: 600;
	}

	& > a > p > span {
		font-size: 14px;
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
							<br />
							<br />
							<p>
								설립일 <span>2021.01.06</span>
								<br />
								대표자 <span>김범수</span>
							</p>
						</a>
					</StyledStartupContainer>
					<StyledStartupContainer>
						<a
							href="http://thedonee.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span>㈜더도니</span>
							<br />
							<br />
							<p>
								설립일 <span>2020.09.23</span>
								<br />
								대표자 <span>이강원</span>
							</p>
						</a>
					</StyledStartupContainer>
					<StyledStartupContainer>
						<a
							href="http://fintkorea.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span>㈜파인트코리아</span>
							<br />
							<br />
							<p>
								설립일 <span>2021.01.06</span>
								<br />
								대표자 <span>김범수</span>
							</p>
						</a>
					</StyledStartupContainer>
					<StyledStartupContainer>
						<a
							href="http://www.cellco.co.kr"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span>㈜포투가바이오</span>
							<br />
							<br />
							<p>
								설립일 <span>2021.01.06</span>
								<br />
								대표자 <span>김범수</span>
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
							<br />
							<br />
							<p>
								설립일 <span>2021.01.06</span>
								<br />
								대표자 <span>김범수</span>
							</p>
						</a>
					</StyledStartupContainer>
					<StyledStartupContainer>
						<a href="/" target="_blank" rel="noopener noreferrer">
							<span>엘리펀트</span>
							<br />
							<br />
							<p>
								설립일 <span>2021.01.06</span>
								<br />
								대표자 <span>김범수</span>
							</p>
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
