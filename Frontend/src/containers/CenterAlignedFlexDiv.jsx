import React from "react";
import styled from "styled-components";

const StyledCenterAlignedFlexDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CenterAlignedFlexDiv = ({ children }) => {
	return <StyledCenterAlignedFlexDiv>{children}</StyledCenterAlignedFlexDiv>;
};

export default CenterAlignedFlexDiv;
