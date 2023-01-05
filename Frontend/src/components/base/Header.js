import React from "react";

import longLogo from "../../static/images/long_logo.png";

const Header = () => {
	return (
		<header
			style={{
				backgroundColor: "#ffffff",
			}}
		>
			<div
				style={{
					display: "flex",
					padding: "10px 75px",
				}}
			>
				<a href="/">
					<img src={longLogo} width="300px" alt="미래의학연구재단" />
				</a>
			</div>
			<nav
				style={{
					height: "100px",
					boxShadow: "0px 4px  20px 0px gray",
				}}
			></nav>
		</header>
	);
};

export default Header;
