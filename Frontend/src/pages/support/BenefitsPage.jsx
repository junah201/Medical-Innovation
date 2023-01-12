import React from "react";
import styled from "styled-components";

import Page from "../../components/common/Page";
import SubNav from "../../components/support/SubNav";

const BenefitsPage = () => {
	return (
		<Page>
			<SubNav select="후원자 혜택" />
			<h1>후원 혜택</h1>
			<StyledBenefitContainer>
				<BenefitItem
					src="/images/benefits/기부자명부.png"
					title="기부자 명부"
					content="재단법인 미래의학연구재단의 기부자 명부에 올리겠습니다."
				/>
				<BenefitItem
					src="/images/benefits/세금감면.png"
					title="세금 감면 혜택"
					content="기부하신 후원금 전액은 조세특례제한법과 소득세법에 의거한 세금감면 혜택을 받으실 수 있습니다."
				/>
				<BenefitItem
					src="/images/benefits/기부금영수증.png"
					title="기부금 영수증"
					content="세액공제를 위한 기부금 영수증을 우송해 드립니다."
				/>
				<BenefitItem
					src="/images/benefits/투자기회.png"
					title="투자 기회 제공"
					content="미래의학연구재단 액셀러레이터 사업에서 발굴한 우수창업기업에 엔젤투자 기회를 제공하겠습니다."
				/>
			</StyledBenefitContainer>
		</Page>
	);
};

const StyledBenefitContainer = styled.div`
	display: flex;
`;

const StyledBenefitItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	padding: 32px 22px;
	padding-top: 50px;
	width: 250px;
	height: 400px;
	border-radius: 26px;
	box-shadow: 0 0 16px rgb(0 0 0 / 13%);
	& + & {
		margin-left: 20px;
	}

	& h6 {
		font-size: 22px;
		font-weight: 600;
		color: #373129;
		text-align: center;
		min-height: 52px;
		margin-bottom: 18px;
		letter-spacing: -0.025em;
		line-height: 1.3;
	}

	& p {
		word-break: keep-all;
		font-size: 16px;
		font-weight: 500;
		color: #373129;
		text-align: center;
		letter-spacing: -0.025em;
		line-height: 1.375;
	}

	& img {
		border-radius: 50%;
		width: 100px;
		height: 100px;
		overflow: hidden;
		margin: 10px;
	}
`;

const BenefitItem = ({ src, title, content }) => {
	return (
		<StyledBenefitItem>
			<img src={src} alt={title} />
			<h6>{title}</h6>
			<p>{content}</p>
		</StyledBenefitItem>
	);
};

export default BenefitsPage;
