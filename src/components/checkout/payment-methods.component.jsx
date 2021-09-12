import React from "react";

import { TouchableHighlight, View } from "react-native";
import {
	Collapse,
	CollapseHeader,
	CollapseBody,
} from "accordion-collapse-react-native";
import { colors } from "../../infra/theme/colors";
import styled from "styled-components";
import { Text } from "../typography/text.component";
import { AntDesign } from "@expo/vector-icons";
import RenderHtml from "react-native-render-html";

const CollapseItem = styled(Collapse)`
	padding: 15px;
	background: white;
	margin: 3px;
	border: ${(props) =>
		props.selected ? `2px solid ${colors.brand.orange}` : 0};
`;

const PaymentMethodItem = ({ name, content, selected, onSelect }) => {
	return (
		<TouchableHighlight
			style={{
				width: "100%",
				backgroundColor: colors.brand.dirtywhite,
			}}
			onPress={() => {
				onSelect(name);
			}}
		>
			<CollapseItem selected={selected}>
				<CollapseHeader
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Text variant="title">{name} </Text>
					<Text variant="caption">
						View details{" "}
						<AntDesign
							name="caretright"
							size={12}
							color={colors.brand.orange}
						/>
					</Text>
				</CollapseHeader>
				<CollapseBody style={{ padding: 10 }}>
					<RenderHtml source={{ html: content }} />
				</CollapseBody>
			</CollapseItem>
		</TouchableHighlight>
	);
};

export default PaymentMethodItem;
