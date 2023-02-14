import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminPage from "../../components/admin/AdminPage";
import Message from "../../components/common/Message";
import { API_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";
import DangerButton from "../../components/common/DangerButton";

const BannerDeletePage = () => {
	const params = useParams();
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const handleDelete = (e) => {
		e.preventDefault();

		axios({
			url: `${API_URL}/api/v1/banner/${params.id}`,
			method: "DELETE",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 204) {
				alert("삭제되었습니다.");
				navigate(-1);
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
			<h1>배너 삭제</h1>
			<Message>삭제 후 복구가 불가능합니다.</Message>
			<DangerButton onClick={handleDelete}>삭제하기</DangerButton>
		</AdminPage>
	);
};

export default BannerDeletePage;
