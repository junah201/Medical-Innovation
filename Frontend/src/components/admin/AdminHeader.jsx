import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
	background-color: #2763ba;
	display: flex;
	flex-direction: column;
	min-width: 250px;
	height: 100vh;
	padding: 10px;

	& * + * {
		margin-top: 10px;
	}

	& a {
		color: #ffffff;
		font-size: 24px;
	}

	& a:hover {
		color: #ffffff;
		text-decoration: underline;
	}

	& a:active,
	a:focus,
	a:visited {
		color: #ffffff;
	}
`;

const AdminHeader = () => {
	return (
		<StyledHeader>
			<nav>
				<ul>
					<li>
						<Link to="/admin/post/upload">게시물 업로드</Link>
					</li>
					<li>
						<Link to="/admin/posts">게시물 목록</Link>
					</li>
					<li>
						<Link to="/admin/banner/upload">배너 업로드</Link>
					</li>
					<li>
						<Link to="/admin/banners">배너 목록</Link>
					</li>
					<li>
						<Link to="/preparing">후원 기업 업로드</Link>
					</li>
					<li>
						<Link to="/preparing">후원 기업 수정 / 삭제</Link>
					</li>
					<li>
						<Link to="/admin/uesrs">유저 목록</Link>
					</li>
					<li>
						<Link to="/preparing">후원 목록</Link>
					</li>
					<li>
						<Link to="/preparing">기타 설정</Link>
					</li>
				</ul>
			</nav>
		</StyledHeader>
	);
};

export default AdminHeader;
