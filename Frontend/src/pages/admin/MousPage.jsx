import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminPage from "../../components/admin/AdminPage";
import AdminTable from "../../components/admin/AdminTable";
import Message from "../../components/common/Message";
import { API_URL } from "../../utils/const";

const MousPage = () => {
	const [mous, setMous] = useState([]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/mou/all`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((res) => {
			setMous(res.data);
		});
	}, []);

	return (
		<AdminPage>
			<h1>Mou 목록</h1>
			<Message>
				<Link to="/mou">Mou</Link> 목록을 수정할 수 있습니다.
			</Message>
			<AdminTable column={7}>
				<div>고유 Id</div>
				<div>이름</div>
				<div>링크</div>
				<div>생성 시간</div>
				<div>수정 시간</div>
				<div>수정</div>
				<div>삭제</div>
				{mous.map((mou) => {
					return (
						<>
							<div>{mou.id}</div>
							<div>{mou.name}</div>
							<div>{mou.link}</div>
							<div>{mou.created_at}</div>
							<div>{mou.updated_at}</div>
							<div>
								<Link to={`/admin/mou/edit/${mou.id}`}>수정하기</Link>
							</div>
							<div>
								<Link to={`/admin/mou/delete/${mou.id}`}>삭제하기</Link>
							</div>
						</>
					);
				})}
			</AdminTable>
		</AdminPage>
	);
};

export default MousPage;
