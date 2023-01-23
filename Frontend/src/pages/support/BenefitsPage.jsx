import React from "react";
import styled from "styled-components";

import Page from "../../components/common/Page";
import SubNav from "../../components/support/SubNav";

const BenefitsPage = () => {
	return (
		<Page>
			<SubNav select="후원자 혜택" />
			<h1>후원 혜택</h1>
			<br />
			<StyledBenefitContainer>
				<BenefitItem
					src="/images/benefits/기부자명부.png"
					title="기부자 명부"
					content="재단법인 미래의학연구재단의 기부자 명부에 올리겠습니다."
				/>
				<BenefitItem
					src="/images/benefits/세금감면.png"
					title="세금 감면 혜택"
					content="우리 재단은 지정기부금단체입니다. 지정기부금 공제 혜택을 받으실 수 있습니다."
				/>
				<BenefitItem
					src="/images/benefits/기부금영수증.png"
					title="기부금 영수증"
					content="지정기부금 세액공제를 위한 기부금 영수증을 우송해 드립니다."
				/>
				<BenefitItem
					src="/images/benefits/기부금영수증.png"
					title="세액공제율 한시 상향"
					content="2022년 기부금 세액공제율이 5% 일시 상향(소득법제59조의4항)되어 연말정산시 지정기부금 세금감면 혜택이 확대됩니다"
				/>
			</StyledBenefitContainer>
		</Page>
	);
};

const StyledBenefitContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
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
