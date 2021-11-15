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
`;

const FAQData = [
	{
		id: 1,
		title: "What is Bakal Lokal?",
		body:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
	},
	{
		id: 2,
		title: "How to register?",
		body:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
	},
	{
		id: 3,
		title: "How to purchase item?",
		body:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
	},
	{
		id: 4,
		title: "How do I receive my order?",
		body:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
	},
	{
		id: 5,
		title: "Where do I pickup my order?",
		body:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
	},
];

const FAQs = () => {
	return (
		<>
			{FAQData?.map((d) => {
				return (
					<TouchableHighlight
						style={{
							width: "100%",
							backgroundColor: colors.brand.dirtywhite,
						}}
					>
						<CollapseItem>
							<CollapseHeader
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Text variant="title">{d?.title} </Text>
								<Text variant="caption">
									<AntDesign
										name="caretright"
										size={12}
										color={colors.brand.orange}
									/>
								</Text>
							</CollapseHeader>
							<CollapseBody style={{ padding: 10 }}>
								<RenderHtml source={{ html: d?.body }} />
							</CollapseBody>
						</CollapseItem>
					</TouchableHighlight>
				);
			})}
		</>
	);
};

export default FAQs;
