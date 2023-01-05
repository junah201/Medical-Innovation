import React from "react";
import { Route, Routes, Switch, Redirect } from "react-router-dom";

import HomePage from "./pages/HomePage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="*" element={<h1>404</h1>} />
		</Routes>
	);
}

export default App;
