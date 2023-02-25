import React from "react";
import styled from "styled-components";
import BlankDiv from "../common/BlankDiv";

const StyledMutiCheckboxInput = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	padding: 5px;
	transition: background-color 0.2s ease;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;

	& > label {
		font-size: 18px;
		display: block;
		width: 100%;
		font-weight: bold;
		margin-bottom: 6px;
	}

	& input[type="radio"] {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 1px solid #999;
	}
`;

const MutiCheckboxInput = ({ label, options, value, onChange }) => {
	return (
		<StyledMutiCheckboxInput>
			<label>{label}</label>
			<BlankDiv height="20px" />
			<div>
				{options.map((option) => {
					return (
						<div key={option}>
							<input
								type="radio"
								value={option}
								checked={value === option}
								onChange={onChange}
							/>
							<label>{option}</label>
						</div>
					);
				})}
			</div>
			<BlankDiv height="80px" />
		</StyledMutiCheckboxInput>
	);
};

export default MutiCheckboxInput;
