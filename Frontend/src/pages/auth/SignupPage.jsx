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
			return setErrorMessage("????????? ??????????????????.");
		}

		if (phone === "") {
			return setErrorMessage("????????? ????????? ??????????????????.");
		}

		if (email === "") {
			return setErrorMessage("???????????? ??????????????????.");
		}

		if (password === "") {
			return setErrorMessage("??????????????? ??????????????????.");
		}

		if (confirmPassword === "") {
			return setErrorMessage("??????????????? ??????????????????.");
		}

		if (birth === "") {
			return setErrorMessage("??????????????? ??????????????????.");
		}

		if (password !== confirmPassword) {
			return setErrorMessage("??????????????? ???????????? ????????? ????????? ?????????.");
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
				return setErrorMessage("?????? ???????????? ??????????????????.");
			}
			return setErrorMessage("??????????????? ??????????????????.");
		});
	};

	return (
		<>
			<Header />
			<StyledSignupPage>
				<StyledSignupWrapper>
					<form onSubmit={onSubmitHandler}>
						<h1>????????????</h1>
						<BlankDiv height="60px" />
						<TextInput
							label="??????"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							placeholder="?????????"
							required="required"
						/>
						<TextInput
							label="????????? ??????"
							value={phone}
							onChange={(e) => {
								setPhone(e.target.value);
							}}
							placeholder="01012345678"
							required="required"
						/>
						<EmailInput
							label="?????????"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							placeholder="????????? (?????????)"
							required="required"
						/>
						<PasswordInput
							label="????????????"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							placeholder="????????????"
							required="required"
						/>
						<PasswordInput
							label="???????????? ??????"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
							placeholder="???????????? ??????"
							required="required"
						/>
						<DateInput
							label="????????????"
							value={birth}
							onChange={(e) => {
								setBirth(e.target.value);
							}}
							placeholder="????????????"
							required="required"
						/>
						<CheckboxInput
							label="????????? ????????????"
							value={emailenable}
							onChange={(e) => {
								setEmailenable(e.target.checked);
							}}
							placeholder="????????? ????????????"
							required="required"
						/>
						<p>{errorMessage}</p>
						<button type="submit">????????????</button>
					</form>
				</StyledSignupWrapper>
			</StyledSignupPage>
			<Footer />
		</>
	);
};

export default SignupPage;
