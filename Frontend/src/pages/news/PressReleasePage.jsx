import React from "react";

import BoardPage from "../BoardPage";
import SubNav from "../../components/news/SubNav";

const PressReleasePage = () => {
	return (
		<BoardPage boardId="3" boardType="link">
			<SubNav select="보도자료"></SubNav>
			<h1>보도자료</h1>
		</BoardPage>
	);
};

export default PressReleasePage;
