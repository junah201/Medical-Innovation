import React from "react";
import styled from "styled-components";

const StyledPasswordInput = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	margin: 25px 0;
	padding: 5px;
	background-color: #f5f5f5;
	transition: background-color 0.2s ease;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;

	& label {
		font-size: 16px;
		display: block;
		width: 100%;
	}

	& input[type="password"] {
		background-color: #f5f5f5;
		height: 45px;
		width: 100%;
		padding-left: 10px;
		font-size: 18px;
		border: none;
		border-bottom: 1px solid silver;
	}

	& input[type="password"]:focus {
		border-color: #3498db;
		outline: none;
		border-width: 3px;
	}
`;

const PasswordInput = ({ label, value, onChange, placeholder, required }) => {
	return (
		<StyledPasswordInput>
			<label>{label}</label>
			<input
				type="password"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
			/>
		</StyledPasswordInput>
	);
};

export default PasswordInput;
