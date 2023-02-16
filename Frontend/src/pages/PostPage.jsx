import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import MetaTag from "../components/common/MetaTag";
import Page from "../components/common/Page";
import PostContent from "../components/post/PostContent";

import { API_URL } from "../utils/const";

const PostPage = () => {
	const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [post, setPost] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`${API_URL}/api/v1/post/${params.id}`, {
			method: "GET",
			headers: {
				accept: "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					data.created_at = new Intl.DateTimeFormat("ko", {
						dateStyle: "long",
					}).format(new Date(data.created_at));
					setPost(data);
					if (searchParams.get("type") === "pdf") {
						window.location.href = `https://medical-innovation.s3.ap-northeast-2.amazonaws.com/upload/${data.files[0]}`;
					}
				});
			} else {
				navigate("/404", { replace: true });
			}
		});
	}, [params.id, searchParams, navigate]);

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
					<PostContent content={post.content} />
					{post.files.length ? (
						<StyledPostFiles>
							<span>첨부파일</span>
							{post.files.map((file, index) => {
								return (
									<a
										href={`https://medical-innovation.s3.ap-northeast-2.amazonaws.com/upload/${file}`}
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
