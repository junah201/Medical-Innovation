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

const PublicEventCreatePage = () => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const [publicEventCreateInfo, dispatch] = useReducer(
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

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		for (const key in publicEventCreateInfo) {
			formData.append(key, publicEventCreateInfo[key]);
		}

		axios({
			url: `${API_URL}/api/v1/public_event/create`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status === 204) {
				alert("행사가 생성되었습니다.");
				navigate("/admin/public_event/all");
				return;
			}
			if (res.status === 401) {
				alert("로그인 후 이용해주세요.");
				navigate("/login");
				return;
			}
			alert("행사가 생성에 실패했습니다.");
			return;
		});
	};

	return (
		<AdminPage>
			<h1>공개 행사 업로드</h1>
			<Message></Message>
			<AdminForm onSubmit={handleSubmit}>
				<TextInput
					label="행사명"
					value={publicEventCreateInfo.name}
					onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
				/>
				<TextInput
					label="행사명 (영문)"
					value={publicEventCreateInfo.english_name}
					onChange={(e) =>
						dispatch({ type: "english_name", payload: e.target.value })
					}
				/>
				<DescriptionInput
					label="행사 설명"
					value={publicEventCreateInfo.description}
					onChange={(e) =>
						dispatch({ type: "description", payload: e.target.value })
					}
					placeholder="행사 설명을 입력해주세요."
				/>
				<DateInput
					label="행사 시작일"
					value={publicEventCreateInfo.start_date}
					onChange={(e) =>
						dispatch({ type: "start_date", payload: e.target.value })
					}
				/>
				<DateInput
					label="행사 종료일"
					value={publicEventCreateInfo.end_date}
					onChange={(e) =>
						dispatch({ type: "end_date", payload: e.target.value })
					}
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
				<SingleFileInput
					label="썸네일 이미지"
					onChange={(e) =>
						dispatch({ type: "file", payload: e.target.files[0] })
					}
				/>
				<button type="submit">생성하기</button>
			</AdminForm>
		</AdminPage>
	);
};

export default PublicEventCreatePage;
