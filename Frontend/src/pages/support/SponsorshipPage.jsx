import React from "react";
import styled from "styled-components";

import Page from "../../components/common/Page";
import SubNav from "../../components/support/SubNav";
import Message from "../../components/common/Message";

import downloadImg from "../../static/images/약정서다운로드.png";

const StyledSponsorshipContainer = styled.div`
	display: flex;
`;

const SponsorshipPage = () => {
	return (
		<Page>
			<SubNav select="후원하기" />
			<Message>
				<strong>
					대한민국 보건의료의 발전을 추구하시는 여러분 모두가 후원자가 되어
					주십시오.
				</strong>
				<p>
					앞으로 삼십 년 동안 우리가 먹고 살 분야는 바이오테크놀로지 산업입니다.
					재단은 후원자 여러분의 뜻을 끝까지 받들어 바이오테크롤놀지 산업 분야를
					드높이고 융성시켜서 궁극적으로 대한민국이 전 세계에서 최강국이 될 수
					있도록 본연의 활동을 열심히 하겠습니다. 특히 오픈이노베이선을 통한
					선순환 창업 지원으로 바이오코리아 저변 확대를 이끌어 첨단바이오산업의
					미래발전방향을 제시하여 대한민국 보건의료 선진화를 견인하겠습니다.
				</p>
				<p>
					여러분의 연대가 우리의 희망입니다. 우리는
					<strong>미래의학연구재단</strong>
					입니다
				</p>
			</Message>
			<StyledSponsorshipContainer>
				<a href="/기부약정서.pdf" target="_blank">
					<img
						src={downloadImg}
						alt="약정서 다운로드 및 작성"
						width="200px"
						height="200px"
					/>
				</a>
				<div>
					<p>
						이메일이나 우편으로 가입하실 분은 약정서 파일을 다운로드 받으시어
						작성하여 발송하여 주시면 됩니다.
					</p>
				</div>
			</StyledSponsorshipContainer>
		</Page>
	);
};

export default SponsorshipPage;
