import React from "react";
import styled from "styled-components";

const StyledAdminForm = styled.form`
	display: flex;
	flex-direction: column;

	& * + * {
		margin-bottom: 10px;
	}

	& input,
	select {
		width: 800px;
		height: 30px;
		padding: 3px;
		font-size: 16px;
		border: 1px solid #000000;
	}

	& textarea {
		width: 800px;
		height: 400px;
		padding: 3px;
		border: 1px solid #000000;
	}

	& button {
		padding: 10px 20px;
		width: 800px;
		font-size: 20px;
		font-weight: 600;
		margin: auto 0;
		background-color: #ffffff;
	}

	& .ck-editor {
		width: 800px;
	}

	& .ck-editor__editable_inline {
		min-height: 600px;
	}
`;

const AdminForm = ({ onSubmit, children }) => {
	return <StyledAdminForm onSubmit={onSubmit}>{children}</StyledAdminForm>;
};

export default AdminForm;
