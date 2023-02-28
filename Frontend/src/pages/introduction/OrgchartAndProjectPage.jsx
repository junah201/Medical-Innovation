import React from "react";
import styled from "styled-components";

import Page from "../../components/common/Page";
import SubNav from "../../components/introduction/SubNav";
import Portrait from "../../components/common/Portrait";
import PortraitWrapper from "../../components/common/PortraitWrapper";
import BlankDiv from "../../components/common/BlankDiv";

import orgchart from "../../static/images/조직도.png";
import mainProject from "../../static/images/주요사업.png";

const StyledOrgchartWrapper = styled.div`
	& img {
		width: 100%;
	}
`;

const OrgchartAndProjectPage = () => {
	return (
		<Page>
			<SubNav select="조직도 및 주요사업" />
			<StyledOrgchartWrapper>
				<h1>조직도</h1>
				<BlankDiv height="30px" />
				<img src={orgchart} alt="조직도" />
			</StyledOrgchartWrapper>
			<BlankDiv height="50px" />

			<BlankDiv height="50px" />
			<StyledOrgchartWrapper>
				<h1>주요사업</h1>
				<BlankDiv height="30px" />
				<img src={mainProject} alt="조직도" />
			</StyledOrgchartWrapper>
		</Page>
	);
};

export default OrgchartAndProjectPage;
