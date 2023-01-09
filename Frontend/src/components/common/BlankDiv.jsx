import React from "react";
import styled from "styled-components";

const StyledBlankDiv = styled.div`
	height: ${(props) => props.height || 0};
	width: ${(props) => props.width || 0};
`;

const BlankDiv = ({ height, width }) => {
	return <StyledBlankDiv height={height} width={width}></StyledBlankDiv>;
};

export default BlankDiv;
