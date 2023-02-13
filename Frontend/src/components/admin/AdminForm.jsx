import React from "react";
import styled from "styled-components";

const StyledAdminForm = styled.form`
	display: flex;
	flex-direction: column;

	& * + * {
		margin-top: 10px;
	}

	& input,
	select {
		width: 800px;
		height: 30px;
		padding: 3px;
		font-size: 16px;
	}

	& textarea {
		width: 800px;
		height: 400px;
		padding: 3px;
	}

	& button {
		padding: 10px 20px;
		width: 800px;
		font-size: 20px;
		font-weight: 600;
		margin: auto 0;
		background-color: #ffffff;
	}
`;

const AdminForm = ({ onSubmit, children }) => {
	return <StyledAdminForm onSubmit={onSubmit}>{children}</StyledAdminForm>;
};

export default AdminForm;
