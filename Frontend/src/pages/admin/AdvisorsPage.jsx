import React, { useState, useEffect } from "react";
import axios from "axios";

import AdminPage from "./../../components/admin/AdminPage";
import AdminTable from "../../components/admin/AdminTable";

import { API_URL, S3_URL } from "../../utils/const";

const AdvisorsPage = () => {
	const [advisors, setAdvisors] = useState([]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/advisor/all?skip=0&limit=300`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((res) => {
			setAdvisors(res.data);
		});
	}, []);

	return (
		<AdminPage>
			<h1>자문단 목록</h1>
			<AdminTable column={8}>
				<>
					<div>고유 id</div>
					<div>이름</div>
					<div>자문단 종류</div>
					<div>이미지</div>
					<div>생성일</div>
					<div>수정일</div>
					<div>수정</div>
					<div>삭제</div>
				</>
				{advisors.map((advisor) => {
					return (
						<>
							<div>{advisor.id}</div>
							<div>{advisor.name}</div>
							<div>{advisor.type}</div>
							<div>
								<a href={`${S3_URL}/upload/${advisor.filename}`}>
									{advisor.filename}
								</a>
							</div>
							<div>{advisor.created_at}</div>
							<div>{advisor.updated_at}</div>
							<div>
								<a href={`/admin/advisor/edit/${advisor.id}`}>수정하기</a>
							</div>
							<div>
								<a href={`/admin/advisor/delete/${advisor.id}`}>삭제하기</a>
							</div>
						</>
					);
				})}
			</AdminTable>
		</AdminPage>
	);
};

export default AdvisorsPage;
