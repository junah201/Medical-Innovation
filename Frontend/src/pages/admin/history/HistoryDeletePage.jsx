import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminPage from "components/admin/AdminPage";
import { API_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import Message from "components/common/Message";

const HistoryDeletePage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const handleDelete = (e) => {
		e.preventDefault();

		axios({
			url: `${API_URL}/api/v1/history/delete/${params.id}`,
			method: "DELETE",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 204) {
				alert("삭제되었습니다.");
				navigate(-1, { replace: true });
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
			<h1>연혁 삭제</h1>
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

export default HistoryDeletePage;
