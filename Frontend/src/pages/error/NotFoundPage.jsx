import React from "react";

import Page from "../../components/common/Page";
import Message from "../../components/common/Message";

function NotFoundPage() {
	return (
		<Page title="404 Not Found">
			<h1>404 Not Found</h1>
			<Message>
				해당 페이지를 찾을 수 없습니다. 잘못된 URL이거나, 개발 중인 페이지일 수
				있습니다.
			</Message>
		</Page>
	);
}

export default NotFoundPage;
