import React from "react";

import BoardPage from "../BoardPage";
import SubNav from "../../components/news/SubNav";

const PhotoPage = () => {
	return (
		<BoardPage boardId={6} boardType="">
			<SubNav select={"사진"} />
			<h1>사진</h1>
		</BoardPage>
	);
};

export default PhotoPage;
