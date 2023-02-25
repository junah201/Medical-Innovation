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

	& + & {
		margin-top: 16px;
	}
`;

const TextInfo = ({ title, content }) => {
	return (
		<StyledTextInfo>
			<span>{title}</span>
			<br />
			<p>{content}</p>
		</StyledTextInfo>
	);
};

export default TextInfo;
