import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const headerSX = {
	px: 2.5,
	pt: 2.5,
	pb: 0,
	'& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
};

interface MainCardProps {
	border?: boolean;
	boxShadow?: boolean;
	children: React.ReactNode;
	content?: boolean;
	contentSX?: object;
	darkTitle?: boolean;
	divider?: boolean;
	elevation?: number;
	secondary?: React.ReactNode;
	shadow?: string;
	sx?: object;
	title?: string;
	codeHighlight?: boolean;
}

export const MainCard = ({
	border = true,
	boxShadow,
	children,
	content = true,
	contentSX = {},
	darkTitle,
	elevation,
	secondary,
	shadow,
	sx = {},
	title,
	...others
}: MainCardProps) => {
	const theme = useTheme() ;
	boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

	return (
		<Card
			elevation={elevation || 0}
			{...others}
			sx={{
				border: border ? '1px solid' : 'none',
				borderRadius: 2,
				borderColor: theme.palette.secondary.dark,
				boxShadow:
					boxShadow && (!border || theme.palette.mode === 'dark')
						? shadow
						: 'inherit',
				':hover': {
					boxShadow: boxShadow ? shadow : 'inherit',
				},
				'& pre': {
					m: 0,
					p: '16px !important',
					fontFamily: theme.typography.fontFamily,
					fontSize: '0.75rem',
				},
				...sx,
			}}
		>
			{/* card header and action */}
			{!darkTitle && title && (
				<CardHeader
					sx={headerSX}
					titleTypographyProps={{ variant: 'subtitle1' }}
					title={title}
					action={secondary}
				/>
			)}
			{darkTitle && title && (
				<CardHeader
					sx={headerSX}
					title={<Typography variant="h3">{title}</Typography>}
					action={secondary}
				/>
			)}
			{/* card content */}
			{content && <CardContent sx={contentSX}>{children}</CardContent>}
			{!content && children}
		</Card>
	);
};

export default MainCard;