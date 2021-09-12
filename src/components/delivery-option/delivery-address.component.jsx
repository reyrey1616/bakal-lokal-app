import React from "react";
import { View, Text } from "react-native";
import { Item, Label, Input } from "native-base";
const DeliveryAddressForm = ({ setForm, form }) => {
	return (
		<View
			style={{
				width: "100%",
				backgroundColor: "white",
				marginTop: 5,
				padding: 15,
			}}
		>
			<View style={{ width: "100%" }}>
				<Label style={{ padding: 5, paddingBottom: 10 }}>
					Address Line
				</Label>

				<Item regular>
					<Input
						value={form?.fullAddress}
						onChangeText={(value) => {
							console.log(value);
							setForm({
								...form,
								fullAddress: value,
							});
						}}
					/>
				</Item>
			</View>
			<View style={{ width: "100%" }}>
				<Label style={{ padding: 5, paddingBottom: 10 }}>
					Barangay
				</Label>

				<Item regular>
					<Input
						onChangeText={(value) => {
							setForm({
								...form,
								baranggay: value,
							});
						}}
						value={form?.baranggay}
					/>
				</Item>
			</View>
			<View style={{ width: "100%" }}>
				<Label style={{ padding: 5, paddingBottom: 10 }}>
					City/Municipality
				</Label>

				<Item regular>
					<Input
						onChangeText={(value) => {
							setForm({
								...form,
								city: value,
							});
						}}
						value={form?.city}
					/>
				</Item>
			</View>
			<View style={{ width: "100%" }}>
				<Label style={{ padding: 5, paddingBottom: 10 }}>
					Province
				</Label>

				<Item regular>
					<Input
						onChangeText={(value) => {
							setForm({
								...form,
								province: value,
							});
						}}
						value={form?.province}
					/>
				</Item>
			</View>
			<View style={{ width: "100%" }}>
				<Label style={{ padding: 5, paddingBottom: 10 }}>
					Zip Code
				</Label>

				<Item regular>
					<Input
						onChangeText={(value) => {
							setForm({
								...form,
								postcode: value,
							});
						}}
						value={form?.postcode}
					/>
				</Item>
			</View>
		</View>
	);
};

export default DeliveryAddressForm;
