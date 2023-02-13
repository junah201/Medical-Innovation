import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import { API_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";
import Message from "../../components/common/Message";

const StyledSponsoringCompanyUploadPage = styled.div`
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

const SponsoringCompanyUploadPage = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const [errorMessages, setErrorMessages] = useState(
		"tip : 파일은 20 : 11 비율로 된 사진으로 넣어주세요."
	);

	const [name, setName] = useState("");
	const [link, setLink] = useState("");
	const [file, setFile] = useState("");
	const [year, setYear] = useState(2023);

	const handleSubmit = (e) => {
		e.preventDefault();

		setErrorMessages(`파일 업로드 중...`);

		const formData = new FormData();
		console.log(file);
		formData.append("file", file);
		formData.append("name", name);
		formData.append("link", link || "#");
		formData.append("year", year);

		axios({
			url: `${API_URL}/api/v1/sponsoring_company/create`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			console.log(res);
			if (res.status === 204) {
				alert("후원기업이 업로드 되었습니다.");
				navigate("/admin/sponsoring_company/all");
				return;
			}
			alert("후원기업 업로드에 실패했습니다.");
		});
	};

	return (
		<AdminPage>
			<StyledSponsoringCompanyUploadPage>
				<h1>후원 기업 업로드</h1>
				<Message>{errorMessages}</Message>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="기업명"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						required={true}
					/>
					<input
						type="text"
						placeholder="바로가기 링크 (만약 없을 경우 비워주세요)"
						value={link}
						onChange={(e) => {
							setLink(e.target.value);
						}}
					/>
					<input
						type="text"
						placeholder="후원 연도"
						value={year}
						onChange={(e) => {
							setYear(e.target.value);
						}}
						required={true}
					/>
					<input
						type="file"
						onChange={(e) => {
							setFile(e.target.files[0]);
						}}
						required={true}
					/>
					<br />
					<br />
					<button type="submit">업로드</button>
				</form>
			</StyledSponsoringCompanyUploadPage>
		</AdminPage>
	);
};

export default SponsoringCompanyUploadPage;
