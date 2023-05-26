import React from "react";
import styled from "styled-components";

const StyledDescriptionInfo = styled.div`
	margin: 12px 0;

	& span {
		font-weight: bold;
		font-size: 20px;
		margin-bottom: 2px;
	}

	& p {
		margin: 0;
		background-color: #f5f5f5;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #e1e1e1;
	}
`;

const DescriptionInfo = ({ title, content }) => {
	return (
		<StyledDescriptionInfo>
			<span>{title}</span>
			<br />
			<p>{content}</p>
		</StyledDescriptionInfo>
	);
};

export default DescriptionInfo;
