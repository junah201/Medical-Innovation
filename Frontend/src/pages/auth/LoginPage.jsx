import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "context/AuthContext";
import { API_URL } from "utils/const";
import Footer from "components/base/Footer";
import Header from "components/base/Header";
import EmailInput from "components/form/EmailInput";
import PasswordInput from "components/form/PasswordInput";
import BlankDiv from "components/common/BlankDiv";

const StyledLoginPage = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;

	@media screen and (max-width: 991px) {
		padding: 15;
		min-height: calc(100vh - 200px);
	}
	@media screen and (min-width: 992px) {
		min-height: calc(100vh - 400px);
	}
`;

const StyledLoginWrapper = styled.div`
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	padding: 30px 80px;

	width: 410px;
	padding: 30px;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

	& form {
		display: flex;
		flex-direction: column;
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
		padding: 5px;
	}

	& a:hover {
		text-decoration: underline;
	}

	& p {
		font-weight: 600;
		color: red;
		font-size: 16px;
		height: 21px;
	}
`;

const LoginPage = () => {
	const navigate = useNavigate();

	const authCtx = useContext(AuthContext);

	useEffect(() => {
		if (authCtx.isLoggedIn) {
			navigate("/");
		}
	}, [authCtx, navigate]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const onSubmitHandler = (e) => {
		e.preventDefault();
		setErrorMessage("로그인 중...");

		if (email === "") {
			return setErrorMessage("이메일을 입력해주세요.");
		}

		if (password === "") {
			return setErrorMessage("비밀번호를 입력해주세요.");
		}

		let body = {
			username: email,
			password: password,
		};

		let formBody = [];
		for (let property in body) {
			let encodedKey = encodeURIComponent(property);
			let encodedValue = encodeURIComponent(body[property]);
			formBody.push(encodedKey + "=" + encodedValue);
		}
		formBody = formBody.join("&");

		axios({
			url: `${API_URL}/api/v1/user/login`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			},
			data: formBody,
		})
			.then((res) => {
				if (res.status === 200) {
					setErrorMessage("로그인 성공 !");
					const expirationTime = new Date(
						new Date().getTime() + +res.data.access_token_expires_in
					);
					authCtx.login(
						res.data.access_token,
						expirationTime,
						res.data.is_admin
					);

					navigate("/");
					return;
				}
				return setErrorMessage(
					"알 수 없는 오류, 다시 시도하거나 관리자에게 문의하세요."
				);
			})
			.catch((err) => {
				if (err.response.status === 400) {
					return setErrorMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
				}
			});
	};

	return (
		<>
			<Header />
			<StyledLoginPage>
				<StyledLoginWrapper>
					<form onSubmit={onSubmitHandler}>
						<h1>로그인</h1>
						<BlankDiv height="60px" />
						<div>
							<EmailInput
								label="이메일"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								placeholder="이메일"
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
						</div>
						<p>{errorMessage}</p>
						<button type="submit">로그인</button>
					</form>
					<div>
						<Link to="/signup">회원가입</Link>
					</div>
				</StyledLoginWrapper>
			</StyledLoginPage>
			<Footer />
		</>
	);
};

export default LoginPage;
