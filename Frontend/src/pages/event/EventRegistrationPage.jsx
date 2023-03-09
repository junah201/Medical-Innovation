import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import Page from "../../components/common/Page";
import Message from "../../components/common/Message";
import TextInput from "../../components/regist/TextInput";
import MutiCheckboxInput from "../../components/regist/MutiCheckboxInput";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../utils/const";
import DateInput from "../../components/regist/DateInput";
import EmailInput from "../../components/regist/EmailInput";
import SubmitButton from "../../components/regist/SubmitButton";

const EventRegistrationPage = () => {
	const navigate = useNavigate();
	const params = useParams();

	const [eventDetail, setEventDetail] = useState({});

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/public_event/get/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then((res) => {
			setEventDetail(res.data);
			const now = new Date();
			const start = new Date(res.data.join_start_date);
			const end = new Date(res.data.join_end_date);
			if (now < start || now > end) {
				alert(
					`참가 신청 기간이 아닙니다.\n${res.data.join_start_date} ~ ${res.data.join_end_date}`
				);
				navigate("/event/all");
			}
		});
	}, [params.id]);

	const [registrationInfo, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "init":
					return action.payload;
				case "name":
					return { ...state, name: action.payload };
				case "english_name":
					return { ...state, english_name: action.payload };
				case "gender":
					return { ...state, gender: action.payload };
				case "birth":
					return { ...state, birth: action.payload };
				case "phone":
					return { ...state, phone: action.payload };
				case "email":
					return { ...state, email: action.payload };
				case "organization_type":
					return { ...state, organization_type: action.payload };
				case "organization_name":
					return { ...state, organization_name: action.payload };
				case "organization_english_name":
					return { ...state, organization_english_name: action.payload };
				case "job_position":
					return { ...state, job_position: action.payload };
				case "address":
					return { ...state, address: action.payload };
				case "final_degree":
					return { ...state, final_degree: action.payload };
				case "engagement_type":
					return { ...state, engagement_type: action.payload };
				case "participant_motivation":
					return { ...state, participant_motivation: action.payload };
				case "participant_type":
					return { ...state, participant_type: action.payload };
				case "interest_disease":
					return { ...state, interest_disease: action.payload };
				case "interest_field":
					return { ...state, interest_field: action.payload };
				case "interest_field_detail":
					return { ...state, interest_field_detail: action.payload };
				default:
					return state;
			}
		},
		{
			name: "",
			english_name: "",
			gender: "남자",
			birth: "2000-01-01",
			phone: "",
			email: "",
			organization_type: "공공기관",
			organization_name: "",
			organization_english_name: "",
			job_position: "",
			address: "",
			final_degree: "기타",
			engagement_type: "현장 참가",
			participant_motivation: "",
			participant_type: "",
			interest_disease: "",
			interest_field: "연구분야",
			interest_field_detail: "",
		}
	);

	const SubmitHandler = () => {
		const formData = new FormData();
		for (let key in registrationInfo) {
			formData.append(key, registrationInfo[key]);
		}

		axios({
			url: `${API_URL}/api/v1/participant/${params.id}/create`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
			data: formData,
		}).then((res) => {
			if (res.status === 204) {
				alert("참가신청이 완료되었습니다.");
				navigate("/");
				return;
			}
			alert("알 수 없는 오류");
		});
	};

	return (
		<Page>
			<h1>참가 신청</h1>
			<Message>{eventDetail.description}</Message>
			<TextInput
				label="이름"
				value={registrationInfo.name}
				onChange={(e) => {
					dispatch({ type: "name", payload: e.target.value });
				}}
				placeholder="홍길동"
				required="required"
			/>
			<TextInput
				label="영문 이름"
				value={registrationInfo.english_name}
				onChange={(e) => {
					dispatch({ type: "english_name", payload: e.target.value });
				}}
				placeholder="필수 X"
			/>
			<MutiCheckboxInput
				label="성별"
				options={["남자", "여자"]}
				value={registrationInfo?.gender}
				onChange={(e) => {
					dispatch({ type: "gender", payload: e.target.value });
				}}
			/>
			<DateInput
				label="생년월일"
				value={registrationInfo.birth}
				onChange={(e) => {
					dispatch({ type: "birth", payload: e.target.value });
				}}
			/>
			<TextInput
				label="전화번호"
				value={registrationInfo.phone}
				onChange={(e) => {
					dispatch({ type: "phone", payload: e.target.value });
				}}
				placeholder="010xxxxxxxx"
			/>
			<EmailInput
				label="이메일"
				value={registrationInfo.email}
				onChange={(e) => {
					dispatch({ type: "email", payload: e.target.value });
				}}
				placeholder="medical@incovaion.com"
			/>
			<MutiCheckboxInput
				label="분야"
				options={["연구분야", "의료기기산업분야", "일반", "제약분야", "기타"]}
				value={registrationInfo?.interest_field}
				onChange={(e) => {
					dispatch({ type: "interest_field", payload: e.target.value });
				}}
			/>
			<TextInput
				label="세부분야"
				value={registrationInfo.interest_field_detail}
				onChange={(e) => {
					dispatch({ type: "interest_field_detail", payload: e.target.value });
				}}
				placeholder=""
			/>
			<MutiCheckboxInput
				label="소속"
				options={[
					"공공기관",
					"대학 및 연구소",
					"산업체",
					"의료기관",
					"정부",
					"기타",
				]}
				value={registrationInfo?.organization_type}
				onChange={(e) => {
					dispatch({ type: "organization_type", payload: e.target.value });
				}}
			/>
			<TextInput
				label="소속기관명"
				value={registrationInfo.organization_name}
				onChange={(e) => {
					dispatch({ type: "organization_name", payload: e.target.value });
				}}
				placeholder="소속기관명"
			/>
			<TextInput
				label="소속기관명 (영문)"
				value={registrationInfo.organization_english_name}
				onChange={(e) => {
					dispatch({
						type: "organization_english_name",
						payload: e.target.value,
					});
				}}
				placeholder="소속기관명 (영문)"
			/>
			<TextInput
				label="소속기관 직위"
				value={registrationInfo.job_position}
				onChange={(e) => {
					dispatch({ type: "job_position", payload: e.target.value });
				}}
				placeholder="소속기관 직위 ex) 전공의, 과장"
			/>
			<TextInput
				label="소재지"
				value={registrationInfo.address}
				onChange={(e) => {
					dispatch({ type: "address", payload: e.target.value });
				}}
				placeholder="서울시 강남구"
			/>
			<MutiCheckboxInput
				label="(최종)학위과정"
				options={[
					"학사 과정 중",
					"학사 수료",
					"석사 과정 중",
					"석사 수료",
					"박사 과정 중",
					"박사 수료",
					"석,박사 통합 과정 중",
					"석,박사 통합 과정 수료",
					"전문학사 수료",
					"기타",
				]}
				value={registrationInfo?.final_degree}
				onChange={(e) => {
					dispatch({ type: "final_degree", payload: e.target.value });
				}}
			/>
			<MutiCheckboxInput
				label="행사 참여 방식"
				options={["현장 참가", "유튜브 라이브 시청", "기타"]}
				value={registrationInfo?.engagement_type}
				onChange={(e) => {
					dispatch({ type: "engagement_type", payload: e.target.value });
				}}
			/>
			<TextInput
				label="행사를 알게된 계기"
				value={registrationInfo.participant_motivation}
				onChange={(e) => {
					dispatch({ type: "participant_motivation", payload: e.target.value });
				}}
				placeholder="지인 추천"
			/>
			<TextInput
				label="기술 구분"
				value={registrationInfo.participant_type}
				onChange={(e) => {
					dispatch({ type: "participant_type", payload: e.target.value });
				}}
				placeholder="기술 구분"
			/>
			<TextInput
				label="타겟 질환 / 범위"
				value={registrationInfo.interest_disease}
				onChange={(e) => {
					dispatch({ type: "interest_disease", payload: e.target.value });
				}}
				placeholder=""
			/>
			<SubmitButton onClick={SubmitHandler} />
		</Page>
	);
};

export default EventRegistrationPage;
