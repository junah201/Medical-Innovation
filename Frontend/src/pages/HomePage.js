import React from "react";

import Header from "../components/base/Header";

const HomePage = () => {
	return (
		<>
			<Header />
			<main>
				<h1
					style={{
						fontSize: "40px",
						fontWeight: "600",
						textAlign: "center",
						marginBottom: "12px",
						width: "100%",
					}}
				>
					Foundation for Medical Innovation
				</h1>
				<span
					style={{
						fontSize: "25px",
						fontWeight: "400",
						textAlign: "center",
						display: "block",
						width: "100%",
					}}
				>
					재단법인 미래의학연구재단은 과학기술정보통신부 소관 비영리법인 ·
					지정기부금단체 · 중소밴처기업부 창업기획자 등록기관입니다.
				</span>
			</main>
		</>
	);
};

export default HomePage;
