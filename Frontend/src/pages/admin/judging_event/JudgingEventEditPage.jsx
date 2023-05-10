import React, { useReducer, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "utils/const";
import { useParams, useNavigate } from "react-router-dom";
import AdminPage from "components/admin/AdminPage";
import AdminForm from "components/admin/AdminForm";
import AuthContext from "context/AuthContext";
import TextInput from "components/form/TextInput";
import DateInput from "components/form/DateInput";
import DescriptionInput from "components/form/DescriptionInput";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "static/css/content-styles.css";

const JudgingEventEditPage = () => {
	const authCtx = useContext(AuthContext);
	const params = useParams();
	const navigate = useNavigate();

	const [judgingEvent, dispatch] = useReducer(
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
			description: "",
			file: null,
			join_start_date: "2000-01-01",
			join_end_date: "2023-01-01",
			judging_1st_start_date: "2000-01-01",
			judging_1st_end_date: "2023-01-01",
			judging_2nd_start_date: "2000-01-01",
			judging_2nd_end_date: "2023-01-01",
		}
	);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/judging_event/get/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			dispatch({ type: "init", payload: res.data });
			console.log(res.data);
		});
	}, [authCtx, params.id]);

	const onSubmit = (e) => {
		e.preventDefault();

		axios({
			url: `${API_URL}/api/v1/judging_event/update/content/${params.id}`,
			method: "PUT",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: {
				name: judgingEvent.name,
				english_name: judgingEvent.english_name,
				description: judgingEvent.description,
				start_date: judgingEvent.start_date,
				end_date: judgingEvent.end_date,
				join_start_date: judgingEvent.join_start_date,
				join_end_date: judgingEvent.join_end_date,
				judging_1st_start_date: judgingEvent.judging_1st_start_date,
				judging_1st_end_date: judgingEvent.judging_1st_end_date,
				judging_2nd_start_date: judgingEvent.judging_2nd_start_date,
				judging_2nd_end_date: judgingEvent.judging_2nd_end_date,
			},
		}).then((res) => {
			if (res.status === 204) {
				alert("수정되었습니다.");
				navigate("/admin/judging_event/all");
				return;
			}
			if (res.status === 401) {
				alert("로그인 후 이용해주세요.");
				navigate("/login");
				return;
			}
			alert("수정에 실패했습니다.");
		});
	};

	return (
		<AdminPage>
			<h1>심사 행사 수정</h1>
			<AdminForm onSubmit={onSubmit}>
				<TextInput
					label="행사명"
					value={judgingEvent.name}
					onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
				/>
				<CKEditor
					editor={ClassicEditor}
					data={judgingEvent.description}
					config={{
						mediaEmbed: {
							previewsInData: true,
						},
						toolbar: ["heading", "|", "bold", "italic", "link"],
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
					onReady={(editor) => {}}
					onChange={(event, editor) => {
						const data = editor.getData();
						dispatch({ type: "description", payload: data });
					}}
				/>
				<DateInput
					label="행사 참여 신청 시작일"
					value={judgingEvent.join_start_date}
					onChange={(e) =>
						dispatch({
							type: "join_start_date",
							payload: e.target.value,
						})
					}
				/>
				<DateInput
					label="행사 참여 신청 종료일"
					value={judgingEvent.join_end_date}
					onChange={(e) =>
						dispatch({
							type: "join_end_date",
							payload: e.target.value,
						})
					}
				/>
				<DateInput
					label="1차 심사 시작일"
					value={judgingEvent.judging_1st_start_date}
					onChange={(e) =>
						dispatch({
							type: "judging_1st_start_date",
							payload: e.target.value,
						})
					}
				/>
				<DateInput
					label="1차 심사 종료일"
					value={judgingEvent.judging_1st_end_date}
					onChange={(e) =>
						dispatch({
							type: "judging_1st_end_date",
							payload: e.target.value,
						})
					}
				/>
				<DateInput
					label="2차 심사 시작일"
					value={judgingEvent.judging_2nd_start_date}
					onChange={(e) =>
						dispatch({
							type: "judging_2nd_start_date",
							payload: e.target.value,
						})
					}
				/>
				<DateInput
					label="2차 심사 종료일"
					value={judgingEvent.judging_2nd_end_date}
					onChange={(e) =>
						dispatch({
							type: "judging_2nd_end_date",
							payload: e.target.value,
						})
					}
				/>
				<br />
				<button type="submit">수정하기</button>
			</AdminForm>
		</AdminPage>
	);
};

export default JudgingEventEditPage;
