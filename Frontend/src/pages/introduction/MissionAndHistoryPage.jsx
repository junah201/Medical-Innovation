import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Page from "components/common/Page";
import SubNav from "components/introduction/SubNav";
import BlankDiv from "components/common/BlankDiv";
import Message from "components/common/Message";
import Portrait from "components/common/Portrait";
import axios from "axios";
import { API_URL } from "utils//const";

const StyledMissionWrapper = styled.div`
	& div {
		padding: 10px;
	}
`;

const StyledChairmanWrapper = styled.div`
	& > div {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
`;

const StyledHistoryWrapper = styled.div``;

const MissionAndHistoryPage = () => {
	const [histories, setHistories] = useState([]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/history/all?limit=3000&skip=0`,
			method: "GET",
			headers: {
				accept: "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				setHistories(res.data.histories);

				console.log(res.data.histories);
			}
		});
	}, []);

	return (
		<Page>
			<SubNav select="설립 취지 및 연혁" />
			<StyledChairmanWrapper>
				<h1>역대 이사장</h1>
				<div>
					<Portrait
						src="/images/Chairmans/김효수.png"
						alt="김효수"
						name="제1대 김효수"
						description={[
							"서울대학교병원 의생명연구원장",
							"서울대학교병원 순환기내과 교수",
						]}
					/>
					<Portrait
						src="/images/Chairmans/한상대.png"
						alt="한상대"
						name="제2대 한상대"
						description={[
							"한상대법률사무소 변호사",
							"제38대 대검찰청 검찰총장",
							"고려대학교 법학전문대학원 특임교수",
						]}
					/>
					<Portrait
						src="/images/Chairmans/전승호.png"
						alt="전승호"
						name="제3대 전승호"
						description={[
							"대웅제약 대표이사",
							"대한약학회 이사",
							"KAIST 융합의과학원 자문위원",
							"한국신약개발연구조합 이사",
						]}
					/>
				</div>
			</StyledChairmanWrapper>
			<StyledMissionWrapper>
				<h1>설립취지</h1>
				<div>
					<Message>
						<span>첫째</span>, 미래의학을 선도할 유망 기술 연구 동향을
						정기적으로 면밀히 조사하고 그 정보를 적기에 공급함으로써, 대한민국
						의학 연구수준을 세계적인 수준으로 높이는 계기를 만들어갈 것입니다.
						<br />
						<br />
						<span>둘째</span>, 창의적 아이디어가 환자에게까지 적용될 수 있도록,
						신개념의 기초의학 연구와 이를 활용한 융복합연구를 발굴 수행해 나갈
						것입니다. 즉, 세포생물학과 나노바이오테크놀로지를 융합한 미래융합형
						연구를 선도함과 동시에 이로부터 도출된 첨단 치료법 혹은 신치료기기를
						환자에 적용하는 것을 촉진하도록 하겠습니다.
						<br />
						<br />
						<span>셋째</span>, 이러한 융복합 연구를 창의적으로 구현할 유망한
						의과학자를 지원 육성할 것입니다.
						<br />
						<br />
						<span>넷째</span>, 혁신적 연구아이디어와 개발된 기술이 효율적으로
						확산되도록 연구 및 창업 생태계를 조성하고 발전시켜 나갈 것입니다.
						<br />
						<br />
						궁극적으로 이 재단을 통해서, 뛰어난 아이디어와 기술을 적기에
						공유하고, 개발된 신치료 기술을 효과적으로 전파할 수 있는 연구 및
						창업 생태계를 발전시킴으로써, 양질의 의료를 국민에게 공급하여
						대한국민 보건의료의 발전을 추구하고자 합니다.
					</Message>
				</div>
			</StyledMissionWrapper>
			<StyledHistoryWrapper>
				<h1>연혁</h1>
				{histories.map((histories) => {
					return (
						<HistoryItem year={histories.title} content={histories.content} />
					);
				})}
			</StyledHistoryWrapper>
		</Page>
	);
};

const StyledHistoryItem = styled.div`
	border: 1px solid #e1e1e1;
	border-radius: 5px;
	& h3 {
		font-weight: 400;
		padding: 10px 20px;
		background-color: #f7f7f7;
		color: #224099;
	}

	& div {
		padding: 20px;
	}

	& + & {
		margin-top: 16px;
	}
`;

const HistoryItem = ({ year, content }) => {
	return (
		<StyledHistoryItem>
			<h3>{year}</h3>
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</StyledHistoryItem>
	);
};

export default MissionAndHistoryPage;
