import React, { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminPage from "components/admin/AdminPage";
import AdminForm from "components/admin/AdminForm";
import Message from "components/common/Message";
import AuthContext from "context/AuthContext";

import { API_URL } from "utils/const";

import TextInput from "components/form/TextInput";
import DescriptionInput from "components/form/DescriptionInput";
import DateInput from "components/form/DateInput";
import SingleFileInput from "components/form/SingleFileInput";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "static/css/content-styles.css";

const JudgingEventCreatePage = () => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const [judgingEventCreateInfo, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "init":
					return action.payload;
				case "name":
					return { ...state, name: action.payload };
				case "description":
					return { ...state, description: action.payload };
				case "file":
					return { ...state, file: action.payload };
				case "join_start_date":
					return { ...state, join_start_date: action.payload };
				case "join_end_date":
					return { ...state, join_end_date: action.payload };
				case "judging_1st_start_date":
					return { ...state, judging_1st_start_date: action.payload };
				case "judging_1st_end_date":
					return { ...state, judging_1st_end_date: action.payload };
				case "judging_2nd_start_date":
					return { ...state, judging_2nd_start_date: action.payload };
				case "judging_2nd_end_date":
					return { ...state, judging_2nd_end_date: action.payload };
				default:
					return state;
			}
		},
		{
			name: "",
			description: "행사 설명을 입력해주세요.",
			join_start_date: "2000-01-01",
			join_end_date: "2023-01-01",
			judging_1st_start_date: "2000-01-01",
			judging_1st_end_date: "2023-01-01",
			judging_2nd_start_date: "2000-01-01",
			judging_2nd_end_date: "2023-01-01",
		}
	);

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		for (const key in judgingEventCreateInfo) {
			formData.append(key, judgingEventCreateInfo[key]);
		}

		axios({
			url: `${API_URL}/api/v1/judging_event/create`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		})
			.then((res) => {
				if (res.status === 204) {
					alert("행사가 생성되었습니다.");
					navigate("/admin/judging_event/all");
					return;
				}
				if (res.status === 401) {
					alert("로그인 후 이용해주세요.");
					navigate("/login");
					return;
				}
				alert("행사가 생성에 실패했습니다.");
				return;
			})
			.catch((err) => {
				console.log(err);
				alert("행사가 생성에 실패했습니다.\n\n" + err.response.data.message);
				return;
			});
	};

	return (
		<AdminPage>
			<h1>심사 행사 생성</h1>
			<Message></Message>
			<AdminForm onSubmit={handleSubmit}>
				<TextInput
					label="행사명"
					value={judgingEventCreateInfo.name}
					onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
				/>
				<CKEditor
					editor={ClassicEditor}
					data=""
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
					onReady={(editor) => {
						// You can store the "editor" and use when it is needed.
						console.log("Editor is ready to use!", editor);
					}}
					onChange={(event, editor) => {
						const data = editor.getData();
						dispatch({ type: "description", payload: data });
					}}
					onBlur={(event, editor) => {
						console.log("Blur.", editor);
					}}
					onFocus={(event, editor) => {
						console.log("Focus.", editor);
					}}
				/>
				<DateInput
					label="행사 참여 신청 시작일"
					value={judgingEventCreateInfo.join_start_date}
					onChange={(e) =>
						dispatch({
							type: "join_start_date",
							payload: e.target.value,
						})
					}
				/>
				<DateInput
					label="행사 참여 신청 종료일"
					value={judgingEventCreateInfo.join_end_date}
					onChange={(e) =>
						dispatch({
							type: "join_end_date",
							payload: e.target.value,
						})
					}
				/>
				<DateInput
					label="1차 심사 시작일"
					value={judgingEventCreateInfo.judging_1st_start_date}
					onChange={(e) =>
						dispatch({
							type: "judging_1st_start_date",
							payload: e.target.value,
						})
					}
				/>
				<DateInput
					label="1차 심사 종료일"
					value={judgingEventCreateInfo.judging_1st_end_date}
					onChange={(e) =>
						dispatch({
							type: "judging_1st_end_date",
							payload: e.target.value,
						})
					}
				/>
				<DateInput
					label="2차 심사 시작일"
					value={judgingEventCreateInfo.judging_2nd_start_date}
					onChange={(e) =>
						dispatch({
							type: "judging_2nd_start_date",
							payload: e.target.value,
						})
					}
				/>
				<DateInput
					label="2차 심사 종료일"
					value={judgingEventCreateInfo.judging_2nd_end_date}
					onChange={(e) =>
						dispatch({
							type: "judging_2nd_end_date",
							payload: e.target.value,
						})
					}
				/>
				<SingleFileInput
					label="썸네일 이미지"
					onChange={(e) =>
						dispatch({
							type: "file",
							payload: e.target.files[0],
						})
					}
				/>
				<button type="submit">생성하기</button>
			</AdminForm>
		</AdminPage>
	);
};

export default JudgingEventCreatePage;
