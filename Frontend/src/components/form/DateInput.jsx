import React from "react";
import styled from "styled-components";

const StyledDateInput = styled.div`
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

	& input[type="date"]:focus + label {
		& label {
			color: #3498db;
		}
	}

	& input[type="date"] {
		background-color: #f5f5f5;
		height: 45px;
		width: 100%;
		padding-left: 10px;
		font-size: 18px;
		border: none;
		border-bottom: 1px solid silver;
	}

	& input[type="date"]:focus {
		border-color: #3498db;
		outline: none;
		border-width: 3px;
	}
`;

const DateInput = ({ label, value, onChange, placeholder, required }) => {
	return (
		<StyledDateInput>
			<label>{label}</label>
			<input
				type="date"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
			/>
		</StyledDateInput>
	);
};

export default DateInput;
