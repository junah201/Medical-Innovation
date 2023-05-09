import { useState, useEffect, useContext, useReducer } from "react";
import Page from "components/common/Page";
import axios from "axios";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_URL, CDN_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import styled from "styled-components";
import Message from "components/common/Message";

const StyledJudgingTable = styled.table`
	border: 1px solid silver;
	padding: 0;
	margin: 0;
	font-size: 16px;
	border-collapse: collapse;

	& th {
		padding: 10px;
		background-color: #204397;
		white-space: nowrap;
		color: #ffffff;
		text-align: center;
		justify-content: center;
		border: none;
	}

	& tr + tr {
		border-top: 1px solid silver;
	}

	& tr {
		border-bottom: 1pt solid #799fcb;
		text-align: center;
		justify-content: center;
		padding: 4px;
		height: 30px;
	}

	& a {
		color: #0000ff;
	}

	& a:hover {
		text-decoration: underline;
	}

	& span {
		width: 100%;
		color: #000000;
		display: block;
		text-align: left;
		word-break: keep-all;
	}

	& input {
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 6px;
		border: 1px solid silver;
	}
`;

const JudgingResultCreatePage = () => {
	const params = useParams();
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	const judgingDetail = [
		"대상기술의 독창성 및 우수성 기술의 완성도 적용 분야 및 제품 추가기술의 개발 여부 등에 관한 내용이 충실했는가 점? (10점)",
		"대상기술의 기술적 유용성과 경쟁성 분석이 객관적으로 파악이 가능한가? (10점)",
		"기술성 관점에서 사업화 또는 가치 창출 가능성에 대한 참가자의 의견이 구체적으로 제시되었는가? (10점)",
		"대상기술이 적용될 제품시장이 적합하게 설정되었는가 점? (10점)",
		"목표시장의 규모 예측에 객관성이 확보된 자료와 정보에 근거한 중장기 예측방법이 적용되었는가 점? (10점)",
		"경쟁업체와 경쟁제품 경쟁업체의 지위 대기업 또는 중소기업 경쟁업체의 지배력 등 분석을 통하여 기술사업화의 기회와 제한점이 구체적으로 제시되었는가? (10점)",
		"대상기술 적용제품이 시장진입 후 일정기간 목표시장 규모 성장 패턴과 시장점 유 가능성에 대한 의견의 제시되었는가? (10점)",
		"대상기술 적용제품이 경쟁제품과의 가격 품질 등 경쟁력 관점에서 우위 및 제한 요인이 객관적인 자료 및 정보에 의해 파악되었는가? (10점)",
		"대상기술 적용제품의 목표 시장에서의 매출확보 가능성에 근거하여 중장기 시장 점유율이 합리적으로 예측되었고 사업화를 위한 생산설비 투자규모 및 비용에, 관한 정보도 제시되었는가? (10점)",
	];

	const [judgingParticipant, setJudgingParticipant] = useState({});

	const [judgingResult, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "init":
					return action.payload;
				case "judging_event_id":
					return { ...state, judging_event_id: action.payload };
				case "participant_id":
					return { ...state, participant_id: action.payload };
				case "nth":
					return { ...state, nth: action.payload };
				case "score1":
					return {
						...state,
						score1: Math.min(10, Math.max(0, action.payload)),
					};
				case "score2":
					return {
						...state,
						score2: Math.min(10, Math.max(0, action.payload)),
					};
				case "score3":
					return {
						...state,
						score3: Math.min(10, Math.max(0, action.payload)),
					};
				case "score4":
					return {
						...state,
						score4: Math.min(10, Math.max(0, action.payload)),
					};
				case "score5":
					return {
						...state,
						score5: Math.min(10, Math.max(0, action.payload)),
					};
				case "score6":
					return {
						...state,
						score6: Math.min(10, Math.max(0, action.payload)),
					};
				case "score7":
					return {
						...state,
						score7: Math.min(10, Math.max(0, action.payload)),
					};
				case "score8":
					return {
						...state,
						score8: Math.min(10, Math.max(0, action.payload)),
					};
				case "score9":
					return {
						...state,
						score9: Math.min(10, Math.max(0, action.payload)),
					};
				case "score10":
					return {
						...state,
						score10: Math.min(10, Math.max(0, action.payload)),
					};
				case "other_comment":
					return { ...state, other_comment: action.payload };
				default:
					return state;
			}
		},
		{
			judging_event_id: params.event_id,
			participant_id: params.participant_id,
			nth: params.nth,
			score1: 0,
			score2: 0,
			score3: 0,
			score4: 0,
			score5: 0,
			score6: 0,
			score7: 0,
			score8: 0,
			score9: 0,
			score10: 0,
			other_comment: "",
		}
	);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/judging_participant/get/${params.participant_id}`,
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				setJudgingParticipant(res.data);
				return;
			}
		});
	}, []);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/judging_result/get`,
			params: {
				judging_event_id: params.event_id,
				participant_id: params.participant_id,
				nth: params.nth,
			},
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		})
			.then((res) => {
				if (res.status === 200) {
					console.log(res.data);
					for (let key in res.data) {
						dispatch({ type: key, payload: res.data[key] });
					}
					return;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Page>
			<h1>
				{judgingParticipant?.organization_name} ({judgingParticipant.name})
			</h1>
			<Message>
				<a href={`${CDN_URL}/upload/${judgingParticipant.zip_filename}`}>
					제출 서류 다운로드
				</a>
			</Message>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					axios({
						method: "POST",
						url: `${API_URL}/api/v1/judging_result/create`,
						headers: {
							accept: "application/json",
							Authorization: `Bearer ${authCtx.accessToken}`,
						},
						data: {
							...judgingResult,
						},
					}).then((res) => {
						if (res.status === 204) {
							alert("저장되었습니다.");
							navigate("/me");
						}
					});
				}}
			>
				<h1>기술 시장 사업성 평가 (90%)</h1>
				<StyledJudgingTable>
					<thead>
						<tr>
							<th>평가 항목</th>
							<th>평가 지표</th>
							<th>점수</th>
						</tr>
					</thead>
					<tbody>
						{judgingDetail.map((item, index) => {
							return (
								<tr>
									<td>{index + 1}</td>
									<td>
										<span>{item}</span>
									</td>
									<td>
										<input
											type="number"
											value={judgingResult[`score${index + 1}`]}
											onChange={(e) => {
												dispatch({
													type: `score${index + 1}`,
													payload: e.target.value,
												});
											}}
											min="0"
											max="10"
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</StyledJudgingTable>
				<br />
				<h1>기타 고려 사항 (10%)</h1>
				<StyledDiv>
					<div
						style={{
							gridColumn: "1 / 3",
							backgroundColor: "#204397",
							color: "#ffffff",
						}}
					>
						평가항목
					</div>
					<div
						style={{
							gridColumn: "3 / 4",
							backgroundColor: "#204397",
							color: "#ffffff",
						}}
					>
						점수
					</div>
					<input
						style={{
							gridColumn: "3 / 4",
							gridRow: "2 / 7",
						}}
						type="number"
						value={judgingResult.score10}
						onChange={(e) => {
							dispatch({
								type: `score10`,
								payload: e.target.value,
							});
						}}
						min="0"
						max="10"
					></input>
					<div>특허/지식재산권 보유</div>
					<div>장관 및 대통령 표창 수상</div>
					<div>기술가치평가 이력 보유</div>
					<div>산업융합선도기업</div>
					<div>고용창출 우수기업</div>
					<div>사회적 기업</div>
					<div>우수디자인 선정 기업</div>
					<div>규제샌드박스 인증기업</div>
					<div>대한민국디자인대상 수상기업</div>
					<div>그린관련 인증 기업</div>
				</StyledDiv>
				<br />
				<h1>종합 의견</h1>
				<textarea
					style={{ width: "100%", height: "200px", fontSize: "16px" }}
					value={judgingResult.other_comment}
					onChange={(e) => {
						dispatch({
							type: `other_comment`,
							payload: e.target.value,
						});
					}}
					placeholder="위 평가항목에 대한 지적사항이나 보완할 사항, 기타 심의의견 등을 기제해 주십시오."
				></textarea>
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<button type="submit">제출하기</button>
				</div>
			</form>
		</Page>
	);
};

const StyledDiv = styled.div`
	display: grid;
	grid-template-columns: 4fr 4fr 1fr;
	grid-template-rows: 2fr 1fr 1fr 1fr 1fr;
	grid-gap: 0px;
	padding: 0;

	border: 1px solid silver;

	& > div + div {
		border-top: 1px solid silver;
	}

	& > div {
		display: flex;
		width: 100%;
		height: 100%;
		border-bottom: 1pt solid #799fcb;
		text-align: center;
		justify-content: center;
		padding: 2px;
		height: 30px;
		margin: 0px;
	}
	& input {
		width: 100%;
		height: 100%;
		text-align: center;
	}
`;

export default JudgingResultCreatePage;
