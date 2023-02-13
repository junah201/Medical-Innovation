import React from "react";
import styled from "styled-components";

const StyledPostContent = styled.p`
	min-height: calc(100vh - 700px);
	padding: 20px 0;
	white-space: pre-wrap;

	& div {
		width: 100%;
	}

	a {
		text-decoration: underline;
	}
`;

const PostContent = ({ content }) => {
	return (
		<StyledPostContent
			dangerouslySetInnerHTML={{ __html: content }}
		></StyledPostContent>
	);
};

export default PostContent;
