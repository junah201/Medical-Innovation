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

	& input[type="file"] {
		background-color: #f5f5f5;
		max-width: 600px;
		padding: 2px;
		padding-left: 10px;
		font-size: 18px;
		border: none;
		border-bottom: 3px solid silver;
	}
`;

const SingleFileInput = ({ label, onChange, accept, onClick }) => {
	return (
		<StyledTextInput>
			<label>{label}</label>
			<BlankDiv height="20px" />
			<input
				type="file"
				onChange={onChange}
				accept={accept}
				onClick={onClick}
			/>
			<BlankDiv height="80px" />
		</StyledTextInput>
	);
};

export default SingleFileInput;
