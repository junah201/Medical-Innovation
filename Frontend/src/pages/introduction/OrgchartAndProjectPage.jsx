import React from "react";
import styled from "styled-components";

import Page from "components/common/Page";
import SubNav from "components/introduction/SubNav";
import BlankDiv from "components/common/BlankDiv";

import orgchart from "static/images/조직도.png";
import mainProject from "static/images/주요사업.png";
import mainProject2 from "static/images/창업기획자사업모델.png";

const StyledOrgchartWrapper = styled.div`
	& img {
		width: 100%;
	}
`;

const OrgchartAndProjectPage = () => {
	return (
		<Page>
			<SubNav select="조직도 및 사업" />
			<StyledOrgchartWrapper>
				<h1>조직도</h1>
				<img src={orgchart} alt="조직도" />
			</StyledOrgchartWrapper>
			<StyledOrgchartWrapper>
				<h1>주요사업</h1>
				<img src={mainProject} alt="조직도" />
				<img src={mainProject2} alt="창업기획자사업모델" />
			</StyledOrgchartWrapper>
		</Page>
	);
};

export default OrgchartAndProjectPage;
