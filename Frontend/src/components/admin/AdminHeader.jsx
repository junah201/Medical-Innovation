import React from "react";
import styled from "styled-components";

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
						<a href="/admin/post_upload">게시물 업로드</a>
					</li>
					<li>
						<a href="/preparing">배너 업로드</a>
					</li>
					<li>
						<a href="/preparing">배너 수정 / 삭제</a>
					</li>
					<li>
						<a href="/preparing">후원 기업 업로드</a>
					</li>
					<li>
						<a href="/preparing">후원 기업 수정 / 삭제</a>
					</li>
					<li>
						<a href="/admin/uesrs">유저 목록</a>
					</li>
					<li>
						<a href="/preparing">후원 목록</a>
					</li>
					<li>
						<a href="/preparing">기타 설정</a>
					</li>
				</ul>
			</nav>
		</StyledHeader>
	);
};

export default AdminHeader;
