import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Message from "components/common/Message";

import AdminPage from "components/admin/AdminPage";
import DangerButton from "components/common/DangerButton";
import { API_URL } from "utils/const";
import AuthContext from "context/AuthContext";

const AdvisorDeletePage = () => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);
	const params = useParams();

	const handleDelete = (e) => {
		e.preventDefault();

		axios({
			url: `${API_URL}/api/v1/advisor/delete/${params.id}`,
			method: "DELETE",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 204) {
				alert("삭제되었습니다.");
				navigate("/admin/advisor/all");
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
			<h1>자문단 삭제</h1>
			<Message>tip : 삭제 후 복구 불가능합니다.</Message>
			<DangerButton onClick={handleDelete}>삭제하기</DangerButton>
		</AdminPage>
	);
};

export default AdvisorDeletePage;
