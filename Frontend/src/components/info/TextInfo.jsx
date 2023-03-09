import React from "react";
import styled from "styled-components";

const StyledTextInfo = styled.div`
	& span {
		font-weight: bold;
		font-size: 16px;
		margin-bottom: 2px;
	}

	& p {
		margin: 0;
		background-color: #f5f5f5;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #e1e1e1;
	}

	& > span + p {
		margin-top: 8px;
	}

	& + & {
		margin-top: 24px;
	}
`;

const TextInfo = ({ title, content }) => {
	return (
		<StyledTextInfo>
			<span>{title}</span>
			<p>{content}</p>
		</StyledTextInfo>
	);
};

export default TextInfo;
