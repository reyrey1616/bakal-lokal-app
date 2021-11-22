import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../infra/theme/colors";
import { Thumbnail, Text } from "native-base";
import StarRating from "react-native-star-rating";

const Reviews = ({ data }) => {
    
	return (
		<View>
			<View
				style={{
					paddingBottom: 10,
					paddingTop: 10,
					borderBottomColor: colors.brand.grey,
					borderBottomWidth: 0.5,
					marginBottom: 10,
				}}
			>
				<Text> Product feedback </Text>
			</View>
			{data &&
				data?.map((d, key) => {
					return (
						<View
							key={key}
							style={{
								paddingTop: 7,
								paddingBottom: 15,
								borderBottomColor: colors.brand.grey,
								borderBottomWidth: 0.5,
							}}
						>
							<View
								avatar
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: 7,
								}}
							>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									{d?.customer?.image ? (
										<Thumbnail
											style={{
												width: 33,
												height: 33,
												marginRight: 10,
											}}
											source={{
												uri: `https://bakal-lokal.xyz/customers/${d?.customer?.image}`,
											}}
										/>
									) : (
										<Thumbnail
											style={{
												width: 33,
												height: 33,
												marginRight: 10,
											}}
											source={{
												uri:
													"https://bakal-lokal.com/static/media/main-logo-transparent.4671d915.png",
											}}
										/>
									)}
									<Text>
										{d?.customer?.fname +
											" " +
											d?.customer?.lname}
									</Text>
								</View>

								<View
									style={{
										width: "25%",
									}}
								>
									<StarRating
										disabled={true}
										maxStars={5}
										rating={parseFloat(d?.ratings)}
										starSize={15}
										fullStarColor="orange"
									/>
								</View>
							</View>

							<Text note>{d?.comment}</Text>
						</View>
					);
				})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "white",
		marginTop: 5,
		flex: 1,
	},
	table: {
		width: "100%",
		padding: 10,
	},
	header: {
		borderColor: colors.brand.dirtywhite,
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
	},
	cell: {
		padding: 10,
		width: "auto",
		justifyContent: "flex-start",
	},
	row: {
		borderTopWidth: 1,
		borderColor: colors.brand.dirtywhite,
		width: "100%",
		flexDirection: "row",
		width: "100%",
		paddingTop: 7,
		paddingBottom: 7,
		justifyContent: "space-between",
	},
});

export default Reviews;
