import React, { useState, useReducer, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/const";
import { useParams, useNavigate } from "react-router-dom";
import AdminPage from "../../components/admin/AdminPage";
import AdminForm from "../../components/admin/AdminForm";
import AuthContext from "../../context/AuthContext";
import TextInput from "../../components/form/TextInput";
import DateInput from "../../components/form/DateInput";
import DescriptionInput from "../../components/form/DescriptionInput";

const PublicEventEditPage = () => {
	const authCtx = useContext(AuthContext);
	const params = useParams();
	const navigate = useNavigate();

	const [publicEvent, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "init":
					return action.payload;
				case "name":
					return { ...state, name: action.payload };
				case "english_name":
					return { ...state, english_name: action.payload };
				case "description":
					return { ...state, description: action.payload };
				case "start_date":
					return { ...state, start_date: action.payload };
				case "file":
					return { ...state, file: action.payload };
				case "end_date":
					return { ...state, end_date: action.payload };
				case "join_start_date":
					return { ...state, join_start_date: action.payload };
				case "join_end_date":
					return { ...state, join_end_date: action.payload };
				default:
					return state;
			}
		},
		{
			name: "",
			english_name: "",
			description: "",
			file: null,
			start_date: "2000-01-01",
			end_date: "2023-01-01",
			join_start_date: "2000-01-01",
			join_end_date: "2023-01-01",
		}
	);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/public_event/get/${params.id}`,
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
			url: `${API_URL}/api/v1/public_event/update/content/${params.id}`,
			method: "PUT",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: {
				name: publicEvent.name,
				english_name: publicEvent.english_name,
				description: publicEvent.description,
				start_date: publicEvent.start_date,
				end_date: publicEvent.end_date,
				join_start_date: publicEvent.join_start_date,
				join_end_date: publicEvent.join_end_date,
			},
		}).then((res) => {
			if (res.status === 204) {
				alert("수정되었습니다.");
				navigate("/admin/public_event/all");
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
			<h1>공개 행사 수정</h1>
			<AdminForm onSubmit={onSubmit}>
				<TextInput
					label="행사명"
					value={publicEvent.name}
					onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
				/>
				<TextInput
					label="행사명 (영문)"
					value={publicEvent.english_name}
					onChange={(e) =>
						dispatch({ type: "english_name", payload: e.target.value })
					}
				/>
				<DescriptionInput
					label="행사 설명"
					value={publicEvent.description}
					onChange={(e) =>
						dispatch({ type: "description", payload: e.target.value })
					}
					placeholder="행사 설명을 입력해주세요."
				/>
				<DateInput
					label="행사 시작일"
					value={publicEvent.start_date}
					onChange={(e) =>
						dispatch({ type: "start_date", payload: e.target.value })
					}
				/>
				<DateInput
					label="행사 종료일"
					value={publicEvent.end_date}
					onChange={(e) =>
						dispatch({ type: "end_date", payload: e.target.value })
					}
				/>
				<DateInput
					label="행사 참여 신청 시작일"
					value={publicEvent.join_start_date}
					onChange={(e) =>
						dispatch({ type: "join_start_date", payload: e.target.value })
					}
				/>
				<DateInput
					label="행사 참여 신청 종료일"
					value={publicEvent.join_end_date}
					onChange={(e) =>
						dispatch({ type: "join_end_date", payload: e.target.value })
					}
				/>
				<br />
				<button type="submit">수정하기</button>
			</AdminForm>
		</AdminPage>
	);
};

export default PublicEventEditPage;
