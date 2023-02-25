import React from "react";
import styled from "styled-components";

const StyledTextInput = styled.div`
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

	& textarea {
		background-color: #f5f5f5;
		width: 100%;
		padding-left: 10px;
		font-size: 18px;
		border: none;
		border-bottom: 1px solid silver;
	}

	& textarea:focus {
		border-color: #3498db;
		outline: none;
		border-width: 3px;
	}
`;

const DescriptionInput = ({
	label,
	value,
	onChange,
	placeholder,
	required,
}) => {
	return (
		<StyledTextInput>
			<label>{label}</label>
			<textarea value={value} onChange={onChange} placeholder={placeholder} />
		</StyledTextInput>
	);
};

export default DescriptionInput;
