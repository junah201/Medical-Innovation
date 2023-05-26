import React from "react";
import styled from "styled-components";

const StyledTextInfo = styled.div`
	margin: 12px 0;

	& span {
		font-weight: bold;
		font-size: 20px;
		margin-bottom: 2px;
	}

	& > p {
		margin: 0;
		background-color: #f5f5f5;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #e1e1e1;
	}

	& > span + p {
		margin-top: 8px;
	}
`;

const TextInfo = ({ title, content, children }) => {
	return (
		<StyledTextInfo>
			<span>{title}</span>
			<p>
				{content}
				{children}
			</p>
		</StyledTextInfo>
	);
};

export default TextInfo;
