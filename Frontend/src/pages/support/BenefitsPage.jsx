import React from "react";
import styled from "styled-components";

import Page from "../../components/common/Page";
import SubNav from "../../components/support/SubNav";
import SponsorshipMessage from "../../components/support/SponsorshipMessage";

const BenefitsPage = () => {
	return (
		<Page>
			<SubNav select="후원자 혜택" />
			<SponsorshipMessage />
			<BenefitItem>
				① 기부하신 후원금 전액은 조세특례제한법과 소득세법에 의거하여 세금감면
				혜택을 받으실 수 있습니다.
			</BenefitItem>
			<BenefitItem>
				② 세액공제를 위한 기부금 영수증을 우송해 드립니다.{" "}
				<span>
					세액공제율은 (한도범위내 지출액에 해당하는) 기부금공제대상금액의 15%
					(3천만원 초과분에 대해서는 25%)를 적용하여 절세효과가 발생합니다.)
				</span>
			</BenefitItem>
			<BenefitItem>
				③ 미래의학연구재단의 기부자 명부에 올리며 재단의 사업 진도 보고 책자를
				보내드립니다.
			</BenefitItem>
			<BenefitItem>
				④ 미래의학연구 동향에 관한 소식을 신속하게 알려드립니다.
			</BenefitItem>
		</Page>
	);
};

const StyledBenefitItem = styled.div`
	padding: 10px;
	border-radius: 10px;
	border: 2px solid #204397;
	font-size: 22px;
	font-weight: 600;
	& + & {
		margin-top: 20px;
	}

	& span {
		font-size: 20px;
		font-weight: 500;
	}
`;

const BenefitItem = ({ color, children }) => {
	return <StyledBenefitItem color={color}>{children}</StyledBenefitItem>;
};

export default BenefitsPage;
