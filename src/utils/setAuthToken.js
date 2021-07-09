import axios from "axios";

// Set the token into the header as authorization header bearer token to use it every API request
const setAuthToken = (token) => {
	const bearerToken = `Bearer ${token}`;
	// console.log(`Setting token to ${bearerToken}`);
	if (token) {
		axios.defaults.headers.common["Authorization"] = bearerToken;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

export default setAuthToken;
