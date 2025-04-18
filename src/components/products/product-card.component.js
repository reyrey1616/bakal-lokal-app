import React from "react";
import { Image, View, Text, TouchableOpacity, Alert } from "react-native";
import { Card, CardItem } from "native-base";
import styled from "styled-components/native";
import { theme } from "../../infra/theme";
import { Spacer } from "../spacer/spacer.component";
import currencyFormat from "../../utils/currencyFormat";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { updateCartStart } from "../../services/auth/auth.actions";
import { selectCurrentUser } from "../../services/auth/auth.selectors";
const CardContainer = styled(Card)`
  border-radius: 12;
  overflow: hidden;
  width: 100%;
  height: 300;
  margin: 0;
`;

const ProductContentContainer = styled(View)`
  flex-direction: column;
  height: 45%;
  position: relative;
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
export const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ProductDetails", {
          product,
          previousScreen: route?.name,
        });
      }}
      style={{
        padding: 5,
        backgroundColor: "transparent",
        width: "50%",
        margin: 0,
      }}
    >
      <CardContainer>
        <CardItem cardBody style={{ height: "55%" }}>
          <Image
            source={{
              uri: `https://bakal-lokal.xyz/products/${product?.profileImage}`,
            }}
            style={{
              height: "100%",
              width: "100%",
              flex: 1,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          />
        </CardItem>
        <ProductContentContainer>
          <CardItem>
            <Spacer position="bottom" size="medium" />
            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                {product?.name?.length > 30
                  ? product?.name?.substring(0, 30) + "..."
                  : product?.name}
              </Text>
            </View>
          </CardItem>
          {product?.product_type === "Variable" ? (
            <CardItem>
              <Spacer position="bottom" size="medium" />

              <Text
                style={{
                  fontSize: theme?.fontSizes.button,
                  color: theme.colors.brand.orange,
                }}
              >
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
            </CardItem>
          ) : (
            <CardItem>
              <Spacer position="bottom" size="medium" />

              <Text
                style={{
                  fontSize: theme?.fontSizes.body,
                  color: theme.colors.brand.orange,
                }}
              >
                {currencyFormat(product?.srp)}
              </Text>
            </CardItem>
          )}
          <View
            style={{
              paddingLeft: 15,
              paddingRight: "20%",
              paddingBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: theme.colors.brand.grey,
              }}
            >
              {product?.merchant?.name}
            </Text>
          </View>

          {product?.product_type === "Simple" && (
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
              }}
              onPress={() => {
                if (!currentUser) {
                  navigation.navigate("Login");
                  Alert.alert(
                    "Bakal Lokal",
                    "Please login first to add items to bayong."
                  );
                } else {
                  dispatch(
                    updateCartStart({
                      payload: {
                        product: product?._id,
                        variant: null,
                        variantDetails: null,
                        quantity: 1,
                        actionType: "ADD",
                      },
                      callback: () => {
                        Alert.alert("Bakal Lokal", "Added to Bayong");
                      },
                    })
                  );
                }
              }}
            >
              {/* <FontAwesome
								name="plus"
								size={24}
								color={theme.colors.brand.orange}
							/> */}

              <Image
                source={require("../../assets/design/cart-icon.png")}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          )}
        </ProductContentContainer>
      </CardContainer>
    </TouchableOpacity>
  );
};
