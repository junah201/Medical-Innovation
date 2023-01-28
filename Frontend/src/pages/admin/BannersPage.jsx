import React, { useState, useEffect } from "react";
import styled from "styled-components";

import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import { API_URL } from "../../utils/const";
import Message from "../../components/common/Message";

const BannersPage = () => {
	const [banners, setBanners] = useState([]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/file/banners`,
			method: "GET",
		}).then((res) => {
			setBanners(res.data);
		});
	}, []);

	return (
		<AdminPage>
			<h1>Banners</h1>
			<Message>배너 목록</Message>
			<StyledBannersContainer>
				<StyledBannerItem>고유 id</StyledBannerItem>
				<StyledBannerItem>회사명</StyledBannerItem>
				<StyledBannerItem>파일명</StyledBannerItem>
				<StyledBannerItem>링크</StyledBannerItem>
				<StyledBannerItem>배너 종료 시점</StyledBannerItem>
				<StyledBannerItem>배너 생성 시점</StyledBannerItem>
				<StyledBannerItem>배너 수정 시점</StyledBannerItem>
				<StyledBannerItem>수정</StyledBannerItem>
				<StyledBannerItem>삭제</StyledBannerItem>
				{banners.map((banner) => {
					return <BannerItem banner={banner} />;
				})}
			</StyledBannersContainer>
		</AdminPage>
	);
};

const StyledBannersContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

	border-top: 2px solid silver;
	border-left: 2px solid silver;

	& > div {
		border-right: 2px solid silver;
		border-bottom: 2px solid silver;
	}

	& a:hover {
		text-decoration: underline;
	}
`;

const StyledBannerItem = styled.div`
	text-align: center;
	padding: 5px;
`;

const BannerItem = ({ banner }) => {
	return (
		<>
			<StyledBannerItem>{banner.id}</StyledBannerItem>
			<StyledBannerItem>{banner.name}</StyledBannerItem>
			<StyledBannerItem>{banner.filename}</StyledBannerItem>
			<StyledBannerItem>{banner.link}</StyledBannerItem>
			<StyledBannerItem>{banner.banner_end_at}</StyledBannerItem>
			<StyledBannerItem>{banner.created_at}</StyledBannerItem>
			<StyledBannerItem>{banner.updated_at}</StyledBannerItem>
			<StyledBannerItem>
				<a href={`/admin/banner/edit/${banner.id}`}>수정하기</a>
			</StyledBannerItem>
			<StyledBannerItem>
				<a href={`/admin/banner/delete/${banner.id}`}>삭제하기</a>
			</StyledBannerItem>
		</>
	);
};

export default BannersPage;
