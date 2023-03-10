import React, { useState, useEffect } from "react";
import axios from "axios";

import Page from "../components/common/Page";
import Message from "../components/common/Message";
import Portrait from "../components/common/Portrait";
import PortraitWrapper from "../components/common/PortraitWrapper";

import { API_URL, CDN_URL } from "../utils/const";

const AdvisoryGroupPage = () => {
	const [advisorList, setAdvisorList] = useState([]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/advisor/all?skip=0&limit=300`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				setAdvisorList(res.data.advisors);
			}
		});
	}, []);

	return (
		<Page>
			<h1>임원현황</h1>
			<Message>
				재단은 미래의학생명과학 분야를 타깃하여 혁신과 변화에 비전을 둔 전문성과
				다양성으로 스타트업 맞춤형 성장·지원을 통해 산·학·연 오픈이노베이션을
				촉진하고 건강한 창업생태계 구축에 기여하겠습니다.
			</Message>
			<h1>이사</h1>
			<PortraitWrapper>
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
			</PortraitWrapper>
			<AdvisoryGroup advisorList={advisorList} advisorType="고문" />
			<AdvisoryGroup advisorList={advisorList} advisorType="전문심의위원회" />
			<AdvisoryGroup advisorList={advisorList} advisorType="자문위원회" />
			<AdvisoryGroup
				advisorList={advisorList}
				advisorType="창업기획자 전문가그룹장"
			/>
			<AdvisoryGroup
				advisorList={advisorList}
				advisorType="창업기획자 전문가그룹 자문단"
			/>
			<AdvisoryGroup advisorList={advisorList} advisorType="칼럼니스트" />
		</Page>
	);
};

const AdvisoryGroup = ({ advisorList, advisorType }) => {
	const [filteredAdvisorList, setFilteredAdvisorList] = useState(
		advisorList.filter((advisor) => advisor.type === advisorType)
	);

	useEffect(() => {
		setFilteredAdvisorList(
			advisorList.filter((advisor) => advisor.type === advisorType)
		);
	}, [advisorList, advisorType]);

	return (
		<>
			{true ? (
				<>
					<h1>{advisorType}</h1>
					<PortraitWrapper>
						{filteredAdvisorList.map((advisor) => {
							return (
								<Portrait
									src={`${CDN_URL}/upload/${advisor.filename}`}
									alt={advisor.name}
									name={advisor.name}
									description={advisor.description.split("\n")}
									key={advisor.id}
								/>
							);
						})}
					</PortraitWrapper>
				</>
			) : null}
		</>
	);
};

export default AdvisoryGroupPage;
