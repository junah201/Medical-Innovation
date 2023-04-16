import React, { useEffect, useContext, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AdminPage from "components/admin/AdminPage";
import { API_URL, CDN_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import Message from "components/common/Message";
import TextInput from "components/regist/TextInput";
import DateInput from "components/regist/DateInput";
import EmailInput from "components/regist/EmailInput";
import MutiCheckboxInput from "components/regist/MutiCheckboxInput";

const PrivateParticipantDetailPage = () => {
	const authCtx = useContext(AuthContext);
	const params = useParams();

	const [registrationInfo, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "init":
					return action.payload;
				case "event_id":
					return { ...state, event_id: action.payload };
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
				case "resident_registration_number":
					return { ...state, resident_registration_number: action.payload };
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
				case "participant_motivation":
					return { ...state, participant_motivation: action.payload };
				case "profile_filename":
					return { ...state, profile_filename: action.payload };
				case "zip_filename":
					return { ...state, zip_filename: action.payload };
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
			resident_registration_number: "",
			organization_type: "공공기관",
			organization_name: "",
			organization_english_name: "",
			job_position: "",
			address: "",
			final_degree: "기타",
			participant_motivation: "",
			profile_filename: "",
			zip_filename: "",
		}
	);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/private_participant/get/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			dispatch({
				type: "init",
				payload: res.data,
			});
		});
	}, [authCtx.accessToken, params.id]);

	return (
		<AdminPage>
			<h1>로그인 필수 행사 참여자 상세정보</h1>
			<Message>tip : ...</Message>
			<br />
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
			<TextInput
				label="주민등록번호"
				value={registrationInfo.resident_registration_number}
				onChange={(e) => {
					dispatch({
						type: "resident_registration_number",
						payload: e.target.value,
					});
				}}
				placeholder="xxxxxx-xxxxxxx"
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
			<TextInput
				label="행사를 알게된 계기"
				value={registrationInfo.participant_motivation}
				onChange={(e) => {
					dispatch({ type: "participant_motivation", payload: e.target.value });
				}}
				placeholder="지인 추천"
			/>
			<div>
				<label>증명사진</label>
				<a href={`${CDN_URL}/upload/${registrationInfo.profile_filename}`}>
					{registrationInfo.profile_filename}
				</a>
			</div>
			<div>
				<label>제출용 압축파일</label>
				<a href={`${CDN_URL}/upload/${registrationInfo.zip_filename}`}>
					{registrationInfo.zip_filename}
				</a>
			</div>
		</AdminPage>
	);
};

export default PrivateParticipantDetailPage;
