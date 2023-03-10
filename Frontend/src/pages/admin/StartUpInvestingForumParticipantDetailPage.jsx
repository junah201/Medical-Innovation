import React, { useEffect, useContext, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import { API_URL, CDN_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";
import Message from "../../components/common/Message";
import TextInput from "./../../components/regist/TextInput";
import DateInput from "../../components/regist/DateInput";
import EmailInput from "../../components/regist/EmailInput";
import MutiCheckboxInput from "./../../components/regist/MutiCheckboxInput";

const StartUpInvestingForumParticipantDetailPage = () => {
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
			gender: "??????",
			birth: "2000-01-01",
			phone: "",
			email: "",
			resident_registration_number: "",
			organization_type: "????????????",
			organization_name: "",
			organization_english_name: "",
			job_position: "",
			address: "",
			final_degree: "??????",
			participant_motivation: "",
			profile_filename: "",
			zip_filename: "",
		}
	);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/startup_investing_forum_participant/get/${params.id}`,
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
			<h1>StartUp Investing Forum ????????? ????????????</h1>
			<Message>tip : ...</Message>
			<br />
			<TextInput
				label="??????"
				value={registrationInfo.name}
				onChange={(e) => {
					dispatch({ type: "name", payload: e.target.value });
				}}
				placeholder="?????????"
				required="required"
			/>
			<TextInput
				label="?????? ??????"
				value={registrationInfo.english_name}
				onChange={(e) => {
					dispatch({ type: "english_name", payload: e.target.value });
				}}
				placeholder="?????? X"
			/>
			<MutiCheckboxInput
				label="??????"
				options={["??????", "??????"]}
				value={registrationInfo?.gender}
				onChange={(e) => {
					dispatch({ type: "gender", payload: e.target.value });
				}}
			/>
			<DateInput
				label="????????????"
				value={registrationInfo.birth}
				onChange={(e) => {
					dispatch({ type: "birth", payload: e.target.value });
				}}
			/>
			<TextInput
				label="????????????"
				value={registrationInfo.phone}
				onChange={(e) => {
					dispatch({ type: "phone", payload: e.target.value });
				}}
				placeholder="010xxxxxxxx"
			/>
			<EmailInput
				label="?????????"
				value={registrationInfo.email}
				onChange={(e) => {
					dispatch({ type: "email", payload: e.target.value });
				}}
				placeholder="medical@incovaion.com"
			/>
			<TextInput
				label="??????????????????"
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
				label="??????"
				options={[
					"????????????",
					"?????? ??? ?????????",
					"?????????",
					"????????????",
					"??????",
					"??????",
				]}
				value={registrationInfo?.organization_type}
				onChange={(e) => {
					dispatch({ type: "organization_type", payload: e.target.value });
				}}
			/>
			<TextInput
				label="???????????????"
				value={registrationInfo.organization_name}
				onChange={(e) => {
					dispatch({ type: "organization_name", payload: e.target.value });
				}}
				placeholder="???????????????"
			/>
			<TextInput
				label="??????????????? (??????)"
				value={registrationInfo.organization_english_name}
				onChange={(e) => {
					dispatch({
						type: "organization_english_name",
						payload: e.target.value,
					});
				}}
				placeholder="??????????????? (??????)"
			/>
			<TextInput
				label="???????????? ??????"
				value={registrationInfo.job_position}
				onChange={(e) => {
					dispatch({ type: "job_position", payload: e.target.value });
				}}
				placeholder="???????????? ?????? ex) ?????????, ??????"
			/>
			<TextInput
				label="?????????"
				value={registrationInfo.address}
				onChange={(e) => {
					dispatch({ type: "address", payload: e.target.value });
				}}
				placeholder="????????? ?????????"
			/>
			<MutiCheckboxInput
				label="(??????)????????????"
				options={[
					"?????? ?????? ???",
					"?????? ??????",
					"?????? ?????? ???",
					"?????? ??????",
					"?????? ?????? ???",
					"?????? ??????",
					"???,?????? ?????? ?????? ???",
					"???,?????? ?????? ?????? ??????",
					"???????????? ??????",
					"??????",
				]}
				value={registrationInfo?.final_degree}
				onChange={(e) => {
					dispatch({ type: "final_degree", payload: e.target.value });
				}}
			/>
			<TextInput
				label="????????? ????????? ??????"
				value={registrationInfo.participant_motivation}
				onChange={(e) => {
					dispatch({ type: "participant_motivation", payload: e.target.value });
				}}
				placeholder="?????? ??????"
			/>
			<div>
				<label>????????????</label>
				<a href={`${CDN_URL}/upload/${registrationInfo.profile_filename}`}>
					{registrationInfo.profile_filename}
				</a>
			</div>
			<div>
				<label>????????? ????????????</label>
				<a href={`${CDN_URL}/upload/${registrationInfo.zip_filename}`}>
					{registrationInfo.zip_filename}
				</a>
			</div>
		</AdminPage>
	);
};

export default StartUpInvestingForumParticipantDetailPage;
