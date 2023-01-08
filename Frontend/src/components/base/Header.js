import React from "react";
import styled from "styled-components";

import longLogo from "../../static/images/long_logo.png";

const StyledHeader = styled.header`
	background-color: #ffffff;
`;

const StyledIconWrapper = styled.div`
	display: flex;
	padding: 10px 75px;
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
					<img src={longLogo} width="300px" alt="미래의학연구재단" />
				</a>
			</StyledIconWrapper>
			<StyledNav>
				<StyledUl>
					<HeaderNavLi link="/introduction/founder" text="재단소개" />
					<HeaderNavLi link="/support/instructions" text="후원안내" />
					<HeaderNavLi link="/programs" text="사업소개" />
					<HeaderNavLi link="/news/board" text="재단소식" />
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
