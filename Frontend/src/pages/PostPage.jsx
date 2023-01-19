import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import MetaTag from "../components/common/MetaTag";
import Page from "../components/common/Page";

const PostPage = () => {
	const params = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		fetch(
			`https://azlbeqcjuzmdl6ysht4y7v44vm0tybim.lambda-url.ap-northeast-2.on.aws/api/v1/post/${params.id}`,
			{
				method: "GET",
				headers: {
					accept: "application/json",
				},
			}
		).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					data.created_at = new Intl.DateTimeFormat("ko", {
						dateStyle: "long",
					}).format(new Date(data.created_at));
					setPost(data);
				});
			}
		});
	}, [params.id]);

	return (
		<Page>
			{post ? (
				<>
					<MetaTag
						title="재단법인 미래의학연구재단"
						description={post.title}
						url={window.location.href}
					/>
					<h1>{post.title}</h1>
					<StyledPostDetail>
						<span>
							<small>작성자</small>
							{post.author_name}
						</span>
						<span>
							<small>작성일</small> {post.created_at}
						</span>
						<span>
							<small>게시판</small> {post.board.name}
						</span>
					</StyledPostDetail>
					<StyledPostContent>{post.content}</StyledPostContent>
					{post.files.length ? (
						<StyledPostFiles>
							<span>첨부파일</span>
							{post.files.map((file, index) => {
								return (
									<a
										href={`https://azlbeqcjuzmdl6ysht4y7v44vm0tybim.lambda-url.ap-northeast-2.on.aws/api/v1/file/download/${file}`}
										key={index}
									>
										{file}
									</a>
								);
							})}
						</StyledPostFiles>
					) : null}
				</>
			) : null}
		</Page>
	);
};

const StyledPostDetail = styled.div`
	& > span + span {
		margin-left: 10px;
	}

	& small {
		font-size: 12px;
		margin-right: 5px;
	}

	& span {
		font-size: 14px;
	}
`;

const StyledPostContent = styled.p`
	min-height: calc(100vh - 700px);
	padding: 20px 0;
	white-space: pre-wrap;
`;

const StyledPostFiles = styled.div`
	position: relative;
	bottom: 0;
	display: flex;
	flex-direction: column;
	border: 1px solid #474747;
	padding: 5px;
	margin-top: 20px;

	& span {
		font-size: 16px;
		margin-bottom: 20px;
	}

	& a:hover {
		text-decoration: underline;
	}
`;

export default PostPage;
