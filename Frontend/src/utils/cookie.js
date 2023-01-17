import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (key, value, option) => {
	if (!option) option = {};
	option.path = "/";
	return cookies.set(key, value, option);
};

export const getCookie = (key) => {
	return cookies.get(key);
};

export const removeCookie = (key) => {
	return cookies.remove(key);
};
