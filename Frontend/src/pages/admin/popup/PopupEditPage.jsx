import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "utils/const";
import { useParams, useNavigate } from "react-router-dom";
import AdminPage from "components/admin/AdminPage";
import AdminForm from "components/admin/AdminForm";
import AuthContext from "context/AuthContext";
import TextInput from "components/form/TextInput";
import DateInput from "components/form/DateInput";

const PopupEditPage = () => {
	const authCtx = useContext(AuthContext);
	const params = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [link, setLink] = useState("");
	const [popupStartDate, setPopupStartDate] = useState("2023-01-01");
	const [popupEndDate, setPopupEndDate] = useState("2024-01-01");

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/popup/get/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				setTitle(res.data.title);
				setLink(res.data.link);
				setPopupStartDate(res.data.popup_start_date);
				setPopupEndDate(res.data.popup_end_date);
				return;
			}
		});
	}, [params.id]);

	const onSubmit = (e) => {
		e.preventDefault();

		axios({
			url: `${API_URL}/api/v1/popup/update/content/${params.id}`,
			method: "PUT",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: {
				title: title,
				link: link,
				popup_start_date: popupStartDate,
				popup_end_date: popupEndDate,
			},
		}).then((res) => {
			if (res.status === 204) {
				alert("수정되었습니다.");
				navigate("/admin/popup/all");
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
			<h1>페이지 팝업 수정</h1>
			<AdminForm onSubmit={onSubmit}>
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
				<br />
				<button type="submit">수정하기</button>
			</AdminForm>
		</AdminPage>
	);
};

export default PopupEditPage;
