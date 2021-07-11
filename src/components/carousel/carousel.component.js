import * as React from "react";
import { Text, View, Dimensions, ImageBackground } from "react-native";
import Carousel from "react-native-snap-carousel";

export default class ImageCarousel extends React.Component {
	render() {
		return (
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<Carousel
					data={this?.props?.data}
					layout={"stack"}
					ref={(ref) => (this.carousel = ref)}
					autoplay
					autoplayDelay={3000}
					sliderWidth={Dimensions.get("window").width}
					itemWidth={Dimensions.get("window").width}
					renderItem={(item, index) => {
						return (
							<ImageBackground
								index={index}
								style={{
									borderRadius: 5,
									height: 175,
								}}
								source={{
									uri: `${item?.item}`,
								}}
							/>
						);
					}}
					onSnapToItem={(index) =>
						this.setState({ activeIndex: index })
					}
				/>
			</View>
		);
	}
}
