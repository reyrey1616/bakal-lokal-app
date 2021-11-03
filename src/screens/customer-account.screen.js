import React from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import BLHeader from "../components/header/header.component";
import { Spinner } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/core";
import { selectCurrentUser } from "../services/auth/auth.selectors";
import { useSelector } from "react-redux";
import { CustomerInfo } from "../components/customer/customer-info.component";

const CustomerAccountScreen = ({ route }) => {
	// const { previousScreen } = route?.params;
	const page = useRoute();
	const navigation = useNavigation();

	const currentUser = useSelector(selectCurrentUser);

	return (
		<SafeArea>
			<BLHeader title="User profile" previousScreen={"Home"} />

			<CustomerInfo currentUser={currentUser} />
		</SafeArea>
	);
};

export default CustomerAccountScreen;
