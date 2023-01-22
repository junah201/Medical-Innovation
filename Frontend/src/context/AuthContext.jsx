import { createContext, useState } from "react";
import { getCookie, setCookie, removeCookie } from "../utils/cookie";

const AuthContext = createContext({
	accessToken: "",
	isLoggedIn: false,
	login: (accessToken) => {},
	logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();

	const remainingDuration = adjExpirationTime - currentTime;

	return remainingDuration;
};

const retrieveStoredToken = () => {
	const storedToken = getCookie("access_token");

	if (!storedToken) {
		return null;
	}

	return storedToken;
};

export const AuthContextProvider = (props) => {
	const [accessToken, setAccessToken] = useState(retrieveStoredToken());

	const userIsLoggedIn = !!accessToken;

	const loginHandler = (accessToken, expirationTime) => {
		setAccessToken(accessToken);

		const remainingTime = calculateRemainingTime(expirationTime);

		setCookie("access_token", accessToken, {
			path: "/",
			expires: new Date(Date.now() + remainingTime),
			maxAge: remainingTime,
		});

		setTimeout(logoutHandler, remainingTime * 1000);
	};

	const logoutHandler = () => {
		setAccessToken(null);
		removeCookie("access_token");
		removeCookie("refresh_token");
		console.log("logout");
	};

	const contextValue = {
		accessToken: accessToken,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
