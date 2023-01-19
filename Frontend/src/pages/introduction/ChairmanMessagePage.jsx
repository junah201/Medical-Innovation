import React from "react";
import styled from "styled-components";

import Page from "../../components/common/Page";
import SubNav from "../../components/introduction/SubNav";
import Message from "../../components/common/Message";

import jeonSeungho from "../../static/images/전승호.png";

const StyledChairmanProfile = styled.div`
	display: flex;

	& > div > * + * {
		margin-top: 10px;
	}

	& > div {
		display: flex;
		flex-direction: column;
	}

	& > div > h1 {
		font-size: 25px;
		border-left: 5px solid #204397;
		padding-left: 3px;
	}
	& > div > h1 > span {
		font-size: 30px;
	}
	& > div > h4 {
		font-size: 25px;
		border-left: 5px solid transparent;
		padding-left: 3px;
	}

	& > div > p {
		font-size: 18px;
	}
	& > img {
		margin-left: 50px;
	}

	& p {
		padding-left: 16px;
	}

	@media screen and (max-width: 991px) {
		flex-direction: column;

		& > img {
			margin-left: 0px;
		}
	}
	@media screen and (min-width: 992px) {
	}
`;

const ChairmanMessagePage = () => {
	return (
		<Page>
			<SubNav select="이사장 인사" />
			<StyledChairmanProfile>
				<div>
					<h1>
						<span>전승호</span> 이사장
					</h1>
					<p>
						대웅제약 대표이사
						<br />
						대한약학회 이사
						<br />
						제3대 재단법인 미래의학연구재단 이사장
					</p>
					<h4>Education</h4>
					<p>
						알토대학교 경제대학원 MBA
						<br />
						서울대학교 대학원 제약학 석사
						<br />
						서울대학교 제약학 학사
					</p>
				</div>

				<img src={jeonSeungho} alt="전승호" height="300px" width="260px" />
			</StyledChairmanProfile>
			<br />
			<br />
			<Message>
				안녕하십니까?
				<br />
				<br />
				재단법인 미래의학연구재단은 미래의학생명과학을 선도할 뛰어난 아이디어와
				유망 기술의 최신동향을 적기에 공급하고 최신 치료기술을 효과적으로
				전파하여 세계적인 연구 및 창업생태계 조성과과 조기 기술실용화를 도모할
				목적으로 설립된 과기부 산하 비영리법인이며 중소벤처기업부 등록
				창업기획자자입니다.
				<br />
				<br />
				재단은 특허받은 UTO(Universial Tech Orginger) 사업모델을 극대화하여
				산ㆍ학ㆍ연 간극을 최소화하고 창업 생태계 저변 확대 및 재단 주도의 협력
				네트워크를 지원하여 오픈이노베이션을 촉진하고 창업생태계의 저변을
				확대하는데 기여하겠습니다. <br />
				<br />
				더불어어 바이오헬스 혁신기술의 유망 스타트업을 조기에 발굴하고 투자 및
				성장 지원하여 기업의 지속성장을 도모하고 이를 통해 긍국적으로로 대한민국
				미래성장동력에 이바지하는 공익을 실현하하겠습니다.
				<br />
				<br />
				재단법인 미래의학연구재단 이사장
			</Message>
		</Page>
	);
};

export default ChairmanMessagePage;
