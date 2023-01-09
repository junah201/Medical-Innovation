import React from "react";
import styled from "styled-components";

import SubNav from "../../components/introduction/SubNav";

import BlankDiv from "../../components/common/BlankDiv";
import orgchart from "../../static/images/조직도.png";
import mainProject from "../../static/images/주요사업.png";

const StyledOrgchartAndProjectPage = styled.main`
	display: flex;
	justify-content: center;
	padding: 20px;
`;

const StyledOrgchartAndProjectWrapper = styled.div`
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	padding: 30px 80px;
	width: 1230px;
`;

const StyledOrgchartWrapper = styled.div`
	& > h2 {
		font-size: 36px;
		border-left: 5px solid #204397;
		padding-left: 3px;
	}
`;

const StyledProjectWrapper = styled.div`
	& > h2 {
		font-size: 36px;
		border-left: 5px solid #204397;
		padding-left: 3px;
	}
`;

const OrgchartAndProjectPage = () => {
	return (
		<StyledOrgchartAndProjectPage>
			<StyledOrgchartAndProjectWrapper>
				<SubNav select="조직도 및 주요사업" />
				<StyledOrgchartWrapper>
					<h2>조직도</h2>
					<br />
					<br />
					<img src={orgchart} alt="조직도" width="1070px" />
				</StyledOrgchartWrapper>
				<BlankDiv height="50px" />
				<StyledProjectWrapper>
					<h2>주요사업</h2>
					<br />
					<img src={mainProject} alt="조직도" width="1070px" />
				</StyledProjectWrapper>
			</StyledOrgchartAndProjectWrapper>
		</StyledOrgchartAndProjectPage>
	);
};

export default OrgchartAndProjectPage;
