import { useState, useEffect, useContext, useReducer } from "react";
import Page from "components/common/Page";
import axios from "axios";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_URL, CDN_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import styled from "styled-components";
import Message from "components/common/Message";
import JudgingItem from "components/judging/JudgingItem";

const JudgingResultCreatePage = () => {
	const params = useParams();
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

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
				case "technical_score1":
					return { ...state, technical_score1: action.payload };
				case "technical_score2":
					return { ...state, technical_score2: action.payload };
				case "technical_score3":
					return { ...state, technical_score3: action.payload };
				case "technical_score4":
					return { ...state, technical_score4: action.payload };
				case "technical_score5":
					return { ...state, technical_score5: action.payload };
				case "technical_score6":
					return { ...state, technical_score6: action.payload };
				case "marketability_score1":
					return { ...state, marketability_score1: action.payload };
				case "marketability_score2":
					return { ...state, marketability_score2: action.payload };
				case "marketability_score3":
					return { ...state, marketability_score3: action.payload };
				case "marketability_score4":
					return { ...state, marketability_score4: action.payload };
				case "business_score1":
					return { ...state, business_score1: action.payload };
				case "business_score2":
					return { ...state, business_score2: action.payload };
				case "business_score3":
					return { ...state, business_score3: action.payload };
				case "business_score4":
					return { ...state, business_score4: action.payload };
				case "business_score5":
					return { ...state, business_score5: action.payload };
				case "business_score6":
					return { ...state, business_score6: action.payload };
				case "business_score7":
					return { ...state, business_score7: action.payload };
				case "business_score8":
					return { ...state, business_score8: action.payload };
				case "other_score1":
					return { ...state, other_score1: action.payload };
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
			technical_score1: 1,
			technical_score2: 1,
			technical_score3: 1,
			technical_score4: 1,
			technical_score5: 1,
			technical_score6: 1,
			marketability_score1: 1,
			marketability_score2: 1,
			marketability_score3: 1,
			marketability_score4: 1,
			business_score1: 1,
			business_score2: 1,
			business_score3: 1,
			business_score4: 1,
			business_score5: 1,
			business_score6: 1,
			business_score7: 1,
			business_score8: 1,
			other_score1: 0,
			other_comment: "",
		}
	);

	useEffect(() => {
		const checkJudgingPermission = (JudgingPermissions) => {
			if (JudgingPermissions === undefined) return false;
			if (JudgingPermissions.length === 0) return false;

			const JudgingPermission = JudgingPermissions.find((permission) => {
				return permission.judging_event_id === parseInt(params.event_id);
			});

			if (!JudgingPermission) return false;

			if (
				params.nth === "1" &&
				JudgingPermission.first_judging_permission === true
			)
				return true;

			if (
				params.nth === "2" &&
				JudgingPermission.second_judging_permission === true
			)
				return true;

			return false;
		};

		axios({
			method: "GET",
			url: `${API_URL}/api/v1/user/me`,
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				if (checkJudgingPermission(res.data.judging_permissions)) return;

				alert("심사 권한이 없습니다.");
				navigate(`/judging/result/${params.event_id}/all`);
			}
		});
	}, [authCtx.accessToken, params.event_id, params.nth, navigate]);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/judging_event/get/${params.event_id}`,
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				const now = new Date();
				if (params.nth === "1") {
					const start = new Date(res.data.judging_1st_start_date);
					const end = new Date(res.data.judging_1st_end_date);
					if (now < start || now > end) {
						alert(
							`1차 심사 기간이 아닙니다.\n${res.data.judging_1st_start_date} ~ ${res.data.judging_1st_end_date}`
						);
						navigate(`/judging/result/${params.event_id}/all`);
						return;
					}
				}
				if (params.nth === "2") {
					const start = new Date(res.data.judging_2nd_start_date);
					const end = new Date(res.data.judging_2nd_end_date);
					if (now < start || now > end) {
						alert(
							`2차 심사 기간이 아닙니다.\n${res.data.judging_2nd_start_date} ~ ${res.data.judging_2nd_end_date}`
						);
						navigate(`/judging/result/${params.event_id}/all`);
						return;
					}
				}
			}
		});
	}, [params.event_id, params.nth, authCtx.accessToken, navigate]);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/judging_participant/get/${params.participant_id}`,
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		})
			.then((res) => {
				if (res.status === 200) {
					setJudgingParticipant(res.data);
					return;
				}
			})
			.catch((err) => {
				console.log(err);
				alert("심사 대상 정보를 불러오는데 실패했습니다.\n\n" + err);
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
			<h1>심사 대상자 정보</h1>
			<Message>
				이름 : {judgingParticipant?.name}
				<br />
				조직명 : {judgingParticipant?.organization_name}
				<br />
				직위 : {judgingParticipant?.job_position}
				<br />
				<br />
				<a href={`${CDN_URL}/upload/${judgingParticipant?.zip_filename}`}>
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
					})
						.then((res) => {
							if (res.status === 204) {
								alert("저장되었습니다.");
								navigate(`/judging/result/${params.event_id}/all`);
							}
						})
						.catch((err) => {
							console.log(err);
							alert("심사 결과 저장에 실패했습니다.\n\n" + err);
						});
				}}
			>
				<h1>기술성 평가항목 (30%)</h1>
				<JudgingItem
					division="우월성"
					title="대상기술의 유형을 파생기술, 응용기술, 원천기술 등으로 구분하고, 기술적 우월성을 판단함. 가장 높은 범주인 원천기술이란 해당 기술이 속해있는 분야에서 기술표준을 주도하는 기술을 의미함."
					choices={[
						"기술적 우월성이 없음",
						"파생기술 및 응용기술로서 기술적 우월성이 미흡함.",
						"파생기술 및 응용기술로서 기술적 우월성이 보통임.",
						"원천기술에 근접하는 기술로써 기술적 우월성이 높음.",
						"원천기술로써 기술적 우월성이 매우 높음.",
					]}
					value={judgingResult.technical_score1}
					onChange={(value) => {
						dispatch({
							type: `technical_score1`,
							payload: value,
						});
					}}
				/>
				<JudgingItem
					division="혁신성"
					choices={[
						"대상기술은 혁신관점에서 기존기술과 매우 유사하거나 동일함.",
						"대상기술은 기존 기술에 비해 일부 개량됨.",
						"대상기술은 기술의 일부가 혁신적인 기술임(보통 개량기술).",
						"대상기술의 상당 부분이 혁신적인 기술임(주요 개량기술).",
						"대상기술 자체가 혁신적인 기술임(혁신기술).",
					]}
					value={judgingResult.technical_score2}
					onChange={(value) => {
						dispatch({
							type: `technical_score2`,
							payload: value,
						});
					}}
				>
					대상기술을 기술혁신의 응용과 확산 정도에 따라 혁신기술(revolutionary),
					주요 개량기술(major improvement), 보통 개량기술(minor improvement),
					일부개량 및 기존 기술과 유사 등으로 구분하여 평가함.
					<br />
					<small>
						∴여기서 혁신기술이랑 기존기술을 대체할 수 있는 신기술을 의미하고,
						개량기술은 기존 제품 혹은 서비스에 기술적 우위성을 부가하는 기술을
						의미함.
					</small>
				</JudgingItem>
				<JudgingItem
					division="차별성"
					choices={[
						"경쟁기술에 비해 차별성이 거의 없음.",
						"경쟁기술에 비해 차별성이 약함.",
						"경쟁기술에 비해 차별성이 보통 수준임.",
						"경쟁기술에 비해 차별성이 양호함.",
						"경쟁기술에 비해 차별성이 우수함.",
					]}
					value={judgingResult.technical_score3}
					onChange={(value) => {
						dispatch({
							type: `technical_score3`,
							payload: value,
						});
					}}
				>
					경쟁기술 대비 대상기술의 차별적 속성을 평가함. 차별적 속성을 비교할 수
					있는 항목 중 단일 항목의 차별성이 매우 높은 경우 혹은 복수 항목의
					차별성이 모두 유의한 경우에 양호 또는 우수로 평가할 수 있음. 기술의
					차별성을 평가할 수 있는 항목은 다음과 같음.
					<br />
					<small>
						{"<검토항목>"}
						<br />
						- 생산수율 또는 기능 개선
						<br />
						- 원가절감 또는 시간절감
						<br />
						- 공정 또는 공법 개선
						<br />
						- 사용편의성
						<br />
						- 기타
						<br />
					</small>
				</JudgingItem>
				<JudgingItem
					division="기술 경쟁강도"
					title="현재 목표시장에서 대상기술과 연관이 있는 경쟁기술(유사기술)의 수, 기술 간 상호 경쟁관계 등을 파악하고 기술간 경쟁구조와 경쟁환경이 대상기술의 사업화에 미치는 영향을 평가함."
					choices={[
						"목표시장에 경쟁기술 수가 매우 많고 경쟁이 매우 치열함.",
						"목표시장에 경쟁기술 수가 많고 경쟁이 치열함.",
						"목표시장에 경쟁기술 수와 경쟁이 보통임.",
						"목표시장에 경쟁기술 수가 적고 경쟁정도가 낮음.",
						"목표시장에 경쟁기술이 거의 없음.",
					]}
					value={judgingResult.technical_score4}
					onChange={(value) => {
						dispatch({
							type: `technical_score4`,
							payload: value,
						});
					}}
				/>
				<JudgingItem
					division="파급성"
					title="대상기술이 현재 적용될 수 있는 시장 및 제품 이외에 향후 응용 가능성 및 융합기술의 개발에 적용될 가능성을 평가함. 즉, 대상기술의 향후 타제품 및 시장으로의 확장, 적용 가능성을 평가함."
					choices={[
						"적용가능성이 거의 없음.",
						"적용가능성이 일부 있음.",
						"적용가능성이 보통 수준임.",
						"적용가능성이 높음.",
						"적용가능성이 매우 높음.",
					]}
					value={judgingResult.technical_score5}
					onChange={(value) => {
						dispatch({
							type: `technical_score5`,
							payload: value,
						});
					}}
				/>
				<JudgingItem
					division="혁신성"
					choices={[
						"대상기술의 모방이 쉬움.",
						"대상기술의 모방이 비교적 쉬움.",
						"대상기술의 모방 가능성이 보통임.",
						"대상기술의 모방이 어려움.",
						"대상기술의 모방이 매우 어려움.",
					]}
					value={judgingResult.technical_score6}
					onChange={(value) => {
						dispatch({
							type: `technical_score6`,
							payload: value,
						});
					}}
				>
					기술수준의 고도성 또는 복잡성으로 인해 모방이 어려운 정도를 평가함.
					외부 공개 자료에 의한 모방 가능성 정도, 출시 제품에 대한 리버스
					엔지니어링을 통한 모방 가능성 정도 등을 종합적으로 고려함.
					<br />
					<small>
						- 대상기술의 모방 난이도가 높을수록 상당기간 동안 모방이 어렵기
						때문에 기술위험이 상대적으로 낮아지고 사업화 위험도 낮아짐.
					</small>
				</JudgingItem>
				<h1>시장성 평가항목 (20%)</h1>
				<JudgingItem
					division="시장진입 가능성"
					choices={[
						"4가지 이상 장애요인 있음.",
						"3가지 장애요인 있음.",
						"2가지 장애요인 있음.",
						"1가지 장애요인 있음.",
						"장애요인 없음.",
					]}
					value={judgingResult.marketability_score1}
					onChange={(value) => {
						dispatch({
							type: `marketability_score1`,
							payload: value,
						});
					}}
				>
					시장진입 장애요인을 분석하여 대상기술의 시장진입 가능성을 평가함.
					<br />
					<br />
					<small>
						{"<검토항목>"}
						<br />
						- 시장을 주도하는 기업으로 인해 시장진입이 어렵다
						<br />
						- 제품 차별화 요인이 크지 않아 시장진입이 어렵다
						<br />
						- 기존 경쟁자의 유통망이 견고하여 시장진입이 어렵다
						<br />
						- 시장에 진입하기 위한 소요자본 규모가 크다
						<br />- 법·제도적인 장애요인이 많다
					</small>
				</JudgingItem>
				<JudgingItem
					division="시장 경쟁강도"
					choices={[
						"목표시장의 경쟁강도가 대상기술의 사업화에 매우 불리함.",
						"목표시장의 경쟁강도가 대상기술의 사업화에 불리함.",
						"목표시장의 경쟁강도가 대상기술의 사업화에 거의 영향이 없음.",
						"목표시장의 경쟁강도가 대상기술의 사업화에 유리함.",
						"목표시장의 경쟁강도가 대상기술의 사업화에 매우 유리함.",
					]}
					value={judgingResult.marketability_score2}
					onChange={(value) => {
						dispatch({
							type: `marketability_score2`,
							payload: value,
						});
					}}
				>
					대상기술이 속한 목표시장의 경쟁구조, 시장지배자의 유형, 독과점 여부,
					경쟁제품의 수 등 시장의 경쟁강도가 대상기술의 사업화에 미치는 영향을
					평가함.
					<br />
					<small>
						- 일반적으로 독과점 정도가 높을수록 혹은 시장 선도기업들의 경쟁이
						치열할수록 시장침투가 용이하지 않을수록 시장위험이 상대적으로 커지게
						됨. 그러나 대상기업이 경쟁력이 있고, 이미 목표시장에 진입한 경우
						독과점 시장구조가 사업화에 유리할 수 있음.
					</small>
				</JudgingItem>
				<JudgingItem
					division="시장 경쟁의 변화"
					choices={[
						"향후 시장에서 경쟁상황 또는 경쟁구조의 변화가 기술사업화에 매우 부정적인 영향을 미침.",
						"향후 시장에서 경쟁상황 또는 경쟁구조의 변화가 기술사업화에 부정적인 영향을 미침.",
						"향후 시장에서 경쟁상황 또는 경쟁구조의 변화가 기술사업화에 거의 영향을 미치지 않음.",
						"향후 시장에서 경쟁상황 또는 경쟁구조의 변화가 기술사업화에 긍정적인 영향을 미침.",
						"향후 시장에서 경쟁상황 또는 경쟁구조의 변화가 기술사업화에 매우 긍정적인 영향을 미침.",
					]}
					value={judgingResult.marketability_score3}
					onChange={(value) => {
						dispatch({
							type: `marketability_score3`,
							payload: value,
						});
					}}
				>
					향후 3-5년 이내 경쟁상황(경쟁제품의 수, 경쟁기업의 수 등)의 변화가
					대상기술의 사업화에 미치는 영향을 평가함.
				</JudgingItem>
				<JudgingItem
					division="시장의 성장전망"
					choices={[
						"목표시장의 향후 연평균 성장률이 마이너스(-)로 예상됨.",
						"목표시장의 향후 연평균 성장률이 5%미만으로 예상됨.",
						"목표시장의 향후 연평균 성장률이 5-10%미만으로 예상됨.",
						"목표시장의 향후 연평균 성장률이 10-15%미만으로 예상됨.",
						"목표시장의 향후 연평균 성장률이 15%이상으로 예상됨.",
					]}
					value={judgingResult.marketability_score4}
					onChange={(value) => {
						dispatch({
							type: `marketability_score4`,
							payload: value,
						});
					}}
				>
					향후 5년간 목표시장의 연평균 성장률을 통해 시장의 성장성을 평가함.
				</JudgingItem>
				<h1>사업성 평가항목 (40%)</h1>
				<JudgingItem
					division="예상 시장 점유율"
					choices={[
						"대상기술 제품의 예상 시장점유율이 목표시장에서 매우 낮을 것으로 예상됨.",
						"대상기술 제품의 예상 시장점유율이 목표시장에서 하위그룹 수준일 가능성이 높음.",
						"대상기술 제품의 예상 시장점유율이 목표시장에서 중간그룹 수준일 가능성이 높음.",
						"대상기술 제품의 예상 시장점유율이 목표시장에서 선두그룹 수준일 가능성이 높음.",
						"대상기술 제품의 예상 시장점유율이 목표시장에서 선두그룹 수준일 가능성이 매우 높음.",
					]}
					value={judgingResult.business_score1}
					onChange={(value) => {
						dispatch({
							type: `business_score1`,
							payload: value,
						});
					}}
				>
					시장 내 경쟁자 수, 경쟁상황, 대상기술 제품의 경쟁력, 사업주체의 사업화
					역량 등을 종합적으로 고려하여 대상기술 제품이 목표시장에서 점유할 수
					있는 최대 시장점유율을 통해 예상 시장점유율을 평가함.
				</JudgingItem>
				<JudgingItem
					division="사업화 준비기간"
					choices={[
						"기술사업화를 위해 2년 이상의 준비기간이 필요함.",
						"기술사업화를 위해 1-2년 미만의 준비기간이 필요함.",
						"기술사업화를 위해 6개월-1년 미만의 준비기간이 필요함.",
						"기술사업화를 위해 6개월-1년 미만의 준비기간이 필요함.",
						"즉 사업화가 가능함.",
					]}
					value={judgingResult.business_score2}
					onChange={(value) => {
						dispatch({
							type: `business_score2`,
							payload: value,
						});
					}}
				>
					기술사업화까지 소요되는 준비기간이 어느 정도인지를 평가함.
				</JudgingItem>
				<JudgingItem
					division="사업화 소요자금"
					choices={[
						"기술사업화에 소요될 것으로 예상되는 자본투자 규모가 매우 큼.",
						"기술사업화에 소요될 것으로 예상되는 자본투자 규모가 큼.",
						"기술사업화에 소요될 것으로 예상되는 자본투자 규모가 보통 수준임.",
						"기술사업화에 소요될 것으로 예상되는 자본투자 규모가 적음.",
						"추가적인 자본투자 없이 사업화가 가능함.",
					]}
					value={judgingResult.business_score3}
					onChange={(value) => {
						dispatch({
							type: `business_score3`,
							payload: value,
						});
					}}
				>
					대상기술의 사업화를 위해 필요한 소요자본 규모를 추정하고 아래의 기준에
					의해 평가함. 예상되는 자본투자 규모가 상당히 클 경우 사업화 추진에
					애로사항이 될 수 있음.
				</JudgingItem>
				<JudgingItem
					division="생산 용이성"
					choices={[
						"1개 이하 항목 충족",
						"2개 항목 충족",
						"3개 항목 충족",
						"4개 항목 충족",
						"5개 이상 항목 충족",
					]}
					value={judgingResult.business_score4}
					onChange={(value) => {
						dispatch({
							type: `business_score4`,
							payload: value,
						});
					}}
				>
					제품을 생산하는데 필요한 생상활동과 관련된 아래 사항들을 고려하여
					생산용이성을 평가함. *전체 외주생산의 경우에는 최대 3점까지 부여가능
					<br />
					<small>
						{"<검토항목>"}
						<br />
						- 생상인력 확보에 어려움이 없다
						<br />
						- 재료 및 부재료(부품)가격이 안정적이다
						<br />
						- 물량확보가 용이하고, 수급이 안정적이다
						<br />
						- 다수의 공급자가 존재한다
						<br />
						- 신속한 조달이 가능하다
						<br />- 물류비용이 저렴하다
					</small>
				</JudgingItem>
				<JudgingItem
					division="매출 성장추세"
					choices={[
						"예상 매출액 성장률이 동업종 평균보다 매우 낮을 것으로 예상됨.",
						"예상 매출액 성장률이 동업종 평균보다 낮을 것으로 예상됨.",
						"예상 매출액 성장률이 동업종 평균과 유사할 것으로 예상됨.",
						"예상 매출액 성장률이 동업종 평균보다 2배 이상 높을 것으로 예상됨.",
						"예상 매출액 성장률이 동업종 평균보다 3배 이상 높을 것으로 예상됨.",
					]}
					value={judgingResult.business_score5}
					onChange={(value) => {
						dispatch({
							type: `business_score5`,
							payload: value,
						});
					}}
				>
					대상기술 제품의 예상 연평균 매출액 성장률과 동업종의 최근 3년간 연평균
					매출액 성장률을 비교하여 평가함. (평가 대상기업은 향후 3년까지
					예상매출액을 제시할 것)
					<br />
					<small>
						*비교대상 동업종 자료는 한국은행의 ‘기업경영분석’ 및 기타 신뢰할 수
						있는 기업재무정보 제공기관에서의 세세분류 업종 자료 사용을 권장함.
					</small>
				</JudgingItem>
				<JudgingItem
					division="수익성"
					choices={[
						"영업이익률이 매우 낮을 것으로 예상됨.",
						"영업이익률이 동업종 평균 이하일 것으로 예상됨.",
						"영업이익률이 동업종과 유사할 것으로 예상됨.",
						"영업이익률이 동업종 평균보다 10%이상 높을 것으로 예상됨.",
						"영업이익률이 동업종 평균보다 20%이상 높을 것으로 예상됨.",
					]}
					value={judgingResult.business_score6}
					onChange={(value) => {
						dispatch({
							type: `business_score6`,
							payload: value,
						});
					}}
				>
					대상기술 제품의 예상 영업이익률과 동업종의 최근 3년간 평균
					영업이익률을 비교하여 평가함.
					<br />
					<small>
						*비교대상 동업종 자료는 한국은행의 ‘기업경영분석’ 및 기타 신뢰할 수
						있는 기업재무정보 제공기관에서의 세세분류 업종 자료 사용을 권장함.
					</small>
				</JudgingItem>
				<JudgingItem
					division="파생적 매출"
					choices={[
						"타 산업에서의 어떠한 파생적 매출 발생 가능성이  없음.",
						"1개 산업에서 파생적 매출이 발생할 가능성이 있음.",
						"2개 산업에서 파생적 매출이 발생할 가능성이 있음.",
						"3개 산업에서 파생적 매출이 발생할 가능성이 있음.",
						"4개 산업에서 파생적 매출이 발생할 가능성이 있음.",
					]}
					value={judgingResult.business_score7}
					onChange={(value) => {
						dispatch({
							type: `business_score7`,
							payload: value,
						});
					}}
				>
					대상기술 도입 또는 적용으로 인해 타 산업 분야에서 매출이 발생할
					가능성을 평가함. (한국표준산업분류 참고)
				</JudgingItem>
				<JudgingItem
					division="신제품 출현 가능성"
					choices={[
						"경쟁 신제품이 출현할 가능성이 매우 높음.",
						"경쟁 신제품이 출현할 가능성이 높음.",
						"경쟁 신제품이 출현할 가능성이 있음.",
						"경쟁 신제품이 출현할 가능성이 낮음.",
						"경쟁 신제품이 출현할 가능성이 매우 낮음.",
					]}
					value={judgingResult.business_score8}
					onChange={(value) => {
						dispatch({
							type: `business_score8`,
							payload: value,
						});
					}}
				>
					목표시장에서 향후 3년 이내에 경쟁 신제품이 출현할 가능성에 대해
					평가함.
				</JudgingItem>
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
							gridRow: "2 / 8",
						}}
						type="number"
						value={judgingResult.other_score1}
						onChange={(e) => {
							dispatch({
								type: `other_score1`,
								payload: e.target.value,
							});
						}}
						min="0"
						max="10"
					></input>
					<div
						style={{
							gridColumn: "1 / 3",
							gridRow: "2 / 3",
						}}
					>
						아래과 같은 항목을 근거로 정성적으로 1~10점을 기재해 주십시오.
					</div>
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
					placeholder="위 평가항목에 대한 지적사항이나 보완할 사항, 기타 심의의견 등을 기재해 주십시오."
				></textarea>
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<button
						type="submit"
						style={{
							width: "100px",
							height: "50px",
							backgroundColor: "#204397",
							color: "#ffffff",
							border: "none",
							borderRadius: "5px",
							fontSize: "16px",
							fontWeight: "bold",
							cursor: "pointer",
						}}
					>
						제출하기
					</button>
				</div>
			</form>
		</Page>
	);
};

const StyledDiv = styled.div`
	display: grid;
	grid-template-columns: 4fr 4fr 1fr;
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
