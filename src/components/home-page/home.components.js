import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Buttons from "../utils/buttons.component";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export const ShopAllProducts = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.products}
      onPress={() => {
        navigation.navigate("Products");
      }}
    >
      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        source={require("../../assets/design/home-background.jpg")}
        style={styles.productImage}
      >
        <Buttons.SecondaryButton
          style={styles.button}
          onPress={() => {
            navigation.navigate("Products");
          }}
        >
          <Buttons.SecondaryButtonText style={{ paddingRight: 15 }}>
            Shop all products
          </Buttons.SecondaryButtonText>
          <FontAwesome5 name="angle-right" size={15} color="orange" />
        </Buttons.SecondaryButton>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const Shops = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.shops}
      onPress={() => {
        navigation.navigate("Shops");
      }}
    >
      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        source={require("../../assets/design/home-shops.jpg")}
        style={styles.shopImage}
      >
        <Buttons.PrimaryButton
          style={styles.shopsButton}
          onPress={() => {
            navigation.navigate("Shops");
          }}
        >
          <Buttons.PrimaryButtonText style={{ paddingRight: 15 }}>
            View shops
          </Buttons.PrimaryButtonText>
          <FontAwesome5 name="angle-right" size={15} color="white" />
        </Buttons.PrimaryButton>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  products: {
    padding: 15,
    height: 230,
  },
  shops: {
    padding: 15,
    height: 100,
  },
  productImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  shopImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    bottom: 25,
    left: 25,
  },
  shopsButton: {
    position: "absolute",
    left: 25,
  },
});
