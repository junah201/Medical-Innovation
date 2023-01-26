import { createContext, useState } from "react";
import { getCookie, setCookie, removeCookie } from "../utils/cookie";

const AuthContext = createContext({
	accessToken: "",
	isLoggedIn: false,
	isAdmin: false,
	login: (accessToken, expirationTime, isAdmin) => {},
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

const retrieveStoredIsAdmin = () => {
	const storedIsAdmin = getCookie("is_admin");

	return storedIsAdmin === "true";
};

export const AuthContextProvider = (props) => {
	const [accessToken, setAccessToken] = useState(retrieveStoredToken());
	const [isAdmin, setIsAdmin] = useState(retrieveStoredIsAdmin());

	const userIsLoggedIn = !!accessToken;

	const loginHandler = (accessToken, expirationTime, is_admin) => {
		setAccessToken(accessToken);
		setIsAdmin(is_admin);

		const remainingTime = calculateRemainingTime(expirationTime);

		setCookie("access_token", accessToken, {
			path: "/",
			expires: new Date(Date.now() + remainingTime),
			maxAge: remainingTime,
		});
		setCookie("is_admin", is_admin, {
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
		removeCookie("is_admin");
		console.log("logout");
	};

	const contextValue = {
		accessToken: accessToken,
		isLoggedIn: userIsLoggedIn,
		isAdmin: isAdmin,
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
