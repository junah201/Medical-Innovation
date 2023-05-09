import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";

import Message from "components/common/Message";

import Page from "components/common/Page";
import CenterAlignedFlexDiv from "containers/CenterAlignedFlexDiv";

const StyledSponsorshipForm = styled.form`
	width: 60%;
	margin: 30px;

	& > div + div {
		margin-top: 20px;
	}
	& label {
		font-size: 18px;
	}

	& button {
		padding: 10px 20px;
		font-size: 20px;
		font-weight: 600;
		margin: auto 0;
		background-color: #ffffff;
	}
`;

const TextInputWrapper = styled.div`
	height: 45px;
	width: 100%;
	margin: 40px 0;

	& label {
		display: block;
		width: 100%;
	}

	& input {
		height: 100%;
		width: 100%;
		padding-left: 10px;
		font-size: 17px;
		border: 2px solid silver;
	}

	& input:focus {
		border-color: #3498db;
		outline: none;
		border-bottom-width: 2px;
	}
`;

const CheckboxInputWrapper = styled.div``;

const TableInputWrapper = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
	grid-gap: 0;

	& > div {
		border-right: 2px solid silver;
		border-bottom: 2px solid silver;
	}

	& input {
		width: 100%;
		height: 30px;
	}
`;

const SponsorshipFormPage = () => {
	const authCtx = useContext(AuthContext);

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [identificationNumber, setIdentificationNumber] = useState("");
	const [address, setAddress] = useState("");
	const [usage, setUsage] = useState("재단법인의 목적 사업 전체");
	const [detail, setDetail] = useState({
		1: { division: "", name: "", count: 0, unit_price: 0, total_price: 0 },
		2: { division: "", name: "", count: 0, unit_price: 0, total_price: 0 },
		3: { division: "", name: "", count: 0, unit_price: 0, total_price: 0 },
		4: { division: "", name: "", count: 0, unit_price: 0, total_price: 0 },
		5: { division: "", name: "", count: 0, unit_price: 0, total_price: 0 },
	});

	console.log(detail);

	const onSubmitHandler = (e) => {
		e.preventDefault();

		const body = JSON.stringify({
			name: name,
			phone: phone,
			identification_number: identificationNumber,
			address: address,
			usage: usage,
			detail: JSON.stringify(detail),
		});

		fetch(`http://localhost:8000/api/v1/sponsor/create`, {
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			body: body,
		}).then((res) => {
			console.log(res);
		});
	};

	return (
		<Page isLoginRequire={true}>
			<h1>후원하기</h1>
			<Message>
				재단법인 미래의학연구재단의 공익적 목적 사업에 동참할 것을 약속드립니다.
			</Message>
			<CenterAlignedFlexDiv>
				<StyledSponsorshipForm onSubmit={onSubmitHandler}>
					<TextInputWrapper>
						<label>성명 (단체명)</label>
						<input
							type="text"
							placeholder="성명 (단체명)"
							required="required"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</TextInputWrapper>
					<TextInputWrapper>
						<label>전화번호</label>
						<input
							type="number"
							placeholder="전화번호 (연락가능한 번호로 적어주세요)"
							required="required"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</TextInputWrapper>
					<TextInputWrapper>
						<label>주민등록번호 (사업자등록번호)</label>
						<input
							type="text"
							placeholder="주민등록번호 (사업자등록번호)"
							required="required"
							value={identificationNumber}
							onChange={(e) => setIdentificationNumber(e.target.value)}
						/>
					</TextInputWrapper>
					<TextInputWrapper>
						<label>주소 (소재지)</label>
						<input
							type="text"
							placeholder="주소 (소재지)"
							required="required"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</TextInputWrapper>
					<CheckboxInputWrapper>
						<label>희망사용처</label>
						<div>
							<input
								type="radio"
								name="use"
								value="재단법인의 목적 사업 전체"
								checked={usage === "재단법인의 목적 사업 전체"}
								onChange={() => setUsage("재단법인의 목적 사업 전체")}
							/>
							재단법인의 목적 사업 전체
						</div>
						<div>
							<input
								type="radio"
								name="use"
								value="미래의학생명과학 국제교류"
								checked={usage === "미래의학생명과학 국제교류"}
								onChange={() => setUsage("미래의학생명과학 국제교류")}
							/>
							미래의학생명과학 국제교류
						</div>
						<div>
							<input
								type="radio"
								name="use"
								value="연구 개발 지원"
								checked={usage === "연구 개발 지원"}
								onChange={() => setUsage("연구 개발 지원")}
							/>
							연구 개발 지원
						</div>
						<div>
							<input
								type="radio"
								name="use"
								value="연구자 창업 지원"
								checked={usage === "연구자 창업 지원"}
								onChange={() => setUsage("연구자 창업 지원")}
							/>
							연구자 창업 지원
						</div>
						<div>
							<input
								type="radio"
								name="use"
								value="의학생명과학 아카데미"
								checked={usage === "의학생명과학 아카데미"}
								onChange={() => setUsage("의학생명과학 아카데미")}
							/>
							의학생명과학 아카데미
						</div>
						<div>
							<input
								type="radio"
								name="use"
								value="기타유관분야 부대사업"
								checked={usage === "기타유관분야 부대사업"}
								onChange={() => setUsage("기타유관분야 부대사업")}
							/>
							기타유관분야 부대사업
						</div>
					</CheckboxInputWrapper>
					<div>
						<label>기부 내용</label>
						<TableInputWrapper>
							<label>구분</label>
							<label>품명</label>
							<label>수량</label>
							<label>단가</label>
							<label>총금액</label>
						</TableInputWrapper>
						{[1, 2, 3, 4, 5].map((i) => {
							return (
								<TableInputWrapper key={i}>
									<input
										key={`구분${i}`}
										type="text"
										placeholder={`구분${i}`}
										value={detail[i]["division"] || ""}
										onChange={(e) => {
											console.log(e.target.value);
											setDetail((prev) => {
												return {
													...prev,
													[i]: {
														...prev[i],
														division: e.target.value,
													},
												};
											});
										}}
									/>
									<input
										key={`품명${i}`}
										type="text"
										placeholder={`품명${i}`}
										value={detail[i]["name"] || ""}
										onChange={(e) => {
											setDetail((prev) => {
												return {
													...prev,
													[i]: {
														...prev[i],
														name: e.target.value,
													},
												};
											});
										}}
									/>
									<input
										key={`수량${i}`}
										type="number"
										placeholder={`수량${i}`}
										value={detail[i]["count"] || ""}
										onChange={(e) => {
											setDetail((prev) => {
												return {
													...prev,
													[i]: {
														...prev[i],
														count: e.target.value,
													},
												};
											});
										}}
									/>
									<input
										key={`단가${i}`}
										type="number"
										placeholder={`단가${i}`}
										value={detail[i]["unit_price"] || ""}
										onChange={(e) => {
											setDetail((prev) => {
												return {
													...prev,
													[i]: {
														...prev[i],
														unit_price: e.target.value,
													},
												};
											});
										}}
									/>
									<input
										key={`총 금액${i}`}
										type="number"
										placeholder={`총 금액${i}`}
										value={detail?.i?.total_price || ""}
										onChange={(e) => {
											setDetail((prev) => {
												return {
													...prev,
													[i]: {
														...prev[i],
														total_price: e.target.value,
													},
												};
											});
										}}
									/>
								</TableInputWrapper>
							);
						})}
					</div>
					<CenterAlignedFlexDiv>
						<button type="submit">제출</button>
					</CenterAlignedFlexDiv>
				</StyledSponsorshipForm>
			</CenterAlignedFlexDiv>
		</Page>
	);
};

export default SponsorshipFormPage;
