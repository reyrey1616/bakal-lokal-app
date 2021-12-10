import React from "react";
import { ScrollView, View, Image, TouchableOpacity, Alert } from "react-native";
import { Text } from "../typography/text.component";
import styled from "styled-components";
import { Spacer } from "../spacer/spacer.component";
import SectionTitle from "../utils/title.component";
import { useSelector } from "react-redux";
import { selectCategories } from "../../services/category/category.selectors";
import { useNavigation } from "@react-navigation/core";
import { theme } from "../../infra/theme";

const HorizontalScrollView = styled(ScrollView)`
  width: 100%;
`;

const CategoryItemContainer = styled(TouchableOpacity)`
  border-radius: 8px;
  width: 120;
`;

const CategoryItemImageContainer = styled(Image)`
  border-radius: 8px;
`;

export const CategoriesList = () => {
  const categories = useSelector(selectCategories);
  const navigation = useNavigation();

  return (
    <View style={{ padding: 15 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SectionTitle text1="Product" text2="categories" />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MainCategories");
          }}
        >
          <Text
            variant="title"
            style={{
              color: theme.colors.brand.orange,
              marginRight: 10,
            }}
          >
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <Spacer position="bottom" size="large" />

      <HorizontalScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories &&
          categories?.map((cat) => {
            return <CategoryItem category={cat} key={cat?._id} />;
          })}
      </HorizontalScrollView>
    </View>
  );
};

export const CategoryItem = ({ category }) => {
  const navigation = useNavigation();
  return (
    <CategoryItemContainer
      style={{
        paddingRight: 15,
        shadowColor: "#333",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
      }}
      onPress={() => {
        navigation.navigate("Categories", {
          id: category?._id,
          name: category?.name,
        });
      }}
    >
      <CategoryItemImageContainer
        source={{
          uri: `https://bakal-lokal.xyz/categories/${category?.image}`,
        }}
        style={{ width: 100, height: 100 }}
      />
      <Spacer position="bottom" size="medium" />
      <Text style={{ flex: 1, flexWrap: "wrap" }}>{category?.name} </Text>
    </CategoryItemContainer>
  );
};
