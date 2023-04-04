import React from "react";
import styled from "styled-components";
import BlankDiv from "components/common/BlankDiv";

const StyledTextInput = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	padding: 5px;
	transition: background-color 0.2s ease;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;

	& label {
		font-size: 18px;
		display: block;
		width: 100%;
		font-weight: bold;
		margin-bottom: 6px;
	}

	& input[type="email"] {
		background-color: #f5f5f5;
		height: 45px;
		max-width: 600px;
		padding-left: 10px;
		font-size: 18px;
		border: none;
		border-bottom: 3px solid silver;
	}

	& input[type="email"]:focus {
		border-color: #3498db;
		outline: none;
		border-width: 3px;
	}
`;

const TextInput = ({ label, value, onChange, placeholder, required }) => {
	return (
		<StyledTextInput>
			<label>{label}</label>
			<BlankDiv height="20px" />
			<input
				type="email"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
			/>
			<BlankDiv height="80px" />
		</StyledTextInput>
	);
};

export default TextInput;
