import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledSingupPage = styled.main`
	display: flex;
	justify-content: center;
	padding: 20px;
`;

const StyledSignupWrapper = styled.div`
	background-color: #ffffff;
`;

const SignupPage = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [birth, setBirth] = useState("");
	const [emailenable, setEmailenable] = useState(true);

	const onNameChangeHandler = (e) => {
		setName(e.target.value);
	};

	const onPhoneChangeHandler = (e) => {
		setPhone(e.target.value);
	};

	const onEmailChangeHandler = (e) => {
		setEmail(e.target.value);
	};

	const onPasswordChangeHandler = (e) => {
		setPassword(e.target.value);
	};

	const onConfirmPasswordChangeHandler = (e) => {
		setConfirmPassword(e.target.value);
	};

	const onBirthChangeHandler = (e) => {
		setBirth(e.target.value);
		console.log(e.target.value);
	};

	const onEmailenableChangeHandler = (e) => {
		setEmailenable(e.target.value);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (name === "") {
			return alert("이름을 입력해주세요.");
		}

		if (phone === "") {
			return alert("휴대폰 번호를 입력해주세요.");
		}

		if (email === "") {
			return alert("이메일을 입력해주세요.");
		}

		if (password === "") {
			return alert("비밀번호를 입력해주세요.");
		}

		if (confirmPassword === "") {
			return alert("비밀번호를 입력해주세요.");
		}

		if (birth === "") {
			return alert("비밀번호를 입력해주세요.");
		}

		if (password !== confirmPassword) {
			return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
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

		fetch(
			"https://port-0-medical-innovation-backend-1jx7m2glcz21n5v.gksl2.cloudtype.app/api/v1/user/create",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			}
		).then((res) => {
			if (res.status === 204) {
				navigate("/login");
				return;
			}
			if (res.status === 409) {
				console.log(res);
				alert("이미 존재하는 이메일입니다.");
				return;
			}
			alert("회원가입에 실패했습니다.");
		});
	};

	return (
		<StyledSingupPage>
			<StyledSignupWrapper>
				<form onSubmit={onSubmitHandler}>
					<h1>회원가입</h1>
					<label>이름</label>
					<input
						type="text"
						value={name}
						onChange={onNameChangeHandler}
						placeholder="이름"
						required="required"
					/>
					<br />
					<label>휴대폰 번호</label>
					<input
						type="tel"
						value={phone}
						onChange={onPhoneChangeHandler}
						placeholder="휴대폰 번호"
						required="required"
					/>
					<br />
					<label>이메일</label>
					<input
						type="email"
						value={email}
						onChange={onEmailChangeHandler}
						placeholder="이메일 (아이디)"
						required="required"
					/>
					<br />
					<label>비밀번호</label>
					<input
						type="password"
						value={password}
						onChange={onPasswordChangeHandler}
						placeholder="비밀번호"
						required="required"
					/>
					<br />
					<label>비밀번호 확인</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={onConfirmPasswordChangeHandler}
						placeholder="비밀번호 확인"
						required="required"
					/>
					<br />
					<label>생년월일</label>
					<input
						type="date"
						value={birth}
						onChange={onBirthChangeHandler}
						placeholder="생년월일"
						required="required"
					/>
					<br />
					<label>이메일 수신여부</label>
					<input
						type="checkbox"
						value={emailenable}
						onChange={onEmailenableChangeHandler}
						placeholder="이메일 수신여부"
						required="required"
					/>
					<br />
					<button type="submit">회원가입</button>
				</form>
			</StyledSignupWrapper>
		</StyledSingupPage>
	);
};

export default SignupPage;
