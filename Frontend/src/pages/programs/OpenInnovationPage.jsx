import React from "react";
import styled from "styled-components";
import BlankDiv from "../../components/common/BlankDiv";

import Page from "../../components/common/Page";
import SubNav from "../../components/programs/SubNav";

const StyledInternationalForum = styled.div``;

const OpenInnovationPage = () => {
	return (
		<Page>
			<SubNav select="오픈 이노베이션"></SubNav>
			<StyledInternationalForum>
				<h1>학술 및 국제교류</h1>
				<p>
					재단은 춘추계 국내외 학술활동을 통한 첨단재생 의료/바이오 분야의 정부
					정책 및 미래 발전 방향, 인공지능을 활용한 신약 개발 분야, 연구자 중심
					바이오 벤처 사례 소개, 원격의료를 포함한 보건의료 산업 트렌드 그리고
					의료기술 사업화를 위한 IP-R&D 전략을 집중 조명하여 바이오 R&D 분야에
					개방형 혁신의 장을 제공합니다.
				</p>
			</StyledInternationalForum>
			<BlankDiv height="50px"></BlankDiv>
			<StyledInternationalForum>
				<h1>협력연계사업</h1>
				<p>
					혁신적인 연구 기술로 창업을 준비하는 연구자를 상시 지원하기 위해
					전문가 그룹 및 유관 산업 분야와 MOU 체결을 확대하고 있습니다. 혁신적인
					오픈이노베이선 플랫폼을 기반으로 바이오 스타트업 전 분야에 최신지견 및
					유망기술 정보를 공유하고 협력 네트워크를 확대하여 세계를 선도할
					연구개발 역량과 연구자 및 산업계 간 상호교류 및 협력을 촉진하여 K-Bio
					혁신을 통한 세계 바이오 산업을 선도하겠습니다.
				</p>
			</StyledInternationalForum>
		</Page>
	);
};

export default OpenInnovationPage;
