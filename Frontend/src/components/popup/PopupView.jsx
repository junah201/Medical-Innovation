import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setCookie, getCookie } from "utils/cookie";
import { CDN_URL } from "utils/const";
import { useMediaQuery } from "react-responsive";

const StyledPopupView = styled.div`
	position: fixed;
	top: ${(props) => (props.isDesktop ? "120px" : "20%")};
	right: ${(props) => (props.isDesktop ? "100px" : "5%")};
	width: ${(props) => (props.isDesktop ? "600px" : "90%")};
	background-color: rgba(255, 255, 255);
	z-index: 1000;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	border-radius: 3px;
	border: 1px solid black;
`;

const StyledPopupTitle = styled.h1`
	font-size: ${(props) => (props.isDesktop ? "30px" : "25px")};
	text-align: center;
`;

const StyledPopupContent = styled.div`
	border: 1px solid black;
	margin: 0;
	padding: 0%;

	overflow: hidden;

	& img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const StyledCloseButton = styled.button`
	border: none;
	width: 100%;
	padding: 10px;
	background-color: #dedede;
	color: black;
	font-size: 20px;
	font-weight: bold;
`;

const PopupView = ({ title, filename, link }) => {
	const [show, setShow] = useState(0);

	const isDesktop = useMediaQuery({ minWidth: 992 });

	useEffect(() => {
		setShow(!getCookie("closePopup"));
	}, []);

	if (!show) {
		return null;
	}

	return (
		<>
			<StyledPopupView isDesktop={isDesktop}>
				<StyledPopupTitle isDesktop={isDesktop}>{title}</StyledPopupTitle>
				<br />
				<StyledPopupContent>
					<a href={link} target="_blank" rel="noopener noreferrer">
						<img src={`${CDN_URL}/upload/${filename}`} alt={filename}></img>
					</a>
				</StyledPopupContent>
				<StyledCloseButton
					onClick={() => {
						setShow(0);
						setCookie("closePopup", 1, {
							path: "/",
							expires: new Date(Date.now() + 60 * 60 * 24),
							maxAge: 60 * 24,
						});
					}}
				>
					닫기
				</StyledCloseButton>
			</StyledPopupView>
		</>
	);
};

export default PopupView;
