import React from "react";
import styled from "styled-components";

const StyledSponsorshipMessage = styled.div`
	margin-bottom: 60px;
	padding: 20px;
	border-radius: 10px;
	background-color: #f7f7f7;
	font-size: 20px;
	word-break: keep-all;

	& > * + * {
		margin-top: 10px;
	}

	& p > strong {
		margin: 0 5px;
	}
`;

const SponsorshipMessage = () => {
	return (
		<StyledSponsorshipMessage>
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
		</StyledSponsorshipMessage>
	);
};

export default SponsorshipMessage;
