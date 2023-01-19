import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTag = (props) => {
	return (
		<Helmet>
			<title>{props.title}</title>

			<meta name="description" content={props.description} />

			<meta property="og:title" content={props.title} />
			<meta property="og:description" content={props.description} />
			<meta property="og:url" content={props.url} />

			<meta name="twitter:title" content="재단법인 미래의학연구재단" />
			<meta name="twitter:description" content={props.description} />
		</Helmet>
	);
};

export default MetaTag;
