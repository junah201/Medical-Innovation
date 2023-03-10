import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Desktop } from "../responsive/responsive";
import AuthContext from "../../context/AuthContext";

import longLogo from "../../static/images/long_logo.png";

const StyledHeader = styled.header`
	background-color: #ffffff;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

	@media screen and (max-width: 991px) {
		height: 100px;
	}
	@media screen and (min-width: 992px) {
		height: 200px;
	}
`;

const StyledIconWrapper = styled.div`
	display: flex;
	height: 50%;
	justify-content: space-between;
	padding: 0 10%;
	& img {
		height: 100%;
	}

	@media screen and (max-width: 991px) {
		& a {
			font-size: 12px;
		}
	}
	@media screen and (min-width: 992px) {
		& a {
			font-size: 20px;
		}
	}
`;

const StyledLoginHeader = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	align-items: center;
	height: 100%;

	& a {
		text-align: center;
		text-decoration: none;
		justify-content: center;
		align-items: center;
	}

	& a:hover {
		text-decoration: underline;
	}

	& a + a {
		margin-left: 20px;
	}

	& a:link,
	a:visited {
		color: #000000;
	}

	@media screen and (max-width: 991px) {
		& a {
			font-size: 1vw;
		}
	}
	@media screen and (min-width: 992px) {
		& a {
			font-size: 20px;
		}
	}
`;

const StyledNav = styled.nav`
	height: 50%;
	box-shadow: 0px 4px 20px -20px gray;
	display: flex;
	justify-items: center;
	align-items: center;
	justify-content: center;
	padding: 0 200px;
	border-top: 1px solid #454545;

	@media screen and (max-width: 991px) {
		background-color: #214498;
		padding: 0 10%;
	}
`;

const StyledUl = styled.ul`
	display: flex;
	width: 900px;
	justify-content: space-between;
`;

const StyledLi = styled.li`
	display: inline-block;

	& a {
		white-space: nowrap;
		overflow: hidden;
		font-size: 30px;
		font-weight: 500;
		text-decoration: none;
		color: #000000;
	}
	&:hover a {
		text-decoration: underline;
	}

	@media screen and (max-width: 991px) {
		& a {
			font-size: 16px;
			font-weight: 600;
			color: #ffffff;
		}
	}
	@media screen and (min-width: 992px) {
		& a {
			font-size: 30px;
		}
	}
`;

const Header = () => {
	const authCtx = useContext(AuthContext);

	const isLoggedIn = authCtx.isLoggedIn;

	return (
		<>
			<StyledHeader>
				<StyledIconWrapper>
					<Link to="/">
						<img src={longLogo} alt="미래의학연구재단" />
					</Link>
					<StyledLoginHeader>
						{isLoggedIn && (
							<>
								<Link to="/me">마이페이지</Link>
								<Link to="/logout">로그아웃</Link>
							</>
						)}
						{!isLoggedIn && (
							<>
								<Link to="/login">로그인</Link>
								<Desktop>
									<Link to="/signup">회원가입</Link>
								</Desktop>
							</>
						)}
					</StyledLoginHeader>
				</StyledIconWrapper>
				<StyledNav>
					<StyledUl>
						<HeaderNavLi link="/introduction/founder" text="재단소개" />
						<HeaderNavLi link="/programs/event" text="사업소개" />
						<HeaderNavLi link="/news/announcement" text="재단소식" />
						<HeaderNavLi link="/support/sponsorship" text="후원안내" />
					</StyledUl>
				</StyledNav>
			</StyledHeader>
		</>
	);
};

const HeaderNavLi = ({ link, text }) => {
	return (
		<StyledLi>
			<Link to={link}>{text}</Link>
		</StyledLi>
	);
};

export default Header;
