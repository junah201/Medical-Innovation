import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminPage from "components/admin/AdminPage";
import AdminForm from "components/admin/AdminForm";

import AuthContext from "context/AuthContext";
import { API_URL } from "utils/const";
import TextInput from "components/form/TextInput";
import EmailInput from "components/form/EmailInput";
import CheckboxInput from "components/form/CheckboxInput";

const AdEmailCreate = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [subscribe, setSubscribe] = useState(true);
	const [etcInfo, setEtcInfo] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("email", email);
		formData.append("subscribe", subscribe);
		formData.append("etc_info", etcInfo);

		axios({
			url: `${API_URL}/api/v1/ad_email/create`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: {
				email: email,
				subscribe: subscribe,
				etc_info: etcInfo,
			},
		})
			.then((res) => {
				if (res.status === 204) {
					alert("광고 수신 이메일이 업로드 되었습니다.");
					navigate("/admin/ad_email/all");
					return;
				}
				alert("업로드 실패");
			})
			.catch((error) => {
				console.log(error);
				alert("업로드 실패\n\n" + error);
			});
	};

	return (
		<AdminPage>
			<h1>광고 수신 이메일 업로드</h1>
			<AdminForm onSubmit={handleSubmit}>
				<EmailInput
					label="이메일"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					placeholder="이메일"
					required={true}
				/>
				<br />
				<TextInput
					label="기타 정보"
					value={etcInfo}
					onChange={(e) => {
						setEtcInfo(e.target.value);
					}}
					placeholder="기타 정보"
				/>
				<CheckboxInput
					label="구독 여부"
					value={subscribe}
					onChange={(e) => {
						setSubscribe((prev) => !prev);
					}}
					placeholder="구독 여부"
				/>
				<br />

				<button type="submit">업로드</button>
			</AdminForm>
		</AdminPage>
	);
};

export default AdEmailCreate;
