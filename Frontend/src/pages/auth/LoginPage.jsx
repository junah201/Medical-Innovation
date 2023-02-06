import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { API_URL } from "../../utils/const";
import Footer from "../../components/base/Footer";
import Header from "../../components/base/Header";

const StyledLoginPage = styled.main`
	display: flex;
	justify-content: center;
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

	& h1 {
		font-size: 35px;
		font-weight: 600;
		text-align: center;
		border-left: none;
	}

	& div {
		height: 45px;
		width: 100%;
		margin: 40px 0;
	}

	& label {
		font-size: 18px;
		display: block;
		width: 100%;
	}

	& input {
		height: 100%;
		width: 100%;
		padding-left: 10px;
		font-size: 17px;
		border: 1px solid silver;
	}

	& input:focus {
		border-color: #3498db;
		outline: none;
		border-bottom-width: 2px;
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

	const onEmailChangeHandler = (e) => {
		setEmail(e.target.value);
	};

	const onPasswordChangeHandler = (e) => {
		setPassword(e.target.value);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (email === "") {
			return alert("이메일을 입력해주세요.");
		}

		if (password === "") {
			return alert("패스워드를 입력해주세요.");
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

		fetch(`${API_URL}/api/v1/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			},
			body: formBody,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status !== "success") {
					return alert(data.detail);
				}
				const expirationTime = new Date(
					new Date().getTime() + +data.access_token_expires_in
				);
				authCtx.login(data.access_token, expirationTime, data.is_admin);

				navigate("/");
			});
	};

	return (
		<>
			<Header />
			<StyledLoginPage>
				<StyledLoginWrapper>
					<form onSubmit={onSubmitHandler}>
						<h1>로그인</h1>
						<div>
							<label>Email</label>
							<input
								type="text"
								placeholder="이메일"
								value={email}
								onChange={onEmailChangeHandler}
								required="required"
							/>
						</div>
						<div>
							<label>Password</label>
							<input
								type="password"
								placeholder="패스워드"
								value={password}
								onChange={onPasswordChangeHandler}
								required="required"
							/>
						</div>
						<button type="submit">로그인</button>
						<div>
							<Link to="/signup">회원가입</Link>
						</div>
					</form>
				</StyledLoginWrapper>
			</StyledLoginPage>
			<Footer />
		</>
	);
};

export default LoginPage;
