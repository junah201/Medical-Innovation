import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminPage from "../../components/admin/AdminPage";
import Message from "../../components/common/Message";
import { API_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";

const BannerDeletePage = () => {
	const params = useParams();
	const authCtx = useContext(AuthContext);

	const handleDelete = (e) => {
		e.preventDefault();

		axios({
			url: `${API_URL}/api/v1/file/banner/${params.id}`,
			method: "DELETE",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 204) {
				alert("삭제되었습니다.");
				window.location.href = "/admin/banners";
				return;
			}
			alert("삭제에 실패했습니다.");
		});
	};

	return (
		<AdminPage>
			<h1>배너 삭제</h1>
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

export default BannerDeletePage;
