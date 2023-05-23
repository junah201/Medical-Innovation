import React from "react";
import styled from "styled-components";

import { API_URL, CDN_URL } from "utils/const";
import { Link } from "react-router-dom";

const StyledEvents = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 15px;
	grid-gap: 30px;

	@media screen and (max-width: 991px) {
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 8px;
	}
	@media screen and (min-width: 450px) and (max-width: 991px) {
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 10px;
	}
	@media screen and (min-width: 992px) and (max-width: 1249px) {
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 30px;
	}
	@media screen and (min-width: 1250px) {
	}

	@media screen and (max-width: 688px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

const Events = ({ events, itemToLink }) => {
	return (
		<StyledEvents>
			{events.map((item) => {
				return <EventItem key={item.id} item={item} itemToLink={itemToLink} />;
			})}
		</StyledEvents>
	);
};

const StyledEventItem = styled.div`
	border: ${({ theme }) => theme.borderOption};
	border-radius: 10px;
	padding: 15px;
	width: 100%;
	min-width: 300px;
	overflow: hidden;

	& div {
		height: 200px;
		overflow: hidden;
		border: ${({ theme }) => theme.borderOption};
		border-radius: 10px;
	}

	& img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	& h2 {
		font-size: 20px;
		height: 56px;
		overflow: hidden;

		text-overflow: ellipsis;
		word-wrap: brek-word;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		/* Text 한 줄로 바꾸고 싶으면 아래의 설정으로 변경 */
		//height: 28px;
		//-webkit-line-clamp: 1;
	}

	& span {
		font-size: 16px;
		color: ${({ theme }) => theme.transparentColor};
	}

	@media screen and (max-width: 991px) {
		height: 300px;

		& div {
			height: 150px;
			overflow: hidden;
			border: ${({ theme }) => theme.borderOption};
			border-radius: 10px;
		}

		& img {
			object-fit: cover;
			width: 100%;
			height: 100%;
		}

		& h2 {
			font-size: 16px;
			word-break: keep-all;
		}
	}
	/* 
  @media screen and (max-width: 450px) {
    width: 150px;
  } */
`;

const EventItem = ({ item, itemToLink }) => {
	return (
		<EventLink to={itemToLink(item)}>
			<StyledEventItem>
				<div>
					<img
						src={`${CDN_URL}/upload/${
							item.thumbnail_filename ? item.thumbnail_filename : "null.png"
						}`}
						alt={item.name}
					/>
				</div>
				<br />
				<span>{item.start_date || item.join_start_date}</span>
				<h2>{item.name}</h2>
				<Link to={itemToLink(item)}>참가신청 바로가기</Link>
			</StyledEventItem>
		</EventLink>
	);
};

export default Events;

const EventLink = styled(Link)`
	border-radius: 10px;
	transition: ease-in-out 0.15s;
	color: inherit;
	box-shadow: ${({ theme }) => theme.boxShadowOption};

	:hover {
		background: ${({ theme }) => theme.borderColor};
	}
`;
