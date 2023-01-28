import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import Message from "../../components/common/Message";
import AuthContext from "../../context/AuthContext";

import { API_URL } from "../../utils/const";

const StyledBannerUploadForm = styled.form`
	display: flex;
	flex-direction: column;

	& * + * {
		margin-top: 10px;
	}

	& input,
	select {
		width: 800px;
		height: 30px;
		padding: 3px;
		font-size: 16px;
	}

	& textarea {
		width: 800px;
		height: 400px;
		padding: 3px;
	}

	& button {
		padding: 10px 20px;
		font-size: 20px;
		font-weight: 600;
		margin: auto 0;
		background-color: #ffffff;
	}
`;

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

		axios({
			url: `${API_URL}/api/v1/file/banner/file`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			console.log(res);
			console.log(res.data);
			console.log(res.data.filename);
			fetch(`${API_URL}/api/v1/file/banner`, {
				method: "POST",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${authCtx.accessToken}`,
				},
				body: JSON.stringify({
					name: name,
					link: link,
					banner_end_at: `${bannerEndAt}T00:00:00.000Z`,
					filename: res.data.filename,
					year: 2023,
				}),
			}).then((res) => {
				console.log(res);
				if (res.status === 204) {
					alert("배너가 업로드 되었습니다.");
					navigate("/admin/banners");
				}
			});
		});
	};

	return (
		<AdminPage>
			<h1>배너 업로드</h1>
			<Message>
				tip : 이미지 사이즈는 최대한 가로 200px, 세로 110px로 맞춰주세요. 크기상
				불가능하다면 최대한 가로 세로 비율을 20 : 11로 맞춰주세요.
			</Message>
			<StyledBannerUploadForm onSubmit={handleSubmit}>
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
			</StyledBannerUploadForm>
		</AdminPage>
	);
};

export default BannerUploadPage;
