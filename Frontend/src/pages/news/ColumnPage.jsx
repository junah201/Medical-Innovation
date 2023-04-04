import React from "react";

import BoardPage from "pages/BoardPage";
import SubNav from "components/news/SubNav";

const ColumnPage = () => {
	return (
		<BoardPage boardId={5} boardType="">
			<SubNav select={"기고문"} />
			<h1>기고문</h1>
		</BoardPage>
	);
};

export default ColumnPage;
