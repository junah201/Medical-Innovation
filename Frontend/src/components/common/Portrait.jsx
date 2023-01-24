import React from "react";
import styled from "styled-components";

const StyledPortrait = styled.div`
	border: 1px solid #e1e1e1;
	max-width: 330px;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	padding: 10px;

	& > div > h4 {
		font-size: 20px;
	}

	& img {
		margin: 2px;
		border: 1px solid #e1e1e1;
		object-fit: cover;
		width: 100%;
	}

	@media screen and (max-width: 991px) {
		& > div > h4 {
			font-size: 16px;
		}
		& > div > p > span {
			font-size: 12px;
		}
	}
	@media screen and (min-width: 992px) {
	}
`;

const Portrait = ({ src, alt, name, description }) => {
	return (
		<StyledPortrait>
			<img src={src} alt={alt} />
			<div>
				<h4>{name}</h4>
				<br />
				<p>
					{description.map((item, index) => {
						return (
							<span key={index}>
								{item}
								<br />
							</span>
						);
					})}
				</p>
			</div>
		</StyledPortrait>
	);
};

export default Portrait;
