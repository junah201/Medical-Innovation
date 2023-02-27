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

	& span {
		width: 100%;
		color: #000000;
		display: block;
		text-align: right;
	}
`;

const StyledBoardPageButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledBoardPageButton = styled.button`
	background-color: #ffffff;
	padding: 8px;
	width: 35px;
	height: 35px;
	border: none;
	font-size: 18px;

	& + & {
		margin-left: 5px;
	}

	&:hover {
		background-color: #f9f9f9;
	}
`;

const AdminTable = ({ children, page, setPage, SIZE, total }) => {
	return (
		<>
			<span>total : {total}</span>
			<StyledAdminTable>{children}</StyledAdminTable>
			<StyledBoardPageButtonWrapper>
				<StyledBoardPageButton
					onClick={() => setPage(Math.max(0, page - SIZE))}
					disabled={page <= 0}
				>
					{"<"}
				</StyledBoardPageButton>
				{Array.from({ length: Math.ceil(total / SIZE) }).map((_, index) => {
					return (
						<StyledBoardPageButton
							onClick={() => setPage(index * SIZE)}
							disabled={index * SIZE === page}
							key={index}
						>
							{index + 1}
						</StyledBoardPageButton>
					);
				})}

				<StyledBoardPageButton
					onClick={() => setPage(Math.min(total, page + SIZE))}
					disabled={page >= total / SIZE - 1}
				>
					{">"}
				</StyledBoardPageButton>
			</StyledBoardPageButtonWrapper>
		</>
	);
};

export default AdminTable;
