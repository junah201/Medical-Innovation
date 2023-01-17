import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../utils/cookie";
import AuthContext from "../context/AuthContext";

const StyledLoginPage = styled.main`
	display: flex;
	justify-content: center;
	padding: 20px;
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
		width: 100%;
		background: #204397;
		border: none;
		color: #ffffff;
		padding: 3px;
		font-size: 18px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 1px;
		cursor: pointer;
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

		fetch("http://127.0.0.1:8000/api/v1/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			},
			credentials: "same-origin",
			body: formBody,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status !== "success") {
					return alert(data.detail);
				}
				console.log(data);
				const expirationTime = new Date(
					new Date().getTime() + +data.access_token_expires_in
				);
				authCtx.login(data.access_token, expirationTime);

				navigate("/");
			});
		fetch("http://127.0.0.1:8000/api/v1/user/test", {
			method: "GET",
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
			},
			credentials: "same-origin",
		});
	};

	return (
		<StyledLoginPage>
			<StyledLoginWrapper>
				<form onSubmit={onSubmitHandler}>
					<h1>Login</h1>
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
				</form>
			</StyledLoginWrapper>
		</StyledLoginPage>
	);
};

export default LoginPage;
