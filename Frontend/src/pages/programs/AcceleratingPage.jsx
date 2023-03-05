import React from "react";
import styled from "styled-components";
import BlankDiv from "../../components/common/BlankDiv";

import Page from "../../components/common/Page";
import SubNav from "../../components/programs/SubNav";
import Message from "../../components/common/Message";

const SyledBioVentureCompetitionContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	grid-gap: 30px;
`;

const AcceleratingPage = () => {
	return (
		<Page>
			<SubNav select="연구자 중심 창업지원" />
			<div>
				<h1>연구자 중심 창업지원</h1>
				<Message>
					재단은 미래의학 차세대 인재들의 혁신적이고 우수한 기술을 조기에
					발굴하고 창업 및 기술 사업화 활성화를 목적으로 창업(예정자) 기업에
					최적화한 맞춤형 액셀러레이팅 지원사업을 통해 이들 기업의 스케일 업 및
					재단과 협력하는 유관산업 분야의 오픈이노베이션 촉진에 기여하기 위해
					노력합니다. 신치료기술 및 신의료기기 개발은 연구개발·임상·제품
					판매까지 이어지는 기간이 길고 실패 가능성도 크기 때문에 위험도가 큰
					분야입니다. 따라서 연구자나 초기 스타트업 등에게 충분한 기회를 제공할
					인큐베이터 및 엑셀러레이터의 역할이 다른 어떤 분야보다 중요하다고 할
					수 있습니다. 재단은 유관산업분야의 다수의 이해관계자들을 적정하게
					연결하고 연구와 연구자에 대한 이해를 갖추면서도 동시에 공익적 감수성을
					갖춘 전문가 집단을 바탕으로 연구기관, 바이오 기업, 투자자 등을
					적정하게 연결할 수 있는 공익적 플랫폼으로 자리잡기 위해
					중소벤처기업부에 창업기획자 비영리법인으로 등록하고 재단의 후원사 및
					협력기관과 연대하여 유망 스타트업 발굴, 조기 기술사업화를 위한 선제적
					오픈이노베이션 촉진에 박차를 가하고 있습니다.
				</Message>
			</div>
			<BlankDiv height="50px" />
			<div>
				<h1>
					2023 1<small>th</small> StarUp Investing Forum
				</h1>
				<Message>
					<div>
						<h4>지원내용</h4>
						<p>우수기술 선발, 보육, 투자</p>
						<p>공동연구/컨설팅/멘토링 등 협렵기관과 네트워크 기반 구축</p>
						<p>온·오프라인 정기모임 등을 통한 기술정보교류 활동</p>
					</div>
					<div>
						<h4>신청기간</h4>
						<p>2023. 03. 06.(월) ~ 03. 22.(수) 18:00까지</p>
					</div>
					<div>
						<h4>신청방법</h4>
						<p>미래의학연구재단 온라인 신청</p>
						<p>
							온라인 접수 및 신청서류 제출처 : - 접수방법 : 온라인 회원가입 →
							온라인 등록 → 파일업로드(사업신청서, 계획서 등 제출서류)
						</p>
					</div>
					<div>
						<h4>신청서류</h4>
						<p>
							신청서 교부 : 사업신청서 양식, 제출서류 등은 홈페이지에서 다운로드
						</p>
						<p>신청 서류 : 사업신청서 1부, 첨부 서류 스캔 사본 각 1부</p>
					</div>
					<div>
						<p>
							<a href="https://medical-innovation.s3.ap-northeast-2.amazonaws.com/upload/%EC%97%B0%EA%B5%AC%EC%9E%90+%EC%B0%BD%EC%97%85+%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85+%EC%8B%A0%EC%B2%AD%EC%84%9C.docx">
								- 제출서류 목록
							</a>
						</p>
						<p>
							<a href="https://medical-innovation.s3.ap-northeast-2.amazonaws.com/upload/%EC%97%B0%EA%B5%AC%EC%9E%90+%EC%B0%BD%EC%97%85+%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85+%EC%8B%A0%EC%B2%AD%EC%84%9C.docx">
								- (디지털헬스 분야)사업신청서 양식
							</a>
						</p>
						<p>
							<a href="https://medical-innovation.s3.ap-northeast-2.amazonaws.com/upload/%EC%97%B0%EA%B5%AC%EC%9E%90+%EC%B0%BD%EC%97%85+%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85+%EC%8B%A0%EC%B2%AD%EC%84%9C.docx">
								- (바이오산업 분야)사업신청서 양식
							</a>
						</p>
					</div>
				</Message>
			</div>
			<BlankDiv height="50px" />
			<div>
				<h1>Bio-Venture Competition</h1>
				<SyledBioVentureCompetitionContainer>
					<WinnerItem
						year="2022"
						awardType="최우수상"
						winnerName="김희승 대표이사"
						winnerDetail="㈜드림팩"
					/>
					<WinnerItem
						year="2022"
						awardType="우수상"
						winnerName="윤성준 대표"
						winnerDetail="㈜포투가 바이오"
					/>
					<WinnerItem
						year="2022"
						awardType="장려상"
						winnerName="이인희 대표"
						winnerDetail="㈜핏미"
					/>
					<WinnerItem
						year="2021"
						awardType="최우수상"
						winnerName="서영민 대표이사"
						winnerDetail="㈜오아이디"
					/>
					<WinnerItem
						year="2021"
						awardType="우수상"
						winnerName="이규언 교수"
						winnerDetail="서울대학교병원"
					/>
					<WinnerItem
						year="2021"
						awardType="장려상"
						winnerName="최종빈 박사과정생"
						winnerDetail="한국과학기술원"
					/>
					<WinnerItem
						year="2020"
						awardType="최우수상"
						winnerName="김범수 연구교수"
						winnerDetail="전북대학교 특별사업단"
					/>
					<WinnerItem
						year="2020"
						awardType="우수상"
						winnerName="장현덕 교수"
						winnerDetail="서울대학교병원 의생명연구원"
					/>
					<WinnerItem
						year="2020"
						awardType="장려상"
						winnerName="박주찬 박사과정생"
						winnerDetail="서울대학교 약학대학"
					/>
				</SyledBioVentureCompetitionContainer>
			</div>
		</Page>
	);
};

const StyledWinnerItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid #e5e5e5;

	padding: 10px;

	& > div {
		overflow: hidden;
		width: 200px;
		height: 150px;
		border: 1px solid #e5e5e5;
	}

	& img {
		width: 200px;
		height: 150px;
	}

	& img:hover {
		transform: scale(1.2);
		transition: transform 0.5s;
	}

	& h6 {
		margin: 5px 0;
		font-size: 18px;
		font-weight: 600;
	}

	& p {
		margin: 5px 0;
		font-size: 14px;
	}

	& span {
		margin: 5px 0;
		font-size: 20px;
		font-weight: 600;
		color: #ff6b6b;
	}
`;

const WinnerItem = ({ year, awardType, winnerName, winnerDetail }) => {
	return (
		<StyledWinnerItem>
			<div>
				<img
					src={`/images/BioVentureCompetition/${year} ${awardType}.jpg`}
					alt={winnerName}
				/>
			</div>
			<h6>{winnerName}</h6>
			<p>{winnerDetail}</p>
			<span>
				{year} {awardType}
			</span>
		</StyledWinnerItem>
	);
};

export default AcceleratingPage;
