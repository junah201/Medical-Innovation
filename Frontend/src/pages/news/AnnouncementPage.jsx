import React from "react";

import BoardPage from "../BoardPage";
import SubNav from "../../components/news/SubNav";

const AnnouncementPage = () => {
	return (
		<BoardPage boardId="2" boardType="">
			<SubNav select="공지사항"></SubNav>
			<h1>공지사항</h1>
		</BoardPage>
	);
};

export default AnnouncementPage;
