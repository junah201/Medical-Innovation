import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import AdminForm from "../../components/admin/AdminForm";
import Message from "../../components/common/Message";
import AuthContext from "../../context/AuthContext";

import TextInput from "../../components/form/TextInput";
import DateInput from "../../components/form/DateInput";
import SingleFileInput from "./../../components/form/SingleFileInput";

import { API_URL } from "../../utils/const";

const PopupCreatePage = () => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const [title, setTitle] = useState("");
	const [link, setLink] = useState("");
	const [popupStartDate, setPopupStartDate] = useState("2023-01-01");
	const [popupEndDate, setPopupEndDate] = useState("2024-01-01");
	const [file, setFile] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("file", file);
		formData.append("title", title);
		formData.append("link", link);
		formData.append("popup_start_date", popupStartDate);
		formData.append("popup_end_date", popupEndDate);

		axios({
			url: `${API_URL}/api/v1/popup/create`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status === 204) {
				alert("Popup이 업로드 되었습니다.");
				navigate("/admin/popup/all");
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
			alert("Popup 업로드에 실패했습니다.");
			return;
		});
	};

	return (
		<AdminPage>
			<h1>페이지 팝업 생성</h1>
			<Message></Message>
			<AdminForm onSubmit={handleSubmit}>
				<TextInput
					label="팝업 상단 제목"
					placeholder="팝업 상단 제목"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					required="required"
				/>
				<TextInput
					label="이미지 클릭 시 바로가기 링크"
					placeholder="이미지 클릭 시 바로가기 링크"
					value={link}
					onChange={(e) => {
						setLink(e.target.value);
					}}
					required="required"
				/>
				<DateInput
					label="팝업 표시 시작 날짜"
					value={popupStartDate}
					onChange={(e) => {
						setPopupStartDate(e.target.value);
					}}
					required="required"
				/>
				<DateInput
					label="팝업 표시 종료 날짜"
					value={popupEndDate}
					onChange={(e) => {
						setPopupEndDate(e.target.value);
					}}
					required="required"
				/>
				<SingleFileInput
					label="팝업에 표시될 메인 이미지"
					onChange={(e) => {
						setFile(e.target.files[0]);
					}}
					required="required"
					accept="image/*"
				/>
				<br />
				<button type="submit">업로드</button>
			</AdminForm>
		</AdminPage>
	);
};

export default PopupCreatePage;
