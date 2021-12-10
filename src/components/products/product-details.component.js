import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Spinner } from "native-base";
import { theme } from "../../infra/theme";
import { Text } from "../typography/text.component";
import styled from "styled-components/native";
import currencyFormat from "../../utils/currencyFormat";
import { Spacer } from "../spacer/spacer.component";
import Variations from "./product-variations.component";
import moment from "moment";
import getPrice from "../../utils/getPrice";
import { BottomCart } from "../bottom-cart/bottom-cart.component";
import { useRoute } from "@react-navigation/core";
import { updateCartStart } from "../../services/auth/auth.actions";
import { useDispatch } from "react-redux";
import Reviews from "../reviews/reviews.component";
import AddReviewForm from "../reviews/add-review.component";
import axios from "axios";
import { ProductsContainer } from "../../components/products/products-container.component";
const SectionView = styled(View)`
  margin-top: 5;
  padding-top: 10;
  padding-bottom: 12;
  padding-left: 20;
  padding-right: 12;
  background: white;

  width: 100%;
`;

const ProductTitleSection = styled(View)`
  margin-top: 5;
  padding-top: 20;
  padding-bottom: 20;
  padding-left: 20;
  padding-right: 20;
  background: white;
  width: 100%;
`;

const ScrollViewContainer = styled(ScrollView)`
  background-color: #fff;
  height: auto;
`;

const dateCompareIfOnSale = (date1, date2) => {
  if (!date1 || !date2) {
    return false;
  }
  if (
    moment(date1).format("YYYY-MM-DD") >= moment(date2).format("YYYY-MM-DD")
  ) {
    return true;
  } else {
    return false;
  }
};

const getProductsByMerchant = async (merchant) => {
  try {
    const request = await axios.get(
      `/products/?merchantName=${merchant?.name}`
    );
    const response = await request.data;

    if (response?.success) {
      return response?.data;
    } else {
      throw Error;
    }
  } catch (err) {
    return [];
  }
};

const addNewReview = async (reviewForm, id, merchant) => {
  try {
    const reviews = await axios.post(`/reviews/${id}`, {
      ...reviewForm,
      merchant,
    });
    const response = await reviews?.data;
    if (response?.success) {
      Alert.alert("Bakal Lokal", "Review has been submitted.");

      return true;
    } else {
      throw Error;
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      const errorResponse = error.response.data.error;

      Alert.alert("Bakal Lokal", errorResponse);
    } else {
      Alert.alert(
        "Bakal Lokal",
        "Error adding review. Please try again later!"
      );
    }

    return false;
  }
};

