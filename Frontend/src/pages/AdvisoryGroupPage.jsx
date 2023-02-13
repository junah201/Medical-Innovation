import React, { useState, useEffect } from "react";
import axios from "axios";

import Page from "../components/common/Page";
import Message from "../components/common/Message";
import Portrait from "../components/common/Portrait";
import PortraitWrapper from "../components/common/PortraitWrapper";

import { API_URL, S3_URL } from "../utils/const";

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
				setAdvisorList(res.data);
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
									src={`${S3_URL}/upload/${advisor.filename}`}
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
