import React, { useState, useEffect } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import {
  Button,
  Input,
  Item,
  Header,
  Left,
  Right,
  Title,
  Body,
  Icon,
} from "native-base";
import {
  Image,
  View,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import ButtonTypes from "../components/utils/buttons.component";
import { Spacer } from "../components/spacer/spacer.component";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "../components/typography/text.component";
import { colors } from "../infra/theme/colors";
import SectionTitle from "../components/utils/title.component";
import { useDispatch } from "react-redux";
import { loginStart, getUserStart } from "../services/auth/auth.actions";
import { connect } from "react-redux";
import {
  selectCurrentUser,
  selectAuthentication,
} from "../services/auth/auth.selectors";
import { createStructuredSelector } from "reselect";
import { fontSizes } from "../infra/theme/fonts";
import { useNavigation } from "@react-navigation/native";
import setAuthToken from "../utils/setAuthToken";

const LoginScreen = ({ currentUser, isAuthenticated }) => {
  const dispatch = useDispatch();
  // const [form, setForm] = useState({
  //   email: "guidoriagaorey16@gmail.com",
  //   password: "12345678",
  // });
  const navigation = useNavigation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser && isAuthenticated) {
      navigation.navigate("Menu");
    }
  }, [currentUser]);

  const onSubmit = (data) => {
    if (data?.email === "") {
      Alert.alert("Bakal Lokal", "Please input email!");
    } else if (data?.password === "") {
      Alert.alert("Bakal Lokal", "Please input password!");
    } else {
      dispatch(
        loginStart(data, async (token) => {
          setAuthToken(token);
          dispatch(
            getUserStart((data) => {
              Alert.alert("Bakal Lokal", "Login Success");
              navigation.navigate("Menu");
            })
          );
        })
      );
    }
  };
  return (
    <SafeArea>
      <ImageBackground
        style={{
          width: "100%",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        source={require("../assets/design/background.png")}
      >
        <View>
          <Header style={{ backgroundColor: "white" }}>
            <Left>
              <Button transparent>
                <Icon
                  onPress={() => {
                    navigation.navigate("Menu");
                  }}
                  name="arrow-back"
                  style={{
                    color: colors.brand.orange,
                  }}
                />
              </Button>
            </Left>
            <Body>
              <Title
                style={{
                  color: colors.brand.orange,
                }}
              >
                User Login
              </Title>
            </Body>

            <Right />
          </Header>
          <Spacer position="bottom" size="small" />
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: "white",
              paddingLeft: "15%",
              paddingRight: "15%",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/logo/main-logo-transparent.png")}
              style={{ width: 70, height: 70 }}
            />
            <View style={{ padding: 15 }}>
              <Spacer position="bottom" size="medium" />
              <Text
                variant="title"
                style={{
                  color: colors.brand.black,
                  fontSize: fontSizes.h5,
                }}
              >
                Welcome to
              </Text>
              <Text
                variant="title"
                style={{
                  color: colors.brand.orange,
                  fontSize: fontSizes.h5,
                }}
              >
                BAKAL LOKAL
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 5,
              marginTop: 5,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
              }}
            >
              <SectionTitle text1="Please" text2="Login" />
            </View>
            <Item regular style={{ borderRadius: 7 }}>
              <AntDesign name="user" size={24} color="orange" />
              <Input
                placeholder="Email"
                onChangeText={(text) => {
                  setForm({ ...form, email: text });
                }}
                value={form?.email}
              />
            </Item>
            <Spacer size="medium" position="bottom" />
            <Item regular style={{ borderRadius: 7 }}>
              <AntDesign name="key" size={24} color="orange" />

              <Input
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  setForm({ ...form, password: text });
                }}
                value={form?.password}
              />
            </Item>

            <TouchableOpacity
              style={{
                alignItems: "flex-end",
                justifyContent: "flex-end",
                padding: 15,
              }}
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            >
              <Text variant="caption" style={{ color: colors.brand.orange }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "white",
          }}
        >
          <Spacer position="bottom" size="large" />
          <Button
            bordered
            warning
            style={{
              width: "47%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              navigation.navigate("Registration Form");
            }}
          >
            <ButtonTypes.SecondaryButtonText>
              Sign up
            </ButtonTypes.SecondaryButtonText>
          </Button>
          <Spacer position="bottom" size="large" />

          <ButtonTypes.PrimaryButton
            style={{
              width: "47%",
            }}
            onPress={() => {
              onSubmit(form);
            }}
          >
            <ButtonTypes.PrimaryButtonText>Login</ButtonTypes.PrimaryButtonText>
          </ButtonTypes.PrimaryButton>
        </View>
      </ImageBackground>
    </SafeArea>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectAuthentication,
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(LoginScreen);
