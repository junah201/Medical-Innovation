import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import AuthContext from "../../context/AuthContext";
import AdminPage from "../../components/admin/AdminPage";
import Message from "../../components/common/Message";

import { API_URL } from "../../utils/const";
import axios from "axios";

const StyledPostEditPage = styled.div`
	display: flex;
	flex-direction: column;

	& * + * {
		margin-top: 10px;
	}

	& input,
	select {
		width: 800px;
		height: 40px;
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

const SponsoringCompanyEditPage = () => {
	const params = useParams();
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [link, setLink] = useState("");
	const [year, setYear] = useState("");

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/sponsoring_company/get/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				setName(res.data.name);
				setLink(res.data.link);
				setYear(res.data.year);
			}
		});
	}, [params.id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", name);
		formData.append("link", link);
		formData.append("year", year);

		axios({
			url: `${API_URL}/api/v1/sponsoring_company/update/${params.id}`,
			method: "PUT",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: JSON.stringify({
				name: name,
				link: link,
				year: year,
			}),
		}).then((res) => {
			if (res.status === 204) {
				alert("수정되었습니다.");
				navigate("/admin/sponsoring_company/all");
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
			<StyledPostEditPage>
				<h1>후원기업 수정</h1>
				<Message>tip : 파일 변경은 후원기업 삭제 후 재업로드 해주세요!</Message>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="회사명"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						required={true}
					/>
					<br />
					<input
						type="text"
						placeholder="바로가기 링크"
						value={link}
						onChange={(e) => {
							setLink(e.target.value);
						}}
						required={true}
					/>
					<br />
					<input
						type="text"
						placeholder="후원 연도"
						value={year}
						onChange={(e) => {
							setYear(e.target.value);
						}}
						required={true}
					/>
					<br />
					<br />
					<button type="submit">수정하기</button>
				</form>
			</StyledPostEditPage>
		</AdminPage>
	);
};

export default SponsoringCompanyEditPage;
