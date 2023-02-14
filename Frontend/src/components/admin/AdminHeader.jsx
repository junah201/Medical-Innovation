import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
	background-color: #2763ba;
	position: fixed;
	display: flex;
	flex-direction: column;
	min-width: 250px;
	min-height: 100vh;
	height: 100%;
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
						<Link to="/admin/uesrs">유저 목록</Link>
					</li>
					<li>
						<Link to="/admin/post/upload">게시물 업로드</Link>
					</li>
					<li>
						<Link to="/admin/post/all">게시물 목록</Link>
					</li>
					<li>
						<Link to="/admin/banner/upload">배너 업로드</Link>
					</li>
					<li>
						<Link to="/admin/banner/all">배너 목록</Link>
					</li>
					<li>
						<Link to="/admin/sponsoring_company/upload">후원 기업 업로드</Link>
					</li>
					<li>
						<Link to="/admin/sponsoring_company/all">후원 기업 목록</Link>
					</li>
					<li>
						<Link to="/admin/sponsoring/all">후원 목록</Link>
					</li>
					<li>
						<Link to="/admin/mou/upload">Mou 업로드</Link>
					</li>
					<li>
						<Link to="/admin/mou/all">Mou 목록</Link>
					</li>
					<li>
						<Link to="/admin/advisor/upload">자문단 업로드</Link>
					</li>
					<li>
						<Link to="/admin/advisor/all">자문단 목록</Link>
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
