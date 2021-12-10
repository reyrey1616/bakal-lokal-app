import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { Card, CardItem } from "native-base";
import styled from "styled-components/native";
import { theme } from "../../infra/theme";
import { Spacer } from "../spacer/spacer.component";
import { useRoute } from "@react-navigation/native";
const CardContainer = styled(Card)`
	border-radius: 12px;
	overflow: hidden;
	width: 100%;
	margin-bottom: 8px;0
`;

const MerchantContentContainer = styled(View)`
  flex-direction: row;
  padding-bottom: 15px;
`;

export const CategoriesCard = ({ category, navigation }) => {
  const route = useRoute();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Categories", {
          id: category?._id,
          name: category?.name,
        });
      }}
    >
      <CardContainer>
        <CardItem cardBody>
          <Image
            source={{
              uri: `https://bakal-lokal.xyz/categories/${category?.image}`,
            }}
            style={{
              height: 150,
              width: null,
              flex: 1,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          />
        </CardItem>
        <MerchantContentContainer>
          <View style={{ width: "60%" }}>
            <Spacer position="bottom" size="large" />
            <View style={{ paddingLeft: 15 }}>
              <Text
                style={{
                  fontSize: theme?.fontSizes.body,
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                {category?.name}
              </Text>
            </View>
          </View>

          <View style={{ width: "40%" }}>
            <Spacer position="bottom" size="large" />
            {/* <View style={{ paddingLeft: 15 }}>
              <Text
                style={{
                  fontSize: theme?.fontSizes.body,
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                Ratings Here
              </Text>
            </View> */}
            <Spacer position="bottom" size="medium" />
            <View style={{ paddingLeft: 15 }}>
              <Text
                style={{
                  fontSize: theme?.fontSizes.caption,
                  color: theme.colors.brand.grey,
                }}
              >
                {/* {merchant?.numberOfProducts} products */}
              </Text>
            </View>
          </View>
        </MerchantContentContainer>
      </CardContainer>
    </TouchableOpacity>
  );
};
