import React from "react";
import styled from "styled-components";

import SubNavButton from "../../components/common/SubNavButton";

import kimhyosoo from "../../static/images/KimHyoSoo.png";

const StyledFounderPage = styled.main`
	display: flex;
	justify-content: center;
	padding: 20px;
`;

const StyledFounderWrapper = styled.div`
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	padding: 30px 80px;
	width: 1230px;
`;

const StyledSubNav = styled.nav`
	display: flex;
	justify-content: center;
	margin-bottom: 30px;
`;

const StyledFounderProfile = styled.div`
	display: flex;

	& > div {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	& > h2 {
		font-size: 30px;
	}

	& > img {
		margin-right: 50px;
	}

	& p {
		padding-left: 10px;
	}
`;

const StyledFounderContent = styled.p`
	font-size: 16px;
`;

const FounderPage = () => {
	return (
		<StyledFounderPage>
			<StyledFounderWrapper>
				<StyledSubNav>
					<SubNavButton
						href="/introduction/founder"
						text="설립자 소개"
						isSelect={true}
					></SubNavButton>
					<SubNavButton
						href="/introduction/message"
						text="이사장 인사"
						isSelect={false}
					></SubNavButton>
					<SubNavButton
						href="/introduction/mission_and_history"
						text="설립 취지 및 연혁"
						isSelect={false}
					></SubNavButton>
					<SubNavButton
						href="/introduction/orgchart_and_project"
						text="조직도 및 주요사업"
						isSelect={false}
					></SubNavButton>
				</StyledSubNav>
				<StyledFounderProfile>
					<img src={kimhyosoo} alt="김효수 교수" height="300px" />
					<div>
						<h2>
							<span>김효수</span> 교수
						</h2>
						<p>
							서울대학교병원 의생명연구원장
							<br />
							세포치료실용화센터장
							<br />
							서울대학교 의과대학 내과학 교수
							<br />
							제1대 재단법인 미래의학연구재단 이사장
						</p>
						<h4>Education</h4>
						<p>1978 - 1984 서울대학교 의예과~의과대학</p>
						<h4>Awards</h4>
						<p>
							2016 대한민국 녹조근정훈장 수훈 (보건복지부 우수연구 훈격
							상신-대통령수여)
							<br />
							2014 제 24회 분쉬의학상 본상 (대한의학회)
							<br />
							2008 제1회 아산의학상 (아산사회복지재단)
						</p>
					</div>
				</StyledFounderProfile>
				<br />
				<br />
				<StyledFounderContent>
					김효수 교수는 1978년 서울대학교의예과에 입학한 후, 1984년 의사로서
					첫발을 내디딘 40년 경력의 임상의사인 동시에, 1992년부터 기초연구에
					입문하여 30년에 이르는 생명과학자입니다. 서울대학교병원 의생명연구원
					연구원장으로서, 임상의사인 동시에 기초연구를 함께 수행하고 있습니다.
					김효수 교수는 “심혈관 ・줄기세포・생물학” 분야에만 꾸준히 매진하여
					독창적인 다수의 연구결과를 도출하였고, 이를 실용화하기 위해서 집중한
					결과 실용화 성과도 도출하면서 과학입국의 꿈을 구현하고 있습니다.
					26년전에 일본 동경대학 의학부에서 유학하면서 당시 새로운 분야이었던
					심혈관 분자생물학을 국내에 도입한 개척자로서, 18년전에는
					유전자치료/줄기세포 연구의 메카였던 미국 보스턴의 성-엘리자베스 병원의
					심혈관 연구소에서 유전자/세포 생물학 기초연구에 몰두하였습니다. 즉
					임상의사로서는 유래가 드물게 4년 동안 기초실험을 직접 수행한
					생물학자로서, translational research를 실현한 뚝심 있는 의학자입니다.
					<br />
					26년간 “심혈관・줄기세포・생물학” 분야에만 매진하면서 거둔 연구의
					업적은 줄기세포 생물학의 독창적인 기초연구 성과를 진료 현장에 도입해
					심근경색 치료법인 ‘매직셀’이라는 혁신의료기술을 확립했다. 또
					세포생물학 연구를 바탕으로 심근 재생을 위한 세포유전자 치료법 및
					대사질환·지방간 치료법 개발, 패혈증 치료제 개발 등에서 괄목할만한
					성과를 도출하였습니다. 연구실적에서도 그의 논문들의 피인용 회수
					총합계가 3만7천여 회를 상회하며, 그 동안 Lancet, Cell Stem Cell,
					European Heart J, Circulation, Cell Metabolism, J Am College
					Cardiology, Blood, Cell Research, EMBO J 등 임팩트팩터가 10이상인
					잡지에 출판한 논문의 수가 155여편에 달하며, H-INDEX가 92에 도달하고
					있습니다.
					<br />
					김효수 교수는 탁월한 연구 성과를 인정받아서 2008년도 1회 아산의학상
					대상을 수여하였고, 2014년도에 분쉬의학상 본상을 수상하였으며,
					수훈내용이 탁월한 연구성과로서는 처음으로 2016년 대통령 훈장인
					근정훈장을 수상하였습니다.
					<br />
					김효수 교수는 줄기세포생물학과 분자생물학을 기반으로 개발한 의학 및
					생명과학 분야의 원천 기술의 실용화를 위하여 2007년 줄기세포 치료제
					개발을 목표로 ‘세포치료사업단’을 10년간 성공적으로 운영한 이후에
					‘중증난치질환 극복을 위한 세포치료 실용화센터’를 이끌고 있으며, 동시에
					‘연구중심병원사업의 바이오치료제 개발’ 육성유니트 지휘자로서
					바이오산업의 활성화를 위한 기초/상용화 연구에 몰두하고 있습니다.
					김교수는 이러한 경험을 바탕으로 2016년에 과학기술정보통신부 소관
					비영리법인인 재단법인 미래의학연구재단을 설립하였습니다.
					<br />
					재단을 통해 대한민국 첨단 바이오 헬스 분야에 건강한 연구생태계를
					조성하고, 연구자 중심 창업지원, 산학연병간 오픈이노베이션 활성화를
					통하여 대한민국 미래성장 동력 발굴에 이바지하고자 합니다.
					<br />
				</StyledFounderContent>
			</StyledFounderWrapper>
		</StyledFounderPage>
	);
};

export default FounderPage;
