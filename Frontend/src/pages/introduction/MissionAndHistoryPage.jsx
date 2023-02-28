import React from "react";
import styled from "styled-components";

import Page from "../../components/common/Page";
import SubNav from "../../components/introduction/SubNav";
import BlankDiv from "../../components/common/BlankDiv";
import Message from "../../components/common/Message";
import Portrait from "../../components/common/Portrait";

const StyledMissionWrapper = styled.div`
	& div {
		padding: 10px;
	}
`;

const StyledChairmanWrapper = styled.div`
	& > div {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
`;

const StyledHistoryWrapper = styled.div``;

const MissionAndHistoryPage = () => {
	return (
		<Page>
			<SubNav select="설립 취지 및 연혁" />
			<StyledChairmanWrapper>
				<h1>역대 이사장</h1>
				<div>
					<Portrait
						src="/images/Chairmans/김효수.png"
						alt="김효수"
						name="제1대 김효수"
						description={[
							"서울대학교병원 의생명연구원장",
							"서울대학교병원 순환기내과 교수",
						]}
					/>
					<Portrait
						src="/images/Chairmans/한상대.png"
						alt="한상대"
						name="제2대 한상대"
						description={[
							"한상대법률사무소 변호사",
							"제38대 대검찰청 검찰총장",
							"고려대학교 법학전문대학원 특임교수",
						]}
					/>
					<Portrait
						src="/images/Chairmans/전승호.png"
						alt="전승호"
						name="제3대 전승호"
						description={[
							"대웅제약 대표이사",
							"대한약학회 이사",
							"KAIST 융합의과학원 자문위원",
							"한국신약개발연구조합 이사",
						]}
					/>
				</div>
			</StyledChairmanWrapper>
			<br />
			<br />
			<StyledMissionWrapper>
				<h1>설립취지</h1>
				<div>
					<Message>
						<span>첫째</span>, 미래의학을 선도할 유망 기술 연구 동향을
						정기적으로 면밀히 조사하고 그 정보를 적기에 공급함으로써, 대한민국
						의학 연구수준을 세계적인 수준으로 높이는 계기를 만들어갈 것입니다.
						<BlankDiv height="30px" />
						<span>둘째</span>, 창의적 아이디어가 환자에게까지 적용될 수 있도록,
						신개념의 기초의학 연구와 이를 활용한 융복합연구를 발굴 수행해 나갈
						것입니다. 즉, 세포생물학과 나노바이오테크놀로지를 융합한 미래융합형
						연구를 선도함과 동시에 이로부터 도출된 첨단 치료법 혹은 신치료기기를
						환자에 적용하는 것을 촉진하도록 하겠습니다.
						<BlankDiv height="30px" />
						<span>셋째</span>, 이러한 융복합 연구를 창의적으로 구현할 유망한
						의과학자를 지원 육성할 것입니다.
						<BlankDiv height="30px" />
						<span>넷째</span>, 혁신적 연구아이디어와 개발된 기술이 효율적으로
						확산되도록 연구 및 창업 생태계를 조성하고 발전시켜 나갈 것입니다.
						<BlankDiv height="30px" />
						궁극적으로 이 재단을 통해서, 뛰어난 아이디어와 기술을 적기에
						공유하고, 개발된 신치료 기술을 효과적으로 전파할 수 있는 연구 및
						창업 생태계를 발전시킴으로써, 양질의 의료를 국민에게 공급하여
						대한국민 보건의료의 발전을 추구하고자 합니다.
					</Message>
				</div>
			</StyledMissionWrapper>
			<br />
			<StyledHistoryWrapper>
				<h1>연혁</h1>
				<HistoryItem
					year="2022"
					items={[
						"6th International Forum on Medical Innovation of Cell & Bio Therapy 개최",
						"2022 3rd Bio-Venture Competition & Congress 개최",
						"재단법인 미래의학연구재단 최신동향보고서 vol.12 발간",
						"중소벤처기업부 창업기획자 등록(등록일:2022년 5월 23일)",
						"제6회 미래의학춘계포럼 : 차세대 바이오 혁신 기술의 최신 동향과 비전 개최",
						"기획재정부 지정기부금단체 재지정(기간 : 2022.1.1.~2027.12.31)",
					]}
				/>
				<HistoryItem
					year="2021"
					items={[
						"재단법인 미래의학연구재단 최신동향보고서 vol.11 발간",
						"재단법인 미래의학연구재단 연구발굴지원사업 지원자 선정",
						"5th International Forum on Medical Innovation of Cell & Bio Therapy 개최",
						"재단법인 미래의학연구재단 상표 등록(등록일 : 2021년 10월 28일)",
						"2021 2nd Bio-Venture Competition & Congress 개최",
						"재단법인 미래의학연구재단 최신동향보고서 vol.10 발간",
						"FMI Business School 개강",
						"미래의학 생명과학 분야의 연구 발굴 및 창업 생태계 구축 시스템 특허 등록(등록일 : 2021년 3월 11일)",
						"제5회 미래의학춘계포럼 : 차세대 바이오 혁신 기술의 최신 동향과 비전 개최",
					]}
				/>
				<HistoryItem
					year="2020"
					items={[
						"재단법인 미래의학연구재단 최신동향보고서 vol.09 발간",
						"4th International Forum on Medical Innovation Cell & Bio Therapy 개최",
						"Bio-Venture Competition&Congress 2020 개최",
						"재단법인 미래의학연구재단 최신동향보고서 vol.08 발간",
						"재단법인 미래의학연구재단 연구발굴지원사업 지원자 선정",
						"제4회 미래의학춘계포럼 : 차세대 바이오 혁신 기술의 최신 동향과 비전 개최",
					]}
				/>
				<HistoryItem
					year="2019"
					items={[
						"제2회 후원인의 밤 개최",
						"재단법인 미래의학연구재단 최신동향보고서 vol.07 발간",
						"3rd International Forum on Medical Innovation of Cell & Bio Therapy 개최",
						"재단법인 미래의학연구재단 최신동향보고서 vol.06 발간",
						"제3회 미래의학춘계포럼 : 혁신적 첨단바이오의약품 개발의 현주소 개최",
					]}
				/>
				<HistoryItem
					year="2018"
					items={[
						"제1회 후원인의 밤 개최",
						"재단법인 미래의학연구재단 최신동향보고서 vol.05 발간",
						"재단법인 미래의학연구재단 제 1회 장학금 전달식",
						"2nd International Forum on Medical Innovation of Cell & Bio Therapy 개최",
						"재단법인 미래의학연구재단 최신동향보고서 vol.04 발간",
						"제2회 미래의학춘계포럼 : 바이오치료법 개발의 현주소 개최",
					]}
				/>
				<HistoryItem
					year="2017"
					items={[
						"재단법인 미래의학연구재단 최신동향보고서 vol.03 발간",
						"1st International Forum on Medical Innovation of Cell & Bio Therapy 개최",
						"재단법인 미래의학연구재단 연구발굴지원사업 지원자 선정",
						"재단법인 미래의학연구재단 최신동향보고서 vol.02 발간",
						"제1회 미래의학생명과학 춘계포럼 개최",
					]}
				/>
				<HistoryItem
					year="2016"
					items={[
						"재단법인 미래의학연구재단 설립",
						"녹조근 정훈장 수상(김효수 교수)",
						"골수의 최상위조혈줄기세포의 유지기전 Kai1 최초 규명 (Cell Stem Cell지에 보고), 골수이식 향상법 개발 개시",
						"주식회사 대웅제약에 간질환 치료용 줄기세포 조성물 기술 이전",
						"재단법인 미래연구의학재단 최신동향보고서 vol.01 발간",
					]}
				/>
				<HistoryItem
					year="2015"
					items={[
						"국가 연구개발 우수성과 선정",
						"미래창조과학부 줄기세포 선도 연구팀으로 최종 등극",
					]}
				/>
				<HistoryItem
					year="2014"
					items={[
						"제24회 분쉬의학상 본상 수상(김효수교수)",
						"두산연강학술상 의학논문부분 단독수상(이사민 교수)",
						"리지스틴 수용체 cap1 세계최초로 발견 (Cell Metabolism지에 보고), 대사증후군 기전 규명, 치료제 개발 개시심근경색증 세포치료법 매직셀 프로토콜, 보건복지부인정 상용화개시",
					]}
				/>
				<HistoryItem
					year="2013"
					items={[
						"제23회 분쉬의학상 젊은 의학자상(박경우 교수)",
						"미래창조과학부 줄기세포 우수 연구팀으로 격상",
						"대웅제약에 배아줄기세포유래-중간엽줄기세포 기술 이전",
					]}
				/>
				<HistoryItem
					year="2010"
					items={[
						"미래창조과학부 줄기세포 유망 연구팀 선정",
						"CJ 제일제당 주식회사에 심혈관 질환 치료용 줄기세포치료제 기술이전",
					]}
				/>
				<HistoryItem
					year="2009"
					items={[
						"과학기술부지정 World-Class University 프로그램 선정, MMBS 학과 창설",
					]}
				/>
				<HistoryItem
					year="2008"
					items={[
						"LG 생명과학과 세포치료제 공동 연구 및 상용화 과제 발굴 (MOU) 체결",
						"제1회 아산의학상 대상 수상(김효수교수)",
					]}
				/>
				<HistoryItem
					year="2007"
					items={[
						"관동맥스텐트 재발방지법 최초개발 Lancet지에 발표",
						"보건복지부지정 혁신형 세포치료사업단 선정, IRICT 출범",
					]}
				/>
				<HistoryItem
					year="2006"
					items={[
						"제 1회 연강학술상(윤창환 교수), 분쉬의학상 젊은 연구자상 임상부문(강현재 교수)",
						"국가 연구개발 우수성과 선정",
					]}
				/>
				<HistoryItem
					year="2004"
					items={[
						"과학기술부지정 국가지정연구실 선정",
						"매직셀 연구 최초 결과 Lancet지에 발표",
					]}
				/>
				<HistoryItem
					year="2003"
					items={["심근경색증 세포치료법 매직셀 연구 시작"]}
				/>
				<HistoryItem
					year="2002"
					items={[
						"보건복지부 지원 우수핵심과제 선정과 동시에 줄기세포연구에 돌입함",
					]}
				/>
				<HistoryItem
					year="2000~2002"
					items={[
						"김효수교수 미국보스턴 성엘리자베스병원 연구소; 유전자-세포치료 기초연구",
					]}
				/>
				<HistoryItem
					year="1994~2000"
					items={["죽상동맥경화증 병태생리 규명 연구 수행"]}
				/>
				<HistoryItem
					year="1994"
					items={["김효수교수 일본연수 귀국 후 심혈관 연구실 설립"]}
				/>
				<HistoryItem
					year="1992~1994"
					items={["김효수교수 일본동경대학3내과 분자생물학 연수"]}
				/>
			</StyledHistoryWrapper>
		</Page>
	);
};

const StyledHistoryItem = styled.div`
	border: 1px solid #e1e1e1;
	border-radius: 5px;
	& h3 {
		font-weight: 400;
		padding: 10px 20px;
		background-color: #f7f7f7;
		color: #224099;
	}

	& div {
		padding: 20px;
	}

	& + & {
		margin-top: 16px;
	}
`;

const HistoryItem = ({ year, items }) => {
	return (
		<StyledHistoryItem>
			<h3>{year}년</h3>
			<div>
				{items.map((item, index) => {
					return <p key={index}>{item}</p>;
				})}
			</div>
		</StyledHistoryItem>
	);
};

export default MissionAndHistoryPage;
