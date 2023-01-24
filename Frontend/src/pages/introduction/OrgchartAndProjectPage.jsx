import React from "react";
import styled from "styled-components";

import Page from "../../components/common/Page";
import SubNav from "../../components/introduction/SubNav";
import Portrait from "../../components/common/Portrait";
import BlankDiv from "../../components/common/BlankDiv";

import orgchart from "../../static/images/조직도.png";
import mainProject from "../../static/images/주요사업.png";

const StyledOrgchartWrapper = styled.div`
	& img {
		width: 100%;
	}
`;

const StyledDirectorWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 10px;
	padding: 40px;

	@media screen and (max-width: 991px) {
		grid-template-columns: repeat(2, 1fr);
		padding: 10px;
	}
	@media screen and (min-width: 992px) {
		grid-gap: 20px;
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
			<h1>이사진</h1>
			<StyledDirectorWrapper>
				<Portrait
					src="/images/Directors/김효수.png"
					alt="김효수"
					name="김효수 이사"
					description={["이학 의학 박사", "서울대학교병원의생명연구원장"]}
				/>
				<Portrait
					src="/images/Directors/전승호.png"
					alt="전승호"
					name="전승호 이사"
					description={["대웅제약 대표이사"]}
				/>
				<Portrait
					src="/images/Directors/이승규.png"
					alt="이승규"
					name="이승규 이사"
					description={["포휴먼텍 대표이사", "한국바이오협회 상임부회장"]}
				/>
				<Portrait
					src="/images/Directors/김대중.png"
					alt="김대중"
					name="김대중 이사"
					description={["한국다이이찌산쿄 사장"]}
				/>
				<Portrait
					src="/images/Directors/조욱제.png"
					alt="조욱제"
					name="조욱제 이사"
					description={["유한양행 대표이사"]}
				/>
				<Portrait
					src="/images/Directors/김명정.png"
					alt="김명정"
					name="김명정 이사"
					description={["한국의료기기산업협회 상근부회장"]}
				/>
				<Portrait
					src="/images/Directors/박경우.png"
					alt="박경우"
					name="박경우 이사"
					description={["서울대학교병원 강남센터 원장"]}
				/>
				<Portrait
					src="/images/Directors/권유욱.png"
					alt="권유욱"
					name="권유욱 이사"
					description={["서울대학교병원 의생명연구원 교수"]}
				/>
				<Portrait
					src="/images/Directors/이은주.png"
					alt="이은주"
					name="이은주 이사"
					description={[
						"서울대학교병원 의생명연구원 첨단세포유전자치료센터 부소장",
					]}
				/>
			</StyledDirectorWrapper>
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
