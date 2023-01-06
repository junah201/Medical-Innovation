import React from "react";
import styled from "styled-components";

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
		background-color: #ffffff;
	}

	& > h3 {
		font-size: 20px;
		font-weight: 800;
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
				<div></div>
			</StyledBottomItem>
			<StyledBottomItem>
				<h3>산업분야별 참여 현황</h3>
				<div></div>
			</StyledBottomItem>
		</StyledMainLeftGrid>
	);
};

export default MainLeftGrid;
