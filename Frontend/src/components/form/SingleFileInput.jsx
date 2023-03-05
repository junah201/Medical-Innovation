import React from "react";
import styled from "styled-components";

const StyledSingleFileInput = styled.div`
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

	& input[type="file"] {
		background-color: #f5f5f5;
		height: 45px;
		width: 100%;
		padding-left: 10px;
		font-size: 18px;
		border: none;
		border-bottom: 1px solid silver;
	}
`;

const SingleFileInput = ({
	label,
	onChange,
	placeholder,
	required,
	accept,
}) => {
	return (
		<StyledSingleFileInput>
			<label>{label}</label>
			<input
				type="file"
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				accept={accept}
			/>
		</StyledSingleFileInput>
	);
};

export default SingleFileInput;
