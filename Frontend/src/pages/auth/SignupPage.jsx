import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import { API_URL } from "../../utils/const";
import Footer from "../../components/base/Footer";
import Header from "../../components/base/Header";
import TextInput from "../../components/form/TextInput";
import EmailInput from "../../components/form/EmailInput";
import PasswordInput from "../../components/form/PasswordInput";
import DateInput from "../../components/form/DateInput";
import CheckboxInput from "../../components/form/CheckboxInput";
import BlankDiv from "../../components/common/BlankDiv";

const StyledSignupPage = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

const StyledSignupWrapper = styled.div`
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	padding: 30px 80px;

	width: 410px;
	padding: 30px;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

	@media screen and (max-width: 991px) {
		padding: 15;
		min-height: calc(100vh - 200px);
	}
	@media screen and (min-width: 992px) {
		min-height: calc(100vh - 400px);
	}

	& h1 {
		font-size: 35px;
		font-weight: 600;
		text-align: center;
		border-left: none;
	}

	& button {
		height: 45px;
		margin-top: 10px;
		width: 100%;
		background: #204397;
		border: none;
		color: #ffffff;
		padding: 5px;
		font-size: 18px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 1px;
		cursor: pointer;
	}

	& a {
		text-align: center;
		width: 100%;
	}

	& a:hover {
		text-decoration: underline;
	}

	& p {
		color: red;
		font-size: 16px;
		height: 21px;
		font-weight: 600;
	}
`;

const SignupPage = () => {
	const navigate = useNavigate();

	const authCtx = useContext(AuthContext);

	useEffect(() => {
		if (authCtx.isLoggedIn) {
			navigate("/");
		}
	}, [authCtx, navigate]);

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [birth, setBirth] = useState("");
	const [emailenable, setEmailenable] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	const onSubmitHandler = (e) => {
		setErrorMessage("");
		e.preventDefault();

		if (name === "") {
			return setErrorMessage("이름을 입력해주세요.");
		}

		if (phone === "") {
			return setErrorMessage("휴대폰 번호를 입력해주세요.");
		}

		if (email === "") {
			return setErrorMessage("이메일을 입력해주세요.");
		}

		if (password === "") {
			return setErrorMessage("비밀번호를 입력해주세요.");
		}

		if (confirmPassword === "") {
			return setErrorMessage("비밀번호를 입력해주세요.");
		}

		if (birth === "") {
			return setErrorMessage("비밀번호를 입력해주세요.");
		}

		if (password !== confirmPassword) {
			return setErrorMessage("비밀번호와 비밀번호 확인은 같아야 합니다.");
		}

		let body = {
			name: name,
			phone: phone,
			email: email,
			password: password,
			confirm_password: confirmPassword,
			birth: birth,
			email_enable: emailenable,
		};

		fetch(`${API_URL}/api/v1/user/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((res) => {
			if (res.status === 204) {
				navigate("/login");
				return;
			}
			if (res.status === 409) {
				return setErrorMessage("이미 존재하는 이메일입니다.");
			}
			return setErrorMessage("회원가입에 실패했습니다.");
		});
	};

	return (
		<>
			<Header />
			<StyledSignupPage>
				<StyledSignupWrapper>
					<form onSubmit={onSubmitHandler}>
						<h1>회원가입</h1>
						<BlankDiv height="60px" />
						<TextInput
							label="이름"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							placeholder="홍길동"
							required="required"
						/>
						<TextInput
							label="휴대폰 번호"
							value={phone}
							onChange={(e) => {
								setPhone(e.target.value);
							}}
							placeholder="01012345678"
							required="required"
						/>
						<EmailInput
							label="이메일"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							placeholder="이메일 (아이디)"
							required="required"
						/>
						<PasswordInput
							label="비밀번호"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							placeholder="비밀번호"
							required="required"
						/>
						<PasswordInput
							label="비밀번호 확인"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
							placeholder="비밀번호 확인"
							required="required"
						/>
						<DateInput
							label="생년월일"
							value={birth}
							onChange={(e) => {
								setBirth(e.target.value);
							}}
							placeholder="생년월일"
							required="required"
						/>
						<CheckboxInput
							label="이메일 수신여부"
							value={emailenable}
							onChange={(e) => {
								setEmailenable(e.target.checked);
							}}
							placeholder="이메일 수신여부"
							required="required"
						/>
						<p>{errorMessage}</p>
						<button type="submit">회원가입</button>
					</form>
				</StyledSignupWrapper>
			</StyledSignupPage>
			<Footer />
		</>
	);
};

export default SignupPage;
