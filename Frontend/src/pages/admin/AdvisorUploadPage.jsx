import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminPage from "./../../components/admin/AdminPage";
import AdminForm from "../../components/admin/AdminForm";
import Message from "../../components/common/Message";

import AuthContext from "../../context/AuthContext";
import { API_URL } from "../../utils/const";

const AdvisorUploadPage = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [type, setType] = useState("전문심의위원회");
	const [file, setFile] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("file", file);
		formData.append("name", name);
		formData.append("type", type);
		formData.append("description", description);

		axios({
			url: `${API_URL}/api/v1/advisor/create`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status === 204) {
				alert("자문단이 업로드 되었습니다.");
				navigate("/admin/advisor/all");
				return;
			}
			if (res.status === 401) {
				alert("로그인 후 이용해주세요.");
				navigate("/login");
				return;
			}
			alert("업로드 실패");
		});
	};

	return (
		<AdminPage>
			<h1>자문단 업로드</h1>
			<Message>
				tip : 사진은 가로 세로 비율이 3:4가 되도록 맞춰주시지 않으면 페이지에서
				각 이미지의 크기가 다르게 나올 수 있습니다. (사진 앱 혹은 이미지 크기
				조정 사이트에서 이미지 사이즈를 조정해주세요.)
			</Message>
			<AdminForm onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="이름 (성함)"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<br />
				<select
					name="advisorType"
					value={type}
					onChange={(e) => {
						setType(e.target.value);
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
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
				<br />
				<label>사진을 업로드 하지 않으시면 기본 이미지로 업로드 됩니다.</label>
				<input
					type="file"
					onChange={(e) => {
						setFile(e.target.files[0]);
					}}
				/>
				<button type="submit">업로드</button>
			</AdminForm>
		</AdminPage>
	);
};

export default AdvisorUploadPage;
