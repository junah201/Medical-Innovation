import React, { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminPage from "components/admin/AdminPage";
import AdminForm from "components/admin/AdminForm";
import Message from "components/common/Message";
import AuthContext from "context/AuthContext";

import { API_URL } from "utils/const";

import TextInput from "components/form/TextInput";
import DateInput from "components/form/DateInput";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "static/css/content-styles.css";

const PrivateEventCreatePage = () => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const [publicEventCreateInfo, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "init":
					return action.payload;
				case "name":
					return { ...state, name: action.payload };
				case "join_start_date":
					return { ...state, join_start_date: action.payload };
				case "join_end_date":
					return { ...state, join_end_date: action.payload };
				case "description":
					return { ...state, description: action.payload };
				default:
					return state;
			}
		},
		{
			name: "",
			join_start_date: "",
			join_end_date: "",
			description: "",
		}
	);

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		for (const key in publicEventCreateInfo) {
			formData.append(key, publicEventCreateInfo[key]);
		}

		axios({
			url: `${API_URL}/api/v1/private_event/create`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status === 204) {
				alert("행사가 생성되었습니다.");
				navigate("/admin/private_event/all");
				return;
			}
			if (res.status === 401) {
				alert("로그인 후 이용해주세요.");
				navigate("/login");
				return;
			}
			if (res.status === 403) {
				alert("관리자 권한이 없습니다.");
				navigate("/");
				return;
			}
			alert("행사가 생성에 실패했습니다.");
			return;
		});
	};

	return (
		<AdminPage>
			<h1>로그인 필수 행사 생성</h1>
			<Message></Message>
			<AdminForm onSubmit={handleSubmit}>
				<TextInput
					label="행사명"
					value={publicEventCreateInfo.name}
					onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
				/>
				<DateInput
					label="행사 참여 신청 시작일"
					value={publicEventCreateInfo.join_start_date}
					onChange={(e) =>
						dispatch({ type: "join_start_date", payload: e.target.value })
					}
				/>
				<DateInput
					label="행사 참여 신청 종료일"
					value={publicEventCreateInfo.join_end_date}
					onChange={(e) =>
						dispatch({ type: "join_end_date", payload: e.target.value })
					}
				/>
				<CKEditor
					editor={ClassicEditor}
					data={publicEventCreateInfo.description}
					config={{
						mediaEmbed: {
							previewsInData: true,
						},
						heading: {
							options: [
								{
									model: "paragraph",
									view: "p",
									title: "본문",
									class: "ck-heading_paragraph",
								},
								{
									model: "heading1",
									view: "h1",
									title: "헤더1",
									class: "ck-heading_heading1",
								},
								{
									model: "heading2",
									view: "h2",
									title: "헤더2",
									class: "ck-heading_heading2",
								},
								{
									model: "heading3",
									view: "h3",
									title: "헤더3",
									class: "ck-heading_heading3",
								},
							],
						},
					}}
					onChange={(event, editor) => {
						const data = editor.getData();
						dispatch({ type: "description", payload: data });
					}}
				/>
				<button type="submit">생성하기</button>
			</AdminForm>
		</AdminPage>
	);
};

export default PrivateEventCreatePage;
