import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/const";

import AdminPage from "../../components/admin/AdminPage";
import Message from "../../components/common/Message";

const SponsoringCompanyDeletePage = () => {
	const params = useParams();
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const handleDelete = () => {
		axios({
			url: `${API_URL}/api/v1/sponsoring_company/${params.id}`,
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 204) {
				navigate("/admin/sponsoring_company/all");
				return;
			}
			if (res.status === 401) {
				alert("로그인 후 이용해주세요.");
				navigate("/login");
				return;
			}
			alert("삭제에 실패했습니다.");
		});
	};

	return (
		<AdminPage>
			<h1>후원기업 삭제</h1>
			<Message>삭제 후 복구가 불가능합니다.</Message>
			<button
				style={{
					backgroundColor: "red",
					color: "white",
					padding: "10px",
					border: "none",
					borderRadius: "5px",
					fontSize: "2rem",
				}}
				onClick={handleDelete}
			>
				삭제하기
			</button>
		</AdminPage>
	);
};

export default SponsoringCompanyDeletePage;
