import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminPage from "../../components/admin/AdminPage";
import Message from "../../components/common/Message";
import DangerButton from "../../components/common/DangerButton";
import AuthContext from "../../context/AuthContext";
import { API_URL } from "../../utils/const";
import AdminForm from "./../../components/admin/AdminForm";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";

const StyledCKEditor = styled.div`
	width: 800px;

	& .ck-editor__editable_inline {
		min-height: 600px;
	}
`;

const AdEmailSendAll = () => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [files, setFiles] = useState([]);
	const [testEmail, setTestEmail] = useState("");

	const handleSend = (e) => {
		e.preventDefault();

		const formData = new FormData();

		for (let i = 0; i < files.length; i++) {
			formData.append("files", files[i]);
		}

		formData.append("title", title);
		formData.append("content", content);
		formData.append("email", "j@j.j");

		axios({
			url: `${API_URL}/api/v1/ad_email/send/all`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status === 200) {
				alert("전체 이메일 전송 완료");
				navigate(-1);
				return;
			}
			return alert("전체 이메일 전송 실패");
		});
	};

	const handleTestSend = (e) => {
		e.preventDefault();

		const formData = new FormData();

		console.log(files);

		for (let i = 0; i < files.length; i++) {
			formData.append("files", files[i]);
		}

		formData.append("email", testEmail);
		formData.append("title", title);
		formData.append("content", content);

		axios({
			url: `${API_URL}/api/v1/ad_email/send/one`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status === 200) {
				return alert("테스트 이메일 전송 완료");
			}
			return alert("테스트 이메일 전송 실패");
		});
	};

	return (
		<AdminPage>
			<h1>광고 수신 이메일</h1>
			<Message>
				수신 동의를 한 모두에게 이메일을 전송합니다. 중간에 취소 불가능하니
				주의해주세요.
			</Message>
			<AdminForm>
				<input
					type="text"
					placeholder="제목"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<br />
				<StyledCKEditor>
					<CKEditor
						editor={ClassicEditor}
						data=""
						config={{
							mediaEmbed: {
								previewsInData: true,
							},
							toolbar: [],
							heading: {
								options: [
									{
										model: "paragraph",
										view: "p",
										title: "본문",
										class: "ck-heading_paragraph",
									},
									{
										model: "heading2",
										view: "h2",
										title: "헤더1",
										class: "ck-heading_heading2",
									},
									{
										model: "heading3",
										view: "h3",
										title: "헤더2",
										class: "ck-heading_heading3",
									},
								],
							},
						}}
						onReady={(editor) => {
							// You can store the "editor" and use when it is needed.
							console.log("Editor is ready to use!", editor);
						}}
						onChange={(event, editor) => {
							const data = editor.getData();
							console.log(data);
							setContent(data);
						}}
						onBlur={(event, editor) => {
							console.log("Blur.", editor);
						}}
						onFocus={(event, editor) => {
							console.log("Focus.", editor);
						}}
					/>
				</StyledCKEditor>
				<br />
				<input
					type="file"
					onChange={(e) => {
						setFiles(e.target.files);
					}}
					accept="image/*"
					multiple
				/>
				<br />
				<input
					type="text"
					placeholder="테스트 이메일 주소"
					value={testEmail}
					onChange={(e) => {
						setTestEmail(e.target.value);
					}}
				/>
				<DangerButton onClick={handleTestSend}>
					테스트 이메일 보내기
				</DangerButton>
				<br />
				<DangerButton onClick={handleSend}>전체 이메일 보내기</DangerButton>
			</AdminForm>
		</AdminPage>
	);
};

export default AdEmailSendAll;
