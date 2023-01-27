import React from "react";

import BoardPage from "../BoardPage";
import SubNav from "../../components/news/SubNav";

const ColumnPage = () => {
	return (
		<BoardPage boardId={5}>
			<SubNav />
			<h1>기고문</h1>
		</BoardPage>
	);
};

export default ColumnPage;
