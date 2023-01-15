import React from "react";
import styled from "styled-components";

import Page from "../../components/common/Page";
import SubNav from "../../components/programs/SubNav";
import Message from "../../components/common/Message";
import BlankDiv from "../../components/common/BlankDiv";

const StyledTimelineWrapper = styled.div``;

const StyledTimelineItem = styled.div`
	margin-left: 32px;
	padding: 48px 32px 32px;
	position: relative;
	color: #204397;
	border-left: 2px solid #204397;

	p {
		font-size: 16px;
	}

	&::before {
		position: absolute;
		left: 2em;
		font-weight: bold;
		top: 1em;
		display: block;
		font-family: "Roboto", sans-serif;
		font-weight: 700;
		font-size: 0.785rem;
		content: "${(props) => props.date}";
	}

	&::after {
		width: 10px;
		height: 10px;
		display: block;
		top: 1em;
		position: absolute;
		left: -7px;
		border-radius: 10px;
		content: "";
		border: 2px solid #204397;
		background: white;
	}

	&:last-child {
		border-image: linear-gradient(
				to bottom,
				#204397,
				#204397,
				#204397,
				#204397,
				#ffffff
			)
			1 100%;
	}
`;

const StyledJoinProgram = styled.div`
	display: flex;
	flex-direction: column;

	& > div {
		padding-left: 32px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	& > div + div {
		margin-top: 20px;
	}

	& h4 {
		font-size: 20px;
		margin-bottom: 10px;
	}

	& p {
		font-size: 16px;
		padding-left: 10px;
	}
`;

const ResearchSupportProjectPage = () => {
	return (
		<Page>
			<SubNav select="연구발굴지원사업"></SubNav>
			<Message>
				재단은 미래의학생명과학을 창조적으로 변모시킬 수 있는 혁신적인 개념과
				형태를 갖춘 도전적인 연구를 발굴하여 사업을 지원합니다. 구체적으로 연구
				과제를 특정 하는 것이 아니라, 기초-중개-융복합연구를 망라하는 형태의
				새로운 실험들을 폭넓게 발굴할 것입니다.
			</Message>
			<StyledTimelineWrapper>
				<h1>지원과제</h1>
				<StyledTimelineItem date="2021">
					<p>
						섬유화 치료효능 검증 플랫폼 구축을 통한 재생 의료활성화 방안 개발
					</p>
				</StyledTimelineItem>
				<StyledTimelineItem date="2020">
					<p>히스톤 리더 단백질인 PHF6의 줄기 세포 분화에서의 기능 연구</p>
				</StyledTimelineItem>
				<StyledTimelineItem date="2017">
					<p>위장관 미생물 정보의 통합 분석을 통한 심혈관 질환 예방법의 개발</p>
				</StyledTimelineItem>
				<StyledTimelineItem date="2017">
					<p>
						화합물 (Cocktail N)을 이용한 줄기세포 기반 심근세포 분화효율 및
						성숙도 증진 기작 연구
					</p>
				</StyledTimelineItem>
				<StyledTimelineItem date="2017">
					<p>
						인간 섬유 모세포에서 혈관내피 세포로의 선별된 인자들에 의한 이형분화
					</p>
				</StyledTimelineItem>
				<StyledTimelineItem date="2017">
					<p>혈관세포의 KAI1 enriched exosome 분비기전과 특성 분석 연구</p>
				</StyledTimelineItem>
			</StyledTimelineWrapper>
			<BlankDiv height="50px" />
			<StyledJoinProgram>
				<h1>신청 안내</h1>
				<div>
					<h4>신청요건</h4>
					<p>연구책임자 : 국내 소재 기관 소속의 내국인</p>
					<p>국내 대학 교원(전임, 비전임) 및 부설 연구소 연구원</p>
					<p>기업부설연구소(연구개발전담부서 포함) 연구원</p>
				</div>
				<div>
					<h4>신청분야</h4>
					<p>줄기세포생물학 기반의 기초연구 분야</p>
					<p>나노바이오테크놀로지 기반의 첨단기기약물 융복합분야</p>
					<p>빅데이터 또는 AI를 활용한 보건의료분야</p>
					<p>기타 미래의학생명과학 첨단 바이오 의약품 / 의료기기 분야</p>
				</div>
				<div>
					<h4>접수 기간</h4>
					<p>상시모집</p>
				</div>
				<div>
					<h4>제출 서류</h4>
					<p>신청서 표지 (양식1)</p>
					<p>연구계획서 (양식2)</p>
					<p>관련분야 전문가 추천서 (양식3)</p>
					<p>기타 증빙서류</p>
					<p>평가 및 선발방법</p>
				</div>
			</StyledJoinProgram>
		</Page>
	);
};

export default ResearchSupportProjectPage;
