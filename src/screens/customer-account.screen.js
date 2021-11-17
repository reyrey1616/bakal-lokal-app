import React from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import BLHeader from "../components/header/header.component";
import { Spinner } from "native-base";
import {
	selectCurrentUser,
	selectAuthLoading,
} from "../services/auth/auth.selectors";
import { useSelector } from "react-redux";
import { CustomerInfo } from "../components/customer/customer-info.component";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";

const CustomerAccountScreen = () => {
	const loading = useSelector(selectAuthLoading);
	const currentUser = useSelector(selectCurrentUser);
	const navigation = useNavigation();

	if (loading) {
		return <Spinner color="orange" />;
	}

	if (!currentUser) {
		Alert.alert("Bakal Lokal", "You need to login first!");
		navigation.navigate("Login");
	}

	return (
		<SafeArea>
			<BLHeader title="User profile" previousScreen={"Home"} />
			<CustomerInfo currentUser={currentUser} />
		</SafeArea>
	);
};

export default CustomerAccountScreen;
