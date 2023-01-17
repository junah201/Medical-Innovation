import React, { useState } from "react";
import styled from "styled-components";

import Page from "../../components/common/Page";

const StyledPostUploadPage = styled.div``;

const PostUploadPage = () => {
	const [title, setTitle] = useState("");
	const [boardId, setBoardId] = useState("");
	const [content, setContent] = useState("");
	const [authorName, setAuthorName] = useState("");
	const [file1, setFile1] = useState("");
	const [file2, setFile2] = useState("");

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleBoardIdChange = (e) => {
		setBoardId(e.target.value);
	};

	const handleContentChange = (e) => {
		setContent(e.target.value);
	};

	const handleAuthorNameChange = (e) => {
		setAuthorName(e.target.value);
	};

	const handleFile1Change = (e) => {
		setFile1(e.target.value);
	};

	const handleFile2Change = (e) => {
		setFile2(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const files = [];
		if (file1) {
			files.push(file1);
		}
		if (file2) {
			files.push(file2);
		}

		const body = JSON.stringify({
			title: title,
			board_id: parseInt(boardId),
			content: content,
			author_name: authorName,
			files: files,
		});

		console.log(body);

		fetch(
			`https://azlbeqcjuzmdl6ysht4y7v44vm0tybim.lambda-url.ap-northeast-2.on.aws/api/v1/post/create`,
			{
				method: "POST",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
				},
				body: body,
			}
		).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					console.log(data.filenames[0]);
				});
			}
		});

		alert("제출되었습니다.");
	};

	const [file, setFile] = useState(null);

	function handleChange(event) {
		setFile(event.target.files[0]);
	}

	const onhanddlefsdffile = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("files", file);
		console.log(formData);
		fetch(
			"https://azlbeqcjuzmdl6ysht4y7v44vm0tybim.lambda-url.ap-northeast-2.on.aws/api/v1/file/upload",
			{
				method: "POST",
				headers: {
					accept: "application/json",
				},
				body: formData,
			}
		).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					console.log(data.filenames[0]);
				});
			}
		});
	};

	return (
		<Page>
			<StyledPostUploadPage>
				<h1>Post Upload Page</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Title"
						value={title}
						onChange={handleTitleChange}
					></input>
					<br />
					<input
						type="number"
						placeholder="Board ID"
						value={boardId}
						onChange={handleBoardIdChange}
					></input>
					<br />
					<textarea
						type="text"
						placeholder="Content"
						value={content}
						onChange={handleContentChange}
					></textarea>
					<br />
					<input
						type="text"
						placeholder="Author name"
						value={authorName}
						onChange={handleAuthorNameChange}
					></input>
					<br />
					<input
						type="text"
						placeholder="file1"
						value={file1}
						onChange={handleFile1Change}
					></input>
					<input
						type="text"
						placeholder="file2"
						value={file2}
						onChange={handleFile2Change}
					></input>
					<br />
					<br />
					<button type="submit">Upload</button>
				</form>
				<h1>File Upload</h1>
				<form onSubmit={onhanddlefsdffile}>
					<input type="file" onChange={handleChange} />
					<br />
					<button type="submit">Upload</button>
				</form>
			</StyledPostUploadPage>
		</Page>
	);
};

export default PostUploadPage;
