import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

const LogoutPage = () => {
	const navigate = useNavigate();
	const { logout } = useContext(AuthContext);

	logout();
	navigate("/");

	return <div>Log out</div>;
};

export default LogoutPage;
