import React from "react";
import styled from "styled-components";

const StyledCheckInput = styled.div`
	display: flex;

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

	& input[type="checkbox"] {
		background-color: #f5f5f5;
		padding-left: 10px;
		font-size: 18px;
		border: none;
		height: 20px;
		width: 20px;
	}
`;

const CheckboxInput = ({ label, value, onChange, placeholder, required }) => {
	return (
		<StyledCheckInput>
			<label>{label}</label>
			<input
				type="checkbox"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
			/>
		</StyledCheckInput>
	);
};

export default CheckboxInput;
