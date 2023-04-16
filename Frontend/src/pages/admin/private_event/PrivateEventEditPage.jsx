import React, { useContext, useReducer, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AdminPage from "components/admin/AdminPage";
import AdminForm from "components/admin/AdminForm";
import Message from "components/common/Message";
import AuthContext from "context/AuthContext";

import { API_URL } from "utils/const";

import TextInput from "components/form/TextInput";
import DescriptionInput from "components/form/DescriptionInput";
import DateInput from "components/form/DateInput";

const PrivateEventEditPage = () => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);
	const params = useParams();

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

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/private_event/get/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				dispatch({ type: "init", payload: res.data });
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
			alert("행사 데이터를 불러오는 것에 실패했습니다.");
			return;
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		for (const key in publicEventCreateInfo) {
			formData.append(key, publicEventCreateInfo[key]);
		}

		axios({
			url: `${API_URL}/api/v1/private_event/update/${params.id}`,
			method: "PUT",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status === 204) {
				alert("행사가 수정되었습니다.");
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
			alert("행사 수정에 실패했습니다.");
			return;
		});
	};

	return (
		<AdminPage>
			<h1>로그인 필수 행사 수정</h1>
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
				<DescriptionInput
					label="행사 설명"
					value={publicEventCreateInfo.description}
					onChange={(e) =>
						dispatch({ type: "description", payload: e.target.value })
					}
					placeholder="행사 설명을 입력해주세요."
				/>
				<button type="submit">수정하기</button>
			</AdminForm>
		</AdminPage>
	);
};

export default PrivateEventEditPage;