export const ProductDetails = ({
  product,
  navigation,
  reviews,
  reviewsLoading,
}) => {
  const [variant, setVariant] = useState(null);
  const dispatch = useDispatch();
  const route = useRoute();
  const [productsFromTheSameShop, setProductsFromTheShop] = useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const getProductsFromTheSameShop = async () => {
        const data = await getProductsByMerchant(product?.merchant);
        setProductsFromTheShop(data?.slice(0, 4));
      };

      getProductsFromTheSameShop();
    });

    return unsubscribe;
  }, [navigation]);

  const [reviewForm, onSetReviewForm] = useState({
    comment: "",
    ratings: 1,
  });

  const onHandleAddReview = async (reviewData) => {
    onSetReviewForm(reviewData);
  };

  const onAddReview = async () => {
    if (!product?._id) {
      Alert.alert(
        "Bakal Lokal",
        "Something went wrong. Please reload the app."
      );
    } else if (!product?.merchant?._id) {
      Alert.alert(
        "Bakal Lokal",
        "Something went wrong. Please reload the app."
      );
    } else if (!reviewForm?.comment) {
      Alert.alert("Bakal Lokal", "Please specify your comment!");
    } else {
      const added = await addNewReview(
        reviewForm,
        product?._id,
        product?.merchant?._id
      );
      if (added) {
        onSetReviewForm({
          comment: "",
          ratings: 1,
        });
      }
    }
  };

  const onSelectVariation = (variant) => {
    setVariant(variant);
  };

  const onValueChange = (val) => {
    console.log(val);
  };

  const onAddToCart = (quantity) => {
    if (product?.product_type === "Variable") {
      dispatch(
        updateCartStart({
          payload: {
            product: product?._id,
            variant: variant?.name?.trim(),
            variantDetails: variant,
            variant_id: variant?.id?.trim(),
            quantity: quantity,
            actionType: "ADD",
          },
          callback: () => {
            Alert.alert("Bakal Lokal", "Added to Bayong");
          },
        })
      );
    } else {
      dispatch(
        updateCartStart({
          payload: {
            product: product?._id,
            variant: null,
            variantDetails: null,
            quantity: quantity,
            actionType: "ADD",
          },
          callback: () => {
            Alert.alert("Bakal Lokal", "Added to Bayong");
          },
        })
      );
    }
  };

  const VariationPriceRange = () => (
    <Text variant="body" style={{ color: theme.colors.brand.orange }}>
      {" "}
      {currencyFormat(
        Math.min.apply(
          Math,
          product.variations.map((v) => {
            if (
              dateCompareIfOnSale(
                v?.saleDetails?.saleEndDate,
                new Date(Date.now())
              )
            ) {
              return v?.saleDetails?.salePrice;
            } else {
              return v.srp;
            }
          })
        )
      )}{" "}
      {" - "}
      {currencyFormat(
        Math.max.apply(
          Math,
          product.variations.map((v) => {
            if (
              dateCompareIfOnSale(
                v?.saleDetails?.saleEndDate,
                new Date(Date.now())
              )
            ) {
              return v?.saleDetails?.salePrice;
            } else {
              return v.srp;
            }
          })
        )
      )}
    </Text>
  );

  return (
    <View style={{ flex: 1, position: "relative", paddingTop: 5 }}>
      <ScrollViewContainer
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.brand.dirtywhite,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {/* Name */}
        <ProductTitleSection>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text variant="title">{product?.name}</Text>
          </View>
          <Spacer position="bottom" size="medium" />

          {product?.product_type === "Variable" ? (
            !variant ? (
              <VariationPriceRange />
            ) : (
              <Text variant="body" style={{ color: theme.colors.brand.orange }}>
                {currencyFormat(getPrice(variant))}
              </Text>
            )
          ) : (
            <Text variant="body" style={{ color: theme.colors.brand.orange }}>
              {currencyFormat(getPrice(product))}
            </Text>
          )}
        </ProductTitleSection>

        {/* Variation */}
        {product?.product_type === "Variable" && (
          <SectionView>
            <Spacer position="bottom" size="medium" />

            <Text
              variant="body"
              style={{
                color: theme.colors.brand.black,
                fontWeight: "bold",
              }}
            >
              Variable
            </Text>
            <Spacer position="bottom" size="medium" />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: theme?.fontSizes.caption,
                  color: theme.colors.brand.orange,
                }}
              >
                {variant ? variant?.name : "None"}
              </Text>
              {/* Variations */}
              <Variations
                text={variant ? "Change variation" : "Choose variation"}
                onSelectVariation={onSelectVariation}
                variations={product?.variations}
                productImage={`https://bakal-lokal.xyz/products/${product?.profileImage}`}
              />
            </View>
            <Spacer position="bottom" size="medium" />
          </SectionView>
        )}

        {/* Categories */}
        <SectionView>
          <Spacer position="bottom" size="medium" />

          <Text
            variant="body"
            style={{
              color: theme.colors.brand.black,
              fontWeight: "bold",
            }}
          >
            Categories
          </Text>
          <Spacer position="bottom" size="medium" />
          <View>
            {product &&
              product?.categoryArray?.map((cat, index) => {
                return (
                  <Text
                    style={{
                      fontSize: theme?.fontSizes.caption,
                      color: theme.colors.brand.orange,
                    }}
                  >
                    {cat}
                    {index < product?.categoryArray?.length - 1
                      ? ",\u00A0"
                      : ""}
                  </Text>
                );
              })}
          </View>
        </SectionView>

        {/* Description */}
        <SectionView>
          <Spacer position="bottom" size="medium" />

          <Text
            variant="body"
            style={{
              color: theme.colors.brand.black,
              fontWeight: "bold",
            }}
          >
            Product details
          </Text>
          <Spacer position="bottom" size="medium" />
          <Text variant="caption">{product?.description}</Text>
        </SectionView>
        {/* Merchant */}
        <SectionView>
          <Spacer position="bottom" size="medium" />

          <Text
            variant="body"
            style={{
              color: theme.colors.brand.black,
              fontWeight: "bold",
            }}
          >
            Merchant
          </Text>
          <Spacer position="bottom" size="medium" />
          <Text variant="body" style={{ color: theme.colors.brand.orange }}>
            {product?.merchant?.name}
          </Text>
        </SectionView>

        <SectionView>
          {!reviews && !reviewsLoading ? (
            <Spinner color="orange" />
          ) : (
            <Reviews data={reviews && reviews} />
          )}
        </SectionView>

        <SectionView>
          <AddReviewForm
            form={reviewForm}
            onSetForm={(d) => {
              onHandleAddReview(d);
            }}
            onAddReview={onAddReview}
          />
        </SectionView>

        {/* Name */}
        <ProductTitleSection>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>
              <Text
                variant="title"
                style={{
                  color: theme.colors.brand.orange,
                }}
              >
                From the
              </Text>
              <Text
                variant="title"
                style={{
                  color: theme.colors.brand.black,
                }}
              >
                {" "}
                same shop
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Shops", {
                  screen: "ShopDetails",
                  params: {
                    merchant: product?.merchant,
                    previousScreen: route?.name,
                  },
                });
              }}
            >
              <Text
                variant="title"
                style={{
                  color: theme.colors.brand.orange,
                }}
              >
                See all
              </Text>
            </TouchableOpacity>
          </View>
        </ProductTitleSection>
        <View>
          <ProductsContainer
            products={productsFromTheSameShop && productsFromTheSameShop}
          />
        </View>
      </ScrollViewContainer>
      <BottomCart
        onValueChange={onValueChange}
        disabled={
          product?.product_type === "Variable"
            ? variant
              ? false
              : true
            : false
        }
        onAddToCart={onAddToCart}
      />
    </View>
  );
};
