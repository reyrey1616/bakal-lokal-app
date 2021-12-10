import React from "react";
import { View, ScrollView } from "react-native";
import { theme } from "../../infra/theme";
import styled from "styled-components/native";
import { CategoriesCard } from "./categories-card.component";
const ScrollViewContainer = styled(ScrollView)`
  background-color: #fff;
  height: auto;
`;

const CategoriesContainer = ({ navigation, categories }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollViewContainer
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.brand.dirtywhite,
          flexDirection: "column",
          padding: 10,
        }}
      >
        {categories?.map((category) => (
          <CategoriesCard
            key={category?.id}
            category={category}
            navigation={navigation}
          />
        ))}
      </ScrollViewContainer>
    </View>
  );
};

export default CategoriesContainer;
