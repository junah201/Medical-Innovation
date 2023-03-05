import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setCookie, getCookie } from "../../utils/cookie";
import { S3_URL } from "../../utils/const";

const StyledPopupView = styled.div`
	position: fixed;
	top: 120px;
	right: 100px;
	width: 600px;
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

const StyledPopupTitle = styled.h1``;

const StyledPopupContent = styled.div`
	border: 1px solid black;

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
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(!getCookie("closePopup"));
		console.log(!getCookie("closePopup"));
	}, []);

	return (
		<>
			{show ? (
				<StyledPopupView>
					<StyledPopupTitle>{title}</StyledPopupTitle>
					<StyledPopupContent>
						<a href={link} target="_blank" rel="noopener noreferrer">
							<img src={`${S3_URL}/upload/${filename}`} alt={filename}></img>
						</a>
					</StyledPopupContent>
					<StyledCloseButton
						onClick={() => {
							setShow(false);
						}}
					>
						닫기
					</StyledCloseButton>
				</StyledPopupView>
			) : null}
		</>
	);
};

export default PopupView;
