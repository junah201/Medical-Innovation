import React, { useEffect } from "react";
import styled from "styled-components";

import BlankDiv from "../common/BlankDiv";

import preregistrationStatus from "../../static/images/사전등록현황.png";

const StyledMainLeftGrid = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: 335px 300px;
	grid-gap: 10px;

	@media screen and (max-width: 991px) {
		width: 100vw;
		margin: 10px;
	}
	@media screen and (min-width: 992px) {
		width: 50%;
	}
`;

const StyledTopGridItem = styled.div`
	background-color: #ffffff;
	grid-column: 1 / 3;
	grid-row: 1 / 2;
	padding: 15px;

	& > li {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		list-style-type: none;
	}

	& button {
		font-weight: 600;
	}

	@media screen and (max-width: 350px) {
		& button {
			font-size: 12px;
		}
	}
	@media screen and (min-width: 351px) and (max-width: 991px) {
		& button {
			font-size: 16px;
		}
	}
	@media screen and (min-width: 992px) {
		& button {
			font-size: 20px;
		}
	}
`;

const StyledTopGridButton = styled.button`
	font-size: 25px;
	font-weight: 600;
	color: ${(props) => props.color || "#838383"};
	border: none;
	background-color: transparent;
`;

const StyledBottomItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& > div {
		width: 100%;
		height: 265px;
		overflow: hidden;
	}

	& > div > img {
		width: 100%;
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

const StyledDocumentWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 262px;
`;

const MainLeftGrid = () => {
	const [selcted, setSelected] = React.useState("공지사항");
	const [posts, setPosts] = React.useState([]);

	useEffect(() => {
		fetch(`http://127.0.0.1:8000/api/v1/post/2/all?limit=6`, {
			method: "GET",
			headers: {
				accept: "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					setPosts(data.posts);
					console.log(data);
				});
			}
		});
	}, []);

	const onClickHandler = (e) => {
		setSelected(e.target.innerText);
	};

	return (
		<StyledMainLeftGrid>
			<StyledTopGridItem>
				<li>
					<ol>
						<StyledTopGridButton
							onClick={onClickHandler}
							color={selcted === "공지사항" ? "#000000" : "#838383"}
						>
							공지사항
						</StyledTopGridButton>
					</ol>
					<ol>
						<StyledTopGridButton
							onClick={onClickHandler}
							color={selcted === "보도자료" ? "#000000" : "#838383"}
						>
							보도자료
						</StyledTopGridButton>
					</ol>
					<ol>
						<StyledTopGridButton
							onClick={onClickHandler}
							color={selcted === "네트워크" ? "#000000" : "#838383"}
						>
							네트워크
						</StyledTopGridButton>
					</ol>
					<ol>
						<StyledTopGridButton
							onClick={onClickHandler}
							color={selcted === "자료실" ? "#000000" : "#838383"}
						>
							자료실
						</StyledTopGridButton>
					</ol>
					<ol>
						<StyledTopGridButton
							onClick={onClickHandler}
							color={selcted === "재단성격" ? "#000000" : "#838383"}
						>
							재단성격
						</StyledTopGridButton>
					</ol>
				</li>
				<BlankDiv height="20px" />
				{selcted === "공지사항" ? (
					<>
						{posts.map((post, index) => {
							return (
								<PostItem
									link={`/post/${post.id}`}
									title={post.title}
									date={post.created_at}
									index={index + 1}
								/>
							);
						})}
					</>
				) : null}
				{selcted === "재단성격" ? (
					<StyledDocumentWrapper>
						<DocumentItem
							src="/images/Foundation/비영리법인설립허가증.png"
							alt="비영리법인설립허가증"
						/>
						<DocumentItem
							src="/images/Foundation/창업기획자 등록증.png"
							alt="창업기획자 등록증"
						/>
						<DocumentItem
							src="/images/Foundation/지정기부금단체 지정고시 통지서.png"
							alt="지정기부금단체 지정고시 통지서"
						/>
						<DocumentItem
							src="/images/Foundation/특허증 (1차).png"
							alt="특허증 (1차)"
						/>
						<DocumentItem
							src="/images/Foundation/특허증 (2차).png"
							alt="특허증 (2차)"
						/>
						<DocumentItem
							src="/images/Foundation/출원사실증면원 (3차).png"
							alt="출원사실증면원 (3차)"
						/>
					</StyledDocumentWrapper>
				) : null}
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

const StyledPostItem = styled.a`
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	color: #000000;

	&:visited {
		color: #000000;
	}

	&:hover {
		background-color: #f5f5f5;
	}

	& + & {
		border-top: 1px solid #e9ecef;
	}
`;

const StyledPostItemIndex = styled.span`
	width: 10%;
	text-align: center;

	@media screen and (max-width: 991px) {
		font-weight: 500;
	}
	@media screen and (min-width: 992px) {
	}
`;

const StyledPostItemTitle = styled.span`
	width: 70%;
	font-size: 16px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	&:hover {
		text-decoration: underline;
	}

	@media screen and (max-width: 991px) {
	}
	@media screen and (min-width: 992px) {
	}
`;

const StyledPostItemDate = styled.span`
	width: 20%;
	text-align: center;
	justify-content: center;
	font-size: 12px;

	@media screen and (max-width: 991px) {
		font-size: 8px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	@media screen and (min-width: 992px) {
	}
`;

const PostItem = ({ title, link, index, date }) => {
	date = new Intl.DateTimeFormat("kr", {}).format(new Date(date));

	return (
		<StyledPostItem href={link} target="_blank" rel="noopener noreferrer">
			<StyledPostItemIndex>{index}.</StyledPostItemIndex>
			<StyledPostItemTitle>{title}</StyledPostItemTitle>
			<StyledPostItemDate>{date}</StyledPostItemDate>
		</StyledPostItem>
	);
};

const StyledDocumentItem = styled.a`
	overflow: hidden;
	width: 123px;
	height: 175px;
	border: 1px solid #000000;

	& img {
		width: 123px;
		height: 175px;
		object-fit: cover;
	}

	&:hover img {
		transform: scale(1.1);
		transition: transform 0.5s;
	}
`;

const DocumentItem = ({ src, alt }) => {
	return (
		<StyledDocumentItem href={src} target="_blank" rel="noopener noreferrer">
			<img src={src} alt={alt} />
		</StyledDocumentItem>
	);
};

export default MainLeftGrid;
