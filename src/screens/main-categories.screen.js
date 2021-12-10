import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeArea } from "../components/utils/safe-area.component";
import BLHeader from "../components/header/header.component";
import { PageHeader } from "../components/utils/page-header.component";
// import { ShopsWithSearch } from "../components/merchants/merchant-with-search.component";
import CategoriesContainer from "../components/categories/categories-container.component";
import { colors } from "../infra/theme/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategories,
  selectLoading,
} from "../services/category/category.selectors";
import { Spinner, Content } from "native-base";
import { useRoute } from "@react-navigation/core";
import styled from "styled-components/native";
const ScrollViewContainer = styled(ScrollView)`
  background-color: #fff;
  height: auto;
`;

const MainCategories = ({ navigation }) => {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const categories = useSelector(selectCategories);
  const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const route = useRoute();

  useEffect(() => {
    setCategoriesToDisplay(categories && categories);
  }, [loading]);

  //   useEffect(() => {
  //     setMerchantsToDisplay(merchants && merchants);
  //   }, [loading]);

  //   const onFilterMerchant = (val) => {
  //     if (!val) return;

  //     if (val === "") {
  //       setMerchantsToDisplay(merchants && merchants);
  //     }

  //     let filtered = merchants?.filter((m) => {
  //       return m.name.toLowerCase().includes(val?.toLowerCase());
  //     });
  //     setSelectedCategory("");
  //   };

  //   const selectCategory = (val) => {
  //     if (!val) return;

  //     if (val === "" || val === null || val === undefined) {
  //       setMerchantsToDisplay(merchants && merchants);
  //     }
  //     setSelectedCategory(val);
  //     const filtered = merchants?.filter((m) => {
  //       const isExistingOnCategories = m?.categories?.find(
  //         (c) => c?.name === val
  //       );

  //       return isExistingOnCategories;
  //     });

  //     setMerchantsToDisplay(filtered);
  //   };

  return (
    <SafeArea>
      <BLHeader title="Categories" previousScreen={"Home"} />
      <ScrollViewContainer
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.brand.dirtywhite,
          flexDirection: "column",
          padding: 7.5,
        }}
      >
        {loading ? (
          <Content>
            <Spinner color="orange" />
          </Content>
        ) : (
          <>
            {/* <ShopsWithSearch
							onTextSearch={(val) => onFilterMerchant(val)}
							onSelectCategory={(val) => selectCategory(val)}
							selectedCategory={selectedCategory}
						/> */}
            <CategoriesContainer
              navigation={navigation}
              categories={categories && categoriesToDisplay}
            />
          </>
        )}
      </ScrollViewContainer>
    </SafeArea>
  );
};

export default MainCategories;
