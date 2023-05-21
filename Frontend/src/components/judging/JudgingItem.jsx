import React from "react";
import styled from "styled-components";

const StyledJudgingItem = styled.div`
	display: grid;
	grid-template-columns: 1fr 12fr;
	grid-gap: 10px;
	padding: 4px;
	border: 1px solid silver;
	margin-bottom: 10px;

	& * {
		word-break: keep-all;
	}

	& > h2 {
		padding: 10px;
		grid-column: 1 / 2;
		grid-row: 1 / 6;
		writing-mode: vertical-lr;
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		border-right: 1px solid silver;
		letter-spacing: 4px;
	}

	& h3 {
		border: 2px solid silver;
		padding: 6px;
	}
`;

const JudgingItem = ({
	division,
	title,
	choices,
	value,
	onChange,
	children,
}) => {
	return (
		<StyledJudgingItem>
			<h2>{division}</h2>
			<h3>{title || children}</h3>
			<div>
				{choices.map((item, index) => {
					return (
						<div key={`${item} ${index}`}>
							<input
								type="radio"
								name={title}
								value={value}
								checked={value === index + 1}
								onChange={() => {
									onChange(index + 1);
								}}
							/>
							<label>{item}</label>
						</div>
					);
				})}
			</div>
		</StyledJudgingItem>
	);
};

export default JudgingItem;
