import React from "react";
import { Header, Button, Left, Body, Title, Right, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../infra/theme/colors";

const BLHeader = ({ previousScreen, title = "Page Header" }) => {
	const navigation = useNavigation();
	return (
		<Header style={{ backgroundColor: "white" }}>
			<Left>
				<Button transparent>
					<Icon
						onPress={() => {
							navigation.navigate(`${previousScreen}`);
						}}
						name="arrow-back"
						style={{
							color: colors.brand.orange,
						}}
					/>
				</Button>
			</Left>
			<Body>
				<Title
					style={{
						color: colors.brand.orange,
					}}
				>
					{title}
				</Title>
			</Body>

			<Right />
		</Header>
	);
};

export default BLHeader;
