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

const PostEditPage = () => {
	const params = useParams();
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [link, setLink] = useState("");
	const [bannerEndAt, setBannerEndAt] = useState("");

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/banner/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				setName(res.data.name);
				setLink(res.data.link);
				setBannerEndAt(res.data.banner_end_at.slice(0, 10));
			}
		});
	}, [params.id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		axios({
			url: `${API_URL}/api/v1/banner/${params.id}`,
			method: "PUT",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: {
				name: name,
				link: link,
				banner_end_at: `${bannerEndAt}T00:00:00.000Z`,
			},
		}).then((res) => {
			if (res.status === 204) {
				alert("수정되었습니다.");
				navigate(-1);
				return;
			}
			alert("수정에 실패했습니다.");
		});
	};

	return (
		<AdminPage>
			<StyledPostEditPage>
				<h1>배너 수정</h1>
				<Message>tip : 파일 변경은 배너 삭제 후 재업로드 해주세요!</Message>
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
					<input
						type="text"
						placeholder="바로가기 링크"
						value={link}
						onChange={(e) => {
							setLink(e.target.value);
						}}
						required={true}
					/>
					<input
						type="date"
						value={bannerEndAt}
						onChange={(e) => {
							setBannerEndAt(e.target.value);
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

export default PostEditPage;
