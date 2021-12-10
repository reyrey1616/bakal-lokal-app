import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../../screens/login.screen";
import RegistrationScreen from "../../screens/register.screen";
import DrawerMenuNavigator from "./menu.navigator";
// import { BottomNavigator } from "./bottom-navigation";
import ProductDetailsScreen from "../../screens/product-details.screen";
import CartScreen from "../../screens/cart.screen";
import DeliveryScreen from "../../screens/delivery.screen";
import CheckoutScreen from "../../screens/checkout.screen";
import { DrawerActions } from "@react-navigation/native";
import { getUserStart } from "../../services/auth/auth.actions";
import MapScreen from "../../screens/map.screen";
import { useDispatch, useSelector } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";
import { asyncStoreGet } from "../../services/utils";
import { Alert, View } from "react-native";
import { SafeArea } from "../../components/utils/safe-area.component";
import { Text } from "../../components/typography/text.component";
import { colors } from "../theme/colors";
import { Spacer } from "../../components/spacer/spacer.component";
import {
  selectAuthLoading,
  selectCurrentUser,
  selectLoginLoading,
} from "../../services/auth/auth.selectors";
import { Spinner } from "native-base";
import OrderDetailsScreen from "../../screens/order-details.screen";
import CategoriesScreen from "../../screens/categories.screen";
import ForgotPassword from "../../screens/forgot-password.screen";
import TemporaryRegister from "../../screens/temporary-register.screen";
import MainCategories from "../../screens/main-categories.screen";

export const navigationRef = React.createRef();

export function openDrawer(routeName, params) {
  navigationRef.current.dispatch(DrawerActions.openDrawer());
}

const MainStackNavigator = createStackNavigator();

const SampleScreen = () => (
  <SafeArea>
    <View>
      <Spacer position="bottom" size="medium" />
      <Text
        variant="title"
        style={{
          color: colors.brand.black,
        }}
      >
        Welcome to
      </Text>
      <Text
        variant="title"
        style={{
          color: colors.brand.orange,
        }}
      >
        BAKAL LOKAL
      </Text>
    </View>
  </SafeArea>
);

const MainNavigator = () => {
  const dispatch = useDispatch();
  const authLoading = useSelector(selectAuthLoading);

  const currentUser = useSelector(selectCurrentUser);
  const userLoginLoading = useSelector(selectLoginLoading);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await asyncStoreGet("token");
      if (token) {
        setAuthToken(token);
        dispatch(getUserStart());
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    console.log(currentUser?.fname);
  }, [currentUser]);

  // useEffect(() => {
  // 	Alert.alert(userLoginLoading);
  // 	if (!userLoginLoading) {
  // 		if (currentUser) {
  // 			setInitialScreenName("Menu");
  // 		} else {
  // 			setInitialScreenName("Login");
  // 		}
  // 	}
  // }, [userLoginLoading]);

  if (authLoading && !currentUser && userLoginLoading) {
    return (
      authLoading && (
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner color="orange" />
        </View>
      )
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStackNavigator.Navigator
        headerMode="none"
        initialRouteName={"Menu"}
        screenOptions={{
          ...TransitionPresets.ModalPresentationIOS,
        }}
      >
        <MainStackNavigator.Screen name="Login" component={LoginScreen} />
        <MainStackNavigator.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
        />
        <MainStackNavigator.Screen
          name="OrderDetails"
          component={OrderDetailsScreen}
        />
        <MainStackNavigator.Screen
          name="Registration Form"
          component={TemporaryRegister}
        />
        <MainStackNavigator.Screen
          name="Menu"
          component={DrawerMenuNavigator}
        />
        <MainStackNavigator.Screen name="Cart" component={CartScreen} />
        <MainStackNavigator.Screen name="Delivery" component={DeliveryScreen} />
        <MainStackNavigator.Screen name="Checkout" component={CheckoutScreen} />
        <MainStackNavigator.Screen
          name="Categories"
          component={CategoriesScreen}
        />
        <MainStackNavigator.Screen
          name="MainCategories"
          component={MainCategories}
        />
        <MainStackNavigator.Screen
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <MainStackNavigator.Screen name="Map" component={MapScreen} />
      </MainStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
