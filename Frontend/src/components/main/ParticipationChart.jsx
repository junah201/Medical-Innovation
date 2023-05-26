import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const ParticipationChart = () => {
	return (
		<ResponsiveBar
			data={[
				{
					year: "2017",
					참가자: 268,
				},
				{
					year: "2018",
					참가자: 355,
				},
				{
					year: "2019",
					참가자: 377,
				},
				{
					year: "2020",
					참가자: 463,
				},
				{
					year: "2021",
					참가자: 811,
				},
				{
					year: "2022",
					참가자: 1026,
				},
				{
					year: "2023",
					참가자: 230,
				},
			]}
			keys={["참가자"]}
			indexBy="year"
			margin={{ top: 40, right: 20, bottom: 50, left: 60 }}
			padding={0.3}
			valueScale={{ type: "linear" }}
			indexScale={{ type: "band", round: true }}
			colors={{ scheme: "nivo" }}
			defs={[
				{
					id: "lines",
					type: "patternLines",
					background: "inherit",
					color: "#eed312",
					rotation: -45,
					lineWidth: 6,
					spacing: 10,
				},
			]}
			fill={[
				{
					match: {
						id: "sandwich",
					},
					id: "lines",
				},
			]}
			borderColor={{
				from: "color",
				modifiers: [["darker", 1.6]],
			}}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "연도",
				legendPosition: "middle",
				legendOffset: 32,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "참가자 수",
				legendPosition: "middle",
				legendOffset: -40,
			}}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor={{
				from: "color",
				modifiers: [["darker", 1.6]],
			}}
		/>
	);
};

export default ParticipationChart;
