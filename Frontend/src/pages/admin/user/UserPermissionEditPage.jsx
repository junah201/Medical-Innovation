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

	const [events, setEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(4);
	const [firstJudgingPermission, setFirstJudgingPermission] = useState(false);
	const [secondJudgingPermission, setSecondJudgingPermission] = useState(false);

	const [userPermissions, setUserPermissions] = useState([]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/judging_event/all`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			params: {
				skip: 0,
				limit: 10000,
			},
		}).then((res) => {
			if (res.status === 200) {
				setEvents(res.data.events);
				return;
			}
		});
	}, []);

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
				setUserPermissions(res.data.judging_permissions);
				return;
			}
		});
	}, [params.id, authCtx.accessToken]);

	useEffect(() => {
		const userPermission = userPermissions.find((permission) => {
			return permission.judging_event_id === selectedEvent;
		});
		if (userPermission) {
			setFirstJudgingPermission(userPermission.first_judging_permission);
			setSecondJudgingPermission(userPermission.second_judging_permission);
		} else {
			setFirstJudgingPermission(false);
			setSecondJudgingPermission(false);
		}
	}, [userPermissions, selectedEvent]);

	const onSubmit = (e) => {
		e.preventDefault();

		axios({
			url: `${API_URL}/api/v1/user/${params.id}/judging_permission/${selectedEvent}`,
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
				<select
					value={selectedEvent}
					onChange={(e) => {
						setSelectedEvent(parseInt(e.target.value));
					}}
				>
					{events.map((event) => {
						return (
							<option key={event.id} value={event.id}>
								{event.name}
							</option>
						);
					})}
				</select>
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
