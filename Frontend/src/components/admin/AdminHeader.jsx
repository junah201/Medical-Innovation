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
	text-align: center;

	& li {
		border-bottom: 1px solid #ffffff;
	}

	& div {
		background-color: #ffffff;
		padding: 5px;
	}

	& li {
		padding: 8px 0;
	}

	& a {
		color: #ffffff;
		font-size: 16px;
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
			<div>
				<Link to="/">
					<img src="/tight_logo.png" alt="logo" />
				</Link>
			</div>
			<nav>
				<ul>
					<li>
						<Link to="/admin/user/all">회원 목록</Link>
					</li>
					<li>
						<Link to="/admin/post/all">게시물</Link>
					</li>
					<li>
						<Link to="/admin/banner/all">배너</Link>
					</li>
					<li>
						<Link to="/admin/sponsoring_company/all">후원 기업</Link>
					</li>
					<li>
						<Link to="/admin/sponsoring/all">후원 목록</Link>
					</li>
					<li>
						<Link to="/admin/mou/all">Mou 목록</Link>
					</li>
					<li>
						<Link to="/admin/advisor/all">자문단</Link>
					</li>
					<li>
						<Link to="/admin/public_event/all">행사 목록</Link>
					</li>
					<li>
						<Link to="/admin/participant/all">행사 참여자</Link>
					</li>
					<li>
						<Link to="/admin/private_event/all">로그인 필수 행사</Link>
					</li>
					<li>
						<Link to="/admin/private_participant/all">
							로그인 필수 행사 참여자
						</Link>
					</li>
					<li>
						<Link to="/admin/judging_event/all">심사 행사</Link>
					</li>
					<li>
						<Link to="/admin/judging_participant/all">심사 행사 참여자</Link>
					</li>
					<li>
						<Link to="/admin/judging_result/all">심사 결과</Link>
					</li>
					<li>
						<Link to="/admin/ad_email/all">광고 수신 이메일</Link>
					</li>
					<li>
						<Link to="/admin/history/all">연혁</Link>
					</li>
					<li>
						<Link to="/admin/supporting_startup/all">스타트업 지원</Link>
					</li>
					<li>
						<Link to="/admin/popup/all">페이지 팝업</Link>
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
