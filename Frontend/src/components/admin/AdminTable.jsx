import styled from "styled-components";

const StyledAdminTable = styled.table`
	border: 1px solid silver;
	padding: 0;
	margin: 0;
	font-size: 12px;
	border-collapse: collapse;

	& th {
		padding: 10px;
		background-color: #204397;
		white-space: nowrap;
		color: #ffffff;
		text-align: center;
		justify-content: center;
		border: none;
	}

	& tr + tr {
		border-top: 1px solid silver;
	}

	& tr {
		border-bottom: 1pt solid #799fcb;
		text-align: center;
		justify-content: center;
		padding: 2px;
		height: 30px;
	}

	& a {
		color: #0000ff;
	}

	& a:hover {
		text-decoration: underline;
	}
`;

const AdminTable = ({ children }) => {
	return <StyledAdminTable>{children}</StyledAdminTable>;
};

export default AdminTable;
