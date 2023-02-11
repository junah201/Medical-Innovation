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
			<h1>자문단</h1>
			<Message>
				자문단은 미래의학연구재단의 운영에 있어서 자문을 해주는 분들입니다.
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
									description={advisor.description.split(",")}
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
