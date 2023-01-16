import React from "react";
import styled from "styled-components";

import longLogo from "../../static/images/long_logo.png";
import BlankDiv from "./../common/BlankDiv";

const StyledHeader = styled.header`
	background-color: #ffffff;
`;

const StyledIconWrapper = styled.div`
	display: flex;
	padding: 10px 75px;

	& img {
		width: calc(100vw / 5);
	}
`;

const StyledLoginHeader = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	align-items: center;

	& a {
		text-align: center;
		text-decoration: none;
		font-size: 20px;
		justify-content: center;
		align-items: center;
	}

	& a:hover {
		text-decoration: underline;
	}

	& a + a {
		margin-left: 20px;
	}
`;

const StyledNav = styled.nav`
	height: 100px;
	box-shadow: 0px 4px 20px -20px gray;
	display: flex;
	justify-items: center;
	align-items: center;
	justify-content: center;
	padding: 0 200px;
	border-top: 1px solid #454545;
`;

const StyledUl = styled.ul`
	display: flex;
	width: 900px;
	justify-content: space-between;
`;

const StyledLi = styled.li`
	display: inline-block;

	& a {
		font-size: 30px;
		font-weight: 500;
		text-decoration: none;
		color: #000000;
	}
`;

const Header = () => {
	return (
		<StyledHeader>
			<StyledIconWrapper>
				<a href="/">
					<img src={longLogo} alt="미래의학연구재단" />
				</a>
				<StyledLoginHeader>
					<a href="/login">로그인</a>
					<a href="/signup">회원가입</a>
				</StyledLoginHeader>
			</StyledIconWrapper>
			<StyledNav>
				<StyledUl>
					<HeaderNavLi link="/introduction/founder" text="재단소개" />
					<HeaderNavLi link="/support/sponsorship" text="후원안내" />
					<HeaderNavLi link="/programs/openinnovation" text="사업소개" />
					<HeaderNavLi link="/news/announcement" text="재단소식" />
					<HeaderNavLi link="/introduction/founder" text="알림마당" />
				</StyledUl>
			</StyledNav>
		</StyledHeader>
	);
};

const HeaderNavLi = ({ link, text }) => {
	return (
		<StyledLi>
			<a href={link}>{text}</a>
		</StyledLi>
	);
};

export default Header;
