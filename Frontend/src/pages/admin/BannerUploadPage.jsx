import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import AdminForm from "../../components/admin/AdminForm";
import Message from "../../components/common/Message";
import AuthContext from "../../context/AuthContext";

import { API_URL } from "../../utils/const";

const BannerUploadPage = () => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const [name, setName] = useState("");
	const [link, setLink] = useState("");
	const [bannerEndAt, setBannerEndAt] = useState("");
	const [file, setFile] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("file", file);
		formData.append("name", name);
		formData.append("link", link || "#");
		formData.append("year", 2023);
		formData.append("banner_end_at", `${bannerEndAt}T00:00:00.000Z`);

		axios({
			url: `${API_URL}/api/v1/banner/create`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status === 204) {
				alert("배너가 업로드 되었습니다.");
				navigate("/admin/banner/all");
				return;
			}
			alert("배너 업로드에 실패했습니다. 다시 시도해주세요.");
		});
	};

	return (
		<AdminPage>
			<h1>배너 업로드</h1>
			<Message>
				tip : 이미지 사이즈는 최대한 가로 200px, 세로 110px로 맞춰주세요. 크기상
				불가능하다면 최대한 가로 세로 비율을 20 : 11로 맞춰주세요.
			</Message>
			<AdminForm onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="회사명"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					required="required"
				/>
				<input
					type="text"
					placeholder="사이트 링크 (만약 없다면 공백으로 넣어주세요.)"
					value={link}
					onChange={(e) => {
						setLink(e.target.value);
					}}
				/>
				<input
					type="date"
					value={bannerEndAt}
					onChange={(e) => {
						setBannerEndAt(e.target.value);
					}}
					placeholder="배너 종료 시점"
					required="required"
				/>
				<input
					type="file"
					onChange={(e) => {
						setFile(e.target.files[0]);
					}}
					required="required"
				/>
				<br />
				<br />
				<button type="submit">업로드</button>
			</AdminForm>
		</AdminPage>
	);
};

export default BannerUploadPage;
