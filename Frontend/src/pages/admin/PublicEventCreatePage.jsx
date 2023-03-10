import React, { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import AdminForm from "../../components/admin/AdminForm";
import Message from "../../components/common/Message";
import AuthContext from "../../context/AuthContext";

import { API_URL } from "../../utils/const";

import TextInput from "../../components/form/TextInput";
import DescriptionInput from "../../components/form/DescriptionInput";
import DateInput from "../../components/form/DateInput";
import SingleFileInput from "../../components/form/SingleFileInput";

const PublicEventCreatePage = () => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const [publicEventCreateInfo, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "init":
					return action.payload;
				case "name":
					return { ...state, name: action.payload };
				case "english_name":
					return { ...state, english_name: action.payload };
				case "description":
					return { ...state, description: action.payload };
				case "start_date":
					return { ...state, start_date: action.payload };
				case "file":
					return { ...state, file: action.payload };
				case "end_date":
					return { ...state, end_date: action.payload };
				case "join_start_date":
					return { ...state, join_start_date: action.payload };
				case "join_end_date":
					return { ...state, join_end_date: action.payload };
				default:
					return state;
			}
		},
		{
			name: "",
			english_name: "",
			description: "",
			file: null,
			start_date: "2000-01-01",
			end_date: "2023-01-01",
			join_start_date: "2000-01-01",
			join_end_date: "2023-01-01",
		}
	);

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		for (const key in publicEventCreateInfo) {
			formData.append(key, publicEventCreateInfo[key]);
		}

		axios({
			url: `${API_URL}/api/v1/public_event/create`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status === 204) {
				alert("????????? ?????????????????????.");
				navigate("/admin/public_event/all");
				return;
			}
			if (res.status === 401) {
				alert("????????? ??? ??????????????????.");
				navigate("/login");
				return;
			}
			alert("????????? ????????? ??????????????????.");
			return;
		});
	};

	return (
		<AdminPage>
			<h1>?????? ?????? ?????????</h1>
			<Message></Message>
			<AdminForm onSubmit={handleSubmit}>
				<TextInput
					label="?????????"
					value={publicEventCreateInfo.name}
					onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
				/>
				<TextInput
					label="????????? (??????)"
					value={publicEventCreateInfo.english_name}
					onChange={(e) =>
						dispatch({ type: "english_name", payload: e.target.value })
					}
				/>
				<DescriptionInput
					label="?????? ??????"
					value={publicEventCreateInfo.description}
					onChange={(e) =>
						dispatch({ type: "description", payload: e.target.value })
					}
					placeholder="?????? ????????? ??????????????????."
				/>
				<DateInput
					label="?????? ?????????"
					value={publicEventCreateInfo.start_date}
					onChange={(e) =>
						dispatch({ type: "start_date", payload: e.target.value })
					}
				/>
				<DateInput
					label="?????? ?????????"
					value={publicEventCreateInfo.end_date}
					onChange={(e) =>
						dispatch({ type: "end_date", payload: e.target.value })
					}
				/>
				<DateInput
					label="?????? ?????? ?????? ?????????"
					value={publicEventCreateInfo.join_start_date}
					onChange={(e) =>
						dispatch({ type: "join_start_date", payload: e.target.value })
					}
				/>
				<DateInput
					label="?????? ?????? ?????? ?????????"
					value={publicEventCreateInfo.join_end_date}
					onChange={(e) =>
						dispatch({ type: "join_end_date", payload: e.target.value })
					}
				/>
				<SingleFileInput
					label="????????? ?????????"
					onChange={(e) =>
						dispatch({ type: "file", payload: e.target.files[0] })
					}
				/>
				<button type="submit">????????????</button>
			</AdminForm>
		</AdminPage>
	);
};

export default PublicEventCreatePage;
