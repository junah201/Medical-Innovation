import React, { useState } from "react";
import styled from "styled-components";

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

	& h1 {
		font-size: 30px;
		border-left: 5px solid #204397;
		padding-left: 10px;
		margin-bottom: 20px;
	}
`;

const LoginPage = () => {
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

		fetch("http://localhost:8000/api/v1/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			},
			body: formBody,
		}).then((res) => {
			if (res.status === 200) {
				return alert("로그인 성공");
			}
			if (res.status === 401) {
				return alert("아이디 혹은 비밀번호가 틀렸습니다.");
			}
			return alert("로그인 실패");
		});
	};

	return (
		<StyledLoginPage>
			<StyledLoginWrapper>
				<form onSubmit={onSubmitHandler}>
					<h1>Login</h1>
					<input
						type="text"
						placeholder="이메일"
						value={email}
						onChange={onEmailChangeHandler}
						required="required"
					/>
					<br />
					<input
						type="password"
						placeholder="패스워드"
						value={password}
						onChange={onPasswordChangeHandler}
						required="required"
					/>
					<br />
					<button type="submit">로그인</button>
				</form>
			</StyledLoginWrapper>
		</StyledLoginPage>
	);
};

export default LoginPage;
