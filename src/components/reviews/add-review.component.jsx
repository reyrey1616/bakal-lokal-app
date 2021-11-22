import React from "react";
import { View } from "react-native";
import { Container, Content, Textarea, Form, Text } from "native-base";
import ButtonTypes from "../utils/buttons.component";
import StarRating from "react-native-star-rating";
const AddReviewForm = ({ onSetForm, form, onAddReview }) => {
	return (
		<View>
			<Text style={{ marginBottom: 15 }}> Add a review </Text>
			<Form>
				<View
					style={{
						width: "100%",
						paddingBottom: 10,
						display: "flex",
						flexDirection: "row",
					}}
				>
					<Text> Product rating: </Text>
					<StarRating
						disabled={false}
						maxStars={5}
						rating={form?.ratings}
						selectedStar={(rating) =>
							onSetForm({
								...form,
								ratings: rating,
							})
						}
						starSize={23}
						fullStarColor="orange"
					/>
				</View>
				<Textarea
					rowSpan={5}
					bordered
					placeholder="Comment here.."
					value={form?.comment}
					onChangeText={(val) => {
						onSetForm({
							...form,
							comment: val,
						});
					}}
				/>

				<ButtonTypes.PrimaryButton
					style={{
						marginTop: 12,
						width: "60%",
						paddingTop: 10,
						paddingBottom: 10,
						height: 50,
					}}
					onPress={() => {
						onAddReview();
					}}
				>
					<ButtonTypes.PrimaryButtonText>
						Submit review
					</ButtonTypes.PrimaryButtonText>
				</ButtonTypes.PrimaryButton>
			</Form>
		</View>
	);
};

export default AddReviewForm;
