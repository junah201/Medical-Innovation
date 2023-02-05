import styled from "styled-components";

const StyledAdminTable = styled.div`
	display: grid;
	grid-template-columns: ${(props) =>
		props.column
			? "repeat(" + props.column + ", 1fr)"
			: "1fr 1fr 1fr 1fr 1fr 1fr 1fr"};

	border-top: 2px solid silver;
	border-left: 2px solid silver;

	& > div {
		border-right: 2px solid silver;
		border-bottom: 2px solid silver;
		text-align: center;
		padding: 5px;
	}

	& a:hover {
		text-decoration: underline;
	}
`;

const AdminTable = ({ children, column }) => {
	return <StyledAdminTable column={column}>{children}</StyledAdminTable>;
};

export default AdminTable;
