import React from "react";
import styled from "styled-components";

const StyledStatusButton = styled.button`
	display: inline-block;
	padding: 6px 12px;
	margin: 4px;
	border-radius: 8px;
	border: none;
	background-color: ${(props) => props.color};
	color: ${(props) => props.text_color};
	text-align: center;
	font-weight: bold;
`;

const RedStatusButton = ({ children }) => {
	return (
		<StyledStatusButton color="#B1180B" text_color="#ffffff">
			{children}
		</StyledStatusButton>
	);
};

const YellowStatusButton = ({ children }) => {
	return (
		<StyledStatusButton color="#FFD500" text_color="#000000">
			{children}
		</StyledStatusButton>
	);
};

const GreenStatusButton = ({ children }) => {
	return (
		<StyledStatusButton color="#00B118" text_color="#ffffff">
			{children}
		</StyledStatusButton>
	);
};

const BlueStatusButton = ({ children }) => {
	return (
		<StyledStatusButton color="#0066FF" text_color="#ffffff">
			{children}
		</StyledStatusButton>
	);
};

const GrayStatusButton = ({ children }) => {
	return (
		<StyledStatusButton color="#CCCCCC" text_color="#000000">
			{children}
		</StyledStatusButton>
	);
};

export {
	RedStatusButton,
	YellowStatusButton,
	GreenStatusButton,
	BlueStatusButton,
	GrayStatusButton,
};
