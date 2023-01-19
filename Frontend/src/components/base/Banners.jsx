import React from "react";
import { Desktop, Mobile, Tablet } from "../responsive/responsive";

import DesktopBanners from "../banners/DesktopBanners";
import MobileBanners from "../banners/MobileBanners";

const Banners = () => {
	return (
		<>
			<Desktop>
				<DesktopBanners />
			</Desktop>
			<Tablet>
				<MobileBanners />
			</Tablet>
			<Mobile>
				<MobileBanners />
			</Mobile>
		</>
	);
};

export default Banners;
