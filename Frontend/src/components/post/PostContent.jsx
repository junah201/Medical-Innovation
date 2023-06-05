import React from "react";
import styled from "styled-components";
import "static/css/content-styles.css";

const StyledPostContent = styled.p`
	min-height: calc(100vh - 700px);
	padding: 20px 0;
	white-space: pre-wrap;
	word-break: keep-all;

	& div {
		width: 100%;
	}

	a {
		text-decoration: underline;
	}

	& img {
		width: 100%;
	}

	& .img-container {
		width: 100%;
		display: flex;
	}

	& .right {
		align-items: flex-end;
		justify-content: right;
	}

	& .left {
		align-items: flex-start;
		justify-content: left;
	}

	& .center {
		align-items: center;
		justify-content: center;
	}
`;

const PostContent = ({ content }) => {
	return (
		<StyledPostContent
			className="ck-content"
			dangerouslySetInnerHTML={{ __html: content }}
		></StyledPostContent>
	);
};

export default PostContent;
