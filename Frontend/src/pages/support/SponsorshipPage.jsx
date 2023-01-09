import React from "react";
import styled from "styled-components";

import Page from "../../components/common/Page";
import SubNav from "../../components/support/SubNav";
import SponsorshipMessage from "../../components/support/SponsorshipMessage";

import downloadImg from "../../static/images/약정서다운로드.png";

const StyledSponsorshipContainer = styled.div`
	display: flex;
`;

const SponsorshipPage = () => {
	return (
		<Page>
			<SubNav select="후원하기" />
			<SponsorshipMessage />
			<StyledSponsorshipContainer>
				<a href="/기부약정서.pdf" target="_blank">
					<img
						src={downloadImg}
						alt="약정서 다운로드 및 작성"
						width="200px"
						height="200px"
					/>
				</a>
				<div>
					<p>
						이메일이나 우편으로 가입하실 분은 약정서 파일을 다운로드 받으시어
						작성하여 발송하여 주시면 됩니다.
					</p>
				</div>
			</StyledSponsorshipContainer>
		</Page>
	);
};

export default SponsorshipPage;
