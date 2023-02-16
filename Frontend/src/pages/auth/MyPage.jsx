import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Page from "../../components/common/Page";
import AuthContext from "../../context/AuthContext";
import { API_URL } from "../../utils/const";

import TextInput from "../../components/form/TextInput";
import EmailInput from "../../components/form/EmailInput";
import CheckboxInput from "../../components/form/CheckboxInput";
import DateInput from "../../components/form/DateInput";

const MyPage = () => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [birth, setBirth] = useState("");
	const [emailenable, setEmailenable] = useState(true);

	useEffect(() => {
		if (!authCtx.isLoggedIn) {
			navigate("/");
		}
		axios({
			url: `${API_URL}/api/v1/user/me`,
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				setName(res.data.name);
				setPhone(res.data.phone);
				setEmail(res.data.email);
				setBirth(res.data.birth);
				setEmailenable(res.data.email_enable);
			}
		});
	}, [authCtx, navigate]);

	return (
		<Page>
			<h1>내 정보</h1>
			<TextInput
				label="이름"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<TextInput
				label="휴대폰 번호"
				type="text"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
			/>
			<EmailInput
				label="이메일"
				type="text"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<DateInput
				label="생년월일"
				type="date"
				value={birth}
				onChange={(e) => setBirth(e.target.value)}
			/>
			<CheckboxInput
				label="이메일 수신 여부"
				type="checkbox"
				value={emailenable}
				onChange={(e) => setEmailenable(e.target.value)}
			/>
		</Page>
	);
};

export default MyPage;
