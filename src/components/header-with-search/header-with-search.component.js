import React from "react";
import { Image, TouchableOpacity } from "react-native";
import {
	Header,
	Button,
	Right,
	Body,
	Left,
	Icon,
	Item,
	Input,
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { colors } from "../../infra/theme/colors";
import { Spacer } from "../spacer/spacer.component";
import { Ionicons } from "@expo/vector-icons";

const HeaderWithSearch = ({ navigation }) => {
	return (
		<Header style={{ color: "#ffffff", padding: 0 }} searchBar>
			<Grid
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center !important",
				}}
			>
				<Col size={15}>
					<TouchableOpacity style={{ padding: 10 }}>
						<Ionicons
							name="menu-outline"
							size={40}
							color={colors.brand.orange}
						/>
					</TouchableOpacity>
				</Col>
				<Col size={70}>
					<Body style={{ paddingRight: 15 }}>
						<Item>
							<Icon name="ios-search" />
							<Input placeholder="Search" />
						</Item>
					</Body>
				</Col>
				<TouchableOpacity style={{ padding: 10 }}>
					<Image
						source={require("../../assets/logo/bl-basket.png")}
						style={{
							width: 35,
							height: 35,
							borderRadius: "50%",
						}}
					/>
				</TouchableOpacity>
			</Grid>
		</Header>
	);
};

export default HeaderWithSearch;
