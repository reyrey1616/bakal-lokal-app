import React, { useState } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
} from "react-native";
import { Spacer } from "../spacer/spacer.component";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../infra/theme/colors";
import { Button } from "native-base";
import ButtonTypes from "../utils/buttons.component";
const Variations = ({ onSelectVariation, variations, productImage, text }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [variant, setVariant] = useState(null);

	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				style={{
					backgroundColor: "rgba(0,0,0,0.1)",
				}}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View>
					<View style={styles.modalView}>
						<Image
							style={{
								width: "100%",
								height: 275,
								borderRadius: 15,
							}}
							source={{
								uri: variant
									? `https://bakal-lokal.xyz/product_variations/${variant?.variation_image}`
									: productImage,
							}}
						/>
						{/* Variant Buttons */}
						<View style={styles.variationsContainer}>
							{variations &&
								variations?.map((v, id) => {
									return (
										<View
											style={styles.variationView}
											key={id}
										>
											<TouchableHighlight
												style={{
													...styles.variation,
													backgroundColor:
														variant?.name ===
														v?.name
															? colors.brand
																	.orange
															: "transparent",
												}}
												onPress={() => {
													setVariant(v);
												}}
											>
												<Text
													style={{
														color:
															variant?.name ===
															v?.name
																? "white"
																: colors.brand
																		.orange,
													}}
												>
													{`${v?.name}`}
												</Text>
											</TouchableHighlight>
										</View>
									);
								})}
						</View>

						{/* Options */}
						<View style={styles.optionContainer}>
							<ButtonTypes.PrimaryButton
								bordered
								warning
								style={styles.optionButton}
								onPress={() => {
									if (variant) {
										setModalVisible(false);

										onSelectVariation(variant);
									} else {
										Alert.alert(
											"Please select a variation"
										);
									}
								}}
							>
								<ButtonTypes.PrimaryButtonText>
									Confirm
								</ButtonTypes.PrimaryButtonText>
							</ButtonTypes.PrimaryButton>
							<Button
								bordered
								warning
								style={styles.optionButton}
								onPress={() => {
									setModalVisible(false);
								}}
							>
								<ButtonTypes.SecondaryButtonText>
									Cancel
								</ButtonTypes.SecondaryButtonText>
							</Button>
						</View>
					</View>
				</View>
			</Modal>
			<View
				style={{
					flexDirection: "row",
				}}
			>
				{/* <TouchableOpacity onPress={() => setModalVisible(true)}>
					<Text
						style={{
							color: colors.brand.grey,
						}}
					>
						Choose variation{" "}
						<AntDesign name="right" color={colors.brand.orange} />
					</Text>
				</TouchableOpacity> */}

				<ButtonTypes.PrimaryButton
					style={{
						paddingTop: 10,
						paddingBottom: 10,
						height: 50,
					}}
					onPress={() => setModalVisible(true)}
				>
					<ButtonTypes.PrimaryButtonText>
						{text}
					</ButtonTypes.PrimaryButtonText>
					<Spacer position="right" size="medium" />
					<AntDesign name="right" color={"white"} />
				</ButtonTypes.PrimaryButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	modalView: {
		margin: 20,
		width: "90%",
		backgroundColor: "white",
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	optionContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		flexWrap: "wrap",
		marginTop: 15,
	},
	optionButton: {
		width: "47%",
		alignItems: "center",
		justifyContent: "center",
		margin: "1%",
		marginBottom: 15,
	},
	variationsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
		marginTop: 15,
	},
	variationView: {
		width: "30%",
		marginRight: 5,
	},
	variation: {
		width: "100%",
		padding: 5,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 5,
		borderColor: colors.brand.orange,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 15,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default Variations;
