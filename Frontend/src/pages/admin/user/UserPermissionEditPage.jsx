import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "utils/const";
import { useParams, useNavigate } from "react-router-dom";
import AdminPage from "components/admin/AdminPage";
import AdminForm from "components/admin/AdminForm";
import AuthContext from "context/AuthContext";

const UserPermissionEditPage = () => {
	const authCtx = useContext(AuthContext);
	const params = useParams();
	const navigate = useNavigate();

	const [firstJudgingPermission, setFirstJudgingPermission] = useState(false);
	const [secondJudgingPermission, setSecondJudgingPermission] = useState(false);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/user/${params.id}/get`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				setFirstJudgingPermission(!!res.data.first_judging_permission);
				setSecondJudgingPermission(!!res.data.second_judging_permission);
				return;
			}
		});
	}, [params.id, authCtx.accessToken]);

	const onSubmit = (e) => {
		e.preventDefault();

		axios({
			url: `${API_URL}/api/v1/user/${params.id}/update`,
			method: "PUT",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: {
				first_judging_permission: firstJudgingPermission,
				second_judging_permission: secondJudgingPermission,
			},
		})
			.then((res) => {
				if (res.status === 204) {
					alert("수정되었습니다.");
					navigate("/admin/user/all");
					return;
				}
				alert("수정에 실패했습니다.");
			})
			.catch((err) => {
				alert("수정에 실패했습니다.\n\n" + err.response.data);
				return;
			});
	};

	return (
		<AdminPage>
			<h1>유저 심사권한 수정</h1>
			<AdminForm onSubmit={onSubmit}>
				<label>1차 심사 권한</label>
				<input
					type="checkbox"
					checked={firstJudgingPermission}
					onChange={() => {
						setFirstJudgingPermission((prev) => !prev);
					}}
				/>
				<br />
				<label>2차 심사 권한</label>
				<input
					type="checkbox"
					checked={secondJudgingPermission}
					onChange={() => {
						setSecondJudgingPermission((prev) => !prev);
					}}
				/>
				<button type="submit">수정하기</button>
			</AdminForm>
		</AdminPage>
	);
};

export default UserPermissionEditPage;
