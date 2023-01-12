import React from "react";
import styled from "styled-components";

import Page from "../../components/common/Page";
import SubNav from "../../components/introduction/SubNav";

import BlankDiv from "../../components/common/BlankDiv";
import orgchart from "../../static/images/조직도.png";
import mainProject from "../../static/images/주요사업.png";

const StyledOrgchartWrapper = styled.div``;

const StyledProjectWrapper = styled.div``;

const OrgchartAndProjectPage = () => {
	return (
		<Page>
			<SubNav select="조직도 및 주요사업" />
			<StyledOrgchartWrapper>
				<h1>조직도</h1>
				<BlankDiv height="30px" />
				<img src={orgchart} alt="조직도" width="1070px" />
			</StyledOrgchartWrapper>
			<BlankDiv height="50px" />
			<StyledProjectWrapper>
				<h1>주요사업</h1>
				<BlankDiv height="30px" />
				<img src={mainProject} alt="조직도" width="1070px" />
			</StyledProjectWrapper>
		</Page>
	);
};

export default OrgchartAndProjectPage;
