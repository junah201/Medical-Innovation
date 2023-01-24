import React from "react";
import styled from "styled-components";
import BlankDiv from "../../components/common/BlankDiv";

import Page from "../../components/common/Page";
import SubNav from "../../components/programs/SubNav";
import Message from "../../components/common/Message";

const StyledInternationalForum = styled.div``;

const OpenInnovationPage = () => {
	return (
		<Page>
			<SubNav select="오픈 이노베이션"></SubNav>
			<StyledInternationalForum>
				<h1>학술 및 국제교류</h1>
				<Message>
					재단은 바이오헬스 산업분야의 산∙학∙연 유관 분야에 개방형 혁신의 장을
					제공하여 최신 동향의 지식의 확산 및 기술 실용화에 기여할 춘추계 국내외
					학술활동을 통한 미래의학생명과학 분야의 정부 정책 및 미래 발전 방향,
					인공지능을 활용한 신약 개발 분야, 연구자 중심 바이오 벤처 성공 사례
					소개, 원격의료를 포함한 보건의료 산업 트렌드 및 기술 사업화를 위한
					IP-R&D 전략 등을 집중 조명하여 기술사업화 확산을 위한 오픈이노베이션의
					장을 제공합니다. 재단은 이 행사에 사전등록한 모든 사전등록자에게 이
					행사의 초록집을 무료로 배포하고, 포럼에 초청된 연자 중에서 온라인 영상
					공개에 동의한 강연물에 한하여 재단 유튜브 채널에 영상을 게시하여 상시
					공개하고 있습니다.
				</Message>
			</StyledInternationalForum>
			<BlankDiv height="50px"></BlankDiv>
			<StyledInternationalForum>
				<h1>협력연계사업</h1>
				<Message>
					재단은 혁신적인 연구 기술로 창업을 준비하는 연구자를 상시 지원하기
					위해 전문가 그룹 및 유관 산업 분야와 MOU 체결을 확대하고 있습니다.
					협력연계사업으로 구축된 혁신적인 오픈이노베이선 플랫폼을 기반으로
					바이오 스타트업 전 분야에 최신지견 및 유망기술의 최신 정보를 공유하고
					협력 네트워크를 확대하여 연구자의 연구개발 역량과 산업계와의
					상호교류를 촉진하여 대한민국 바이오 산업을 선도하겠습니다.
				</Message>
			</StyledInternationalForum>
		</Page>
	);
};

export default OpenInnovationPage;
