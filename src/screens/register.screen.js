import React, { useState } from "react";
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
  Label,
  Picker,
} from "native-base";
import {
  View,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Linking,
} from "react-native";
import ButtonTypes from "../components/utils/buttons.component";
import { Spacer } from "../components/spacer/spacer.component";
import { Text } from "../components/typography/text.component";
import { colors } from "../infra/theme/colors";
import CustomDatePicker from "../components/utils/date-picker.component";
import { useDispatch, connect } from "react-redux";
import { registerStart } from "../services/auth/auth.actions";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const RegistrationScreen = ({ navigation, register }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    fname: "Rey",
    lname: "Guidoriagao",
    contactNumber: "09182254329",
    email: "jeannieguidoriagao12@gmail.com",
    password: "1111111111",
    bdate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    gender: "Male",
  });

  //   const [form, setForm] = useState({
  //     fname: "",
  //     lname: "",
  //     contactNumber: "",
  //     email: "",
  //     password: "",
  //     bdate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
  //     gender: "",
  //   });

  const onSubmit = (data) => {
    if (data?.fname === "") {
      Alert.alert("Bakal Lokal", "Please input first name!");
    } else if (data?.lname === "") {
      Alert.alert("Bakal Lokal", "Please input last name!");
    } else if (data?.contactNumber === "") {
      Alert.alert("Bakal Lokal", "Please input contact number!");
    } else if (data?.email === "") {
      Alert.alert("Bakal Lokal", "Please input email!");
    } else if (data?.bdate === "") {
      Alert.alert("Bakal Lokal", "Please select birthday!");
    } else if (data?.gender === "") {
      Alert.alert("Bakal Lokal", "Please select gender!");
    } else if (data?.password === "") {
      Alert.alert("Bakal Lokal", "Please input password!");
    } else {
      dispatch(
        register(data, (redirectTo) => {
          Alert.alert(
            "Bakal Lokal",
            "Registration successfull, We've sent you a mail to verify your account."
          );
          console.log(redirectTo);
          navigation.navigate("EmailSender", {
            redirectTo,
          });
          //   Linking.openURL(redirectTo);
        })
      );
    }
  };
  return (
    <SafeArea>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: colors.brand.dirtywhite,
          }}
        >
          <View>
            <Header style={{ backgroundColor: "white" }}>
              <Left>
                <Button transparent>
                  <Icon
                    onPress={() => {
                      navigation.navigate("Login");
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
                  Register
                </Title>
              </Body>

              <Right />
            </Header>
            <Spacer position="bottom" size="small" />

            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                marginTop: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "48%", marginRight: "4%" }}>
                  <Label
                    style={{
                      padding: 5,
                      paddingBottom: 10,
                    }}
                  >
                    First name
                  </Label>

                  <Item regular>
                    {/* First name input */}
                    <Input
                      onChangeText={(text) => {
                        setForm({
                          ...form,
                          fname: text,
                        });
                      }}
                      value={form?.fname}
                    />
                  </Item>
                </View>
                <View style={{ width: "48%" }}>
                  <Label
                    style={{
                      padding: 5,
                      paddingBottom: 10,
                    }}
                  >
                    Last name
                  </Label>

                  <Item regular>
                    {/* Last name input */}
                    <Input
                      onChangeText={(text) => {
                        setForm({
                          ...form,
                          lname: text,
                        });
                      }}
                      value={form?.lname}
                    />
                  </Item>
                </View>
              </View>

              {/* Phone Number */}
              <View style={{ width: "100%" }}>
                <Label style={{ padding: 5, paddingBottom: 10 }}>Phone</Label>

                <Item regular>
                  <Input
                    onChangeText={(text) => {
                      setForm({
                        ...form,
                        contactNumber: text,
                      });
                    }}
                    value={form?.contactNumber}
                  />
                </Item>
              </View>

              {/* Email */}
              <View style={{ width: "100%" }}>
                <Label style={{ padding: 5, paddingBottom: 10 }}>Email</Label>

                <Item regular>
                  <Input
                    onChangeText={(text) => {
                      setForm({ ...form, email: text });
                    }}
                    value={form?.email}
                  />
                </Item>
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    padding: 10,
                    paddingLeft: 0,

                    width: "50%",
                  }}
                >
                  <Label
                    style={{
                      padding: 5,
                      paddingBottom: 5,
                    }}
                  >
                    Birthday
                  </Label>
                  <CustomDatePicker
                    onSelectDate={(date) => {
                      console.log(date);
                      setForm({
                        ...form,
                        bdate: moment(date).format("YYYY-MM-DD"),
                      });
                    }}
                    value={moment(form?.bdate).format("YYYY-MM-DD")}
                    mode="date"
                    title="Choose date"
                    icon={
                      <AntDesign
                        name="calendar"
                        color={colors.brand.orange}
                        size={18}
                      />
                    }
                  />
                </View>
                <View
                  style={{
                    padding: 10,
                    paddingLeft: 0,
                    width: "50%",
                  }}
                >
                  <Label
                    style={{
                      padding: 5,
                      paddingBottom: 5,
                    }}
                  >
                    Gender
                  </Label>
                  <Item picker>
                    <Picker
                      style={{
                        width: "100%",
                        height: 40,
                        marginBottom: -2,
                      }}
                      iosHeader="Gender"
                      Header="Gender"
                      mode="dropdown"
                      textStyle={{ color: "grey" }}
                      placeholder="Select gender"
                      headerBackButtonText="Back"
                      selectedValue={form?.gender}
                      onValueChange={(value) => {
                        setForm({
                          ...form,
                          gender: value,
                        });
                      }}
                    >
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                      <Picker.Item label="LGBTQIA+" value="LGBTQIA+" />
                    </Picker>
                  </Item>
                </View>
              </View>

              {/* Email */}
              <View style={{ width: "100%", marginTop: 5 }}>
                <Label style={{ padding: 5, paddingBottom: 10 }}>
                  Password
                </Label>

                <Item regular>
                  <Input
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      setForm({
                        ...form,
                        password: text,
                      });
                    }}
                    value={form?.password}
                  />
                </Item>
              </View>
              <View
                style={{
                  padding: 15,
                }}
              >
                <Text variant="caption" style={{ color: colors.brand.grey }}>
                  Minimum of 8 characters composed of numbers and letters.
                </Text>
              </View>
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
            <ButtonTypes.PrimaryButton
              style={{
                width: "100%",
              }}
              onPress={() => {
                onSubmit(form);
              }}
            >
              <ButtonTypes.PrimaryButtonText>
                Register
              </ButtonTypes.PrimaryButtonText>
            </ButtonTypes.PrimaryButton>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeArea>
  );
};

const mapDispatchToProps = (dispatch) => ({
  register: (data, cb) => dispatch(registerStart(data, cb)),
});

export default connect(null, mapDispatchToProps)(RegistrationScreen);
