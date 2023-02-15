import React, { useState, useEffect, useReducer, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Message from "../../components/common/Message";

import AdminPage from "./../../components/admin/AdminPage";
import AdminForm from "../../components/admin/AdminForm";
import { API_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";

const AdvisorEditPage = () => {
	const navigate = useNavigate();
	const params = useParams();
	const authCtx = useContext(AuthContext);

	const [advisor, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "init":
					return action.payload;
				case "name":
					return { ...state, name: action.payload };
				case "type":
					return { ...state, type: action.payload };
				case "description":
					return { ...state, description: action.payload };
				default:
					return state;
			}
		},
		{
			id: 0,
			name: "",
			type: "",
			filename: "",
			description: "",
			created_at: "",
			updated_at: "",
		}
	);

	const [file, setFile] = useState(null);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/advisor/get/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				dispatch({ type: "init", payload: res.data });
				console.log(res.data);
				return;
			}
			alert("자문단 정보를 불러오는데 실패했습니다.");
			navigate("/admin/advisor/all");
			return;
		});
	}, [params.id, navigate]);

	const handleContentChange = (e) => {
		e.preventDefault();

		axios({
			url: `${API_URL}/api/v1/advisor/update/content/${params.id}`,
			method: "PUT",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: JSON.stringify({
				name: advisor.name,
				type: advisor.type,
				description: advisor.description,
			}),
		}).then((res) => {
			if (res.status === 204) {
				alert("자문단 내용이 수정되었습니다.");
				navigate("/admin/advisor/all");
				return;
			}
			if (res.status === 401) {
				alert("로그인 후 이용해주세요.");
				navigate("/login");
				return;
			}
			alert("자문단 내용 수정에 실패했습니다.");
		});
	};

	const handleFileChange = (e) => {
		e.preventDefault();

		if (file === null) {
			axios({
				url: `${API_URL}/api/v1/advisor/update/file/${params.id}`,
				method: "PUT",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${authCtx.accessToken}`,
				},
				data: JSON.stringify({
					filename: "defualt_user.png",
				}),
			});
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		axios({
			url: `${API_URL}/api/v1/file/upload`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			axios({
				url: `${API_URL}/api/v1/advisor/update/file/${params.id}`,
				method: "PUT",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${authCtx.accessToken}`,
				},
				data: JSON.stringify({
					filename: res.data.filenames,
				}),
			}).then((res) => {
				if (res.status === 204) {
					alert("자문단이 업로드 되었습니다.");
					navigate("/admin/advisor/all");
					return;
				}
			});
		});
	};

	return (
		<AdminPage>
			<h1>자문단 내용 수정</h1>
			<Message>...</Message>
			<AdminForm onSubmit={handleContentChange}>
				<input
					type="text"
					placeholder="이름 (성함)"
					value={advisor.name}
					onChange={(e) => {
						dispatch({ type: "name", payload: e.target.value });
					}}
				/>
				<br />
				<select
					name="advisorType"
					value={advisor.type}
					onChange={(e) => {
						dispatch({ type: "type", payload: e.target.value });
					}}
				>
					<option value="전문심의위원회">전문심의위원회</option>
					<option value="자문위원회">자문위원회</option>
					<option value="창업기획자 전문가그룹장">
						창업기획자 전문가그룹장
					</option>
					<option value="창업기획자 전문가그룹 자문단">
						창업기획자 전문가그룹 자문단
					</option>
				</select>
				<br />
				<textarea
					type="text"
					placeholder="해당 인물에 대한 설명을 ,을 기준으로 나누어 입력해주세요. 예시) A기업 대표,B기업 고문,A대 졸업"
					value={advisor.description}
					onChange={(e) => {
						dispatch({ type: "description", payload: e.target.value });
					}}
				/>
				<br />
				<button type="submit">수정하기</button>
			</AdminForm>
			<br />
			<h1>자문단 이미지 수정</h1>
			<Message>파일을 선택하지 않을 경우 기본 이미지로 변경됩니다.</Message>
			<AdminForm onSubmit={handleFileChange}>
				<input
					type="file"
					onChange={(e) => {
						setFile(e.target.files[0]);
					}}
				/>
				<br />
				<button type="submit">수정하기</button>
			</AdminForm>
		</AdminPage>
	);
};

export default AdvisorEditPage;
