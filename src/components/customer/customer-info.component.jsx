import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { colors } from "../../infra/theme/colors";
import { Form, Picker, Label, Item, Input, Button, Spinner } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import CustomDatePicker from "../utils/date-picker.component";
import moment from "moment";
import ButtonTypes from "../utils/buttons.component";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerInfoStart } from "../../services/auth/auth.actions";
import { selectAuthLoading } from "../../services/auth/auth.selectors";
import { useNavigation } from "@react-navigation/core";
const ScrollViewContainer = styled(ScrollView)`
  background-color: #fff;
  height: auto;
`;

export const CustomerInfo = ({ currentUser }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const navigation = useNavigation();

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    contactNumber: "",
    email: "",
    // password: "Nice123",
    gender: "",
    bdate: "",
    actionType: "",
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (currentUser) {
        setForm({
          fname: currentUser?.fname,
          lname: currentUser?.lname,
          email: currentUser?.email,
          // password: currentUser?.password,
          contactNumber: currentUser?.contactNumber,
          gender: currentUser?.gender,
          bdate: moment(currentUser?.bdate).format("YYYY-MM-DD"),
          actionType: "profile",
        });
      }
    });

    return unsubscribe;
  }, [loading, currentUser]);

  const handleSaveInfo = () => {
    const {
      fname,
      lname,
      contactNumber,
      email,
      // password,
      gender,
      bdate,
    } = form;
    if (!fname) {
      Alert.alert("Bakal Lokal", "Please input Firstname!");
    } else if (!lname) {
      Alert.alert("Bakal Lokal", "Please input Lastname!");
    } else if (!contactNumber) {
      Alert.alert("Bakal Lokal", "Please input Lastname!");
    } else if (!email) {
      Alert.alert("Bakal Lokal", "Please input email!");
    } else if (!gender) {
      Alert.alert("Bakal Lokal", "Please select gender!");
    } else if (!bdate) {
      Alert.alert("Bakal Lokal", "Please select birthday!");
    }

    console.log(form);
    dispatch(
      updateCustomerInfoStart({
        payload: form,
        callback: () => {
          Alert.alert("Bakal Lokal", "Successfully Saved!");
        },
      })
    );
  };

  return (
    <>
      <ScrollViewContainer
        contentContainerStyle={{
          flex: 1,
          backgroundColor: colors.brand.dirtywhite,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {loading ? (
          <Spinner color="orange" />
        ) : (
          <View
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "white",
            }}
          >
            <Form
              style={{
                backgroundColor: "white",
                padding: 5,
                marginTop: 5,
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View style={{ padding: 5, width: "50%" }}>
                  <Label
                    style={{
                      paddingBottom: 10,
                    }}
                  >
                    First name
                  </Label>
                  <Item regular regular style={{ borderRadius: 7 }}>
                    <Input
                      onChangeText={(value) => {
                        setForm({
                          ...form,
                          fname: value,
                        });
                      }}
                      value={form?.fname}
                    />
                  </Item>
                </View>

                <View style={{ padding: 5, width: "50%" }}>
                  <Label
                    style={{
                      paddingBottom: 10,
                    }}
                  >
                    Lastname
                  </Label>

                  <Item regular regular style={{ borderRadius: 7 }}>
                    <Input
                      onChangeText={(value) => {
                        setForm({
                          ...form,
                          lname: value,
                        });
                      }}
                      value={form?.lname}
                    />
                  </Item>
                </View>
              </View>

              <View style={{ padding: 5, width: "100%" }}>
                <Label
                  style={{
                    paddingBottom: 10,
                  }}
                >
                  Phone
                </Label>
                <Item regular regular style={{ borderRadius: 7 }}>
                  <Input
                    onChangeText={(value) => {
                      setForm({
                        ...form,
                        contactNumber: value,
                      });
                    }}
                    value={form?.contactNumber}
                  />
                </Item>
              </View>

              <View style={{ padding: 5, width: "100%" }}>
                <Label
                  style={{
                    paddingBottom: 10,
                  }}
                >
                  Email
                </Label>
                <Item regular regular style={{ borderRadius: 7 }}>
                  <Input
                    onChangeText={(value) => {
                      setForm({
                        ...form,
                        email: value,
                      });
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
                <View style={{ padding: 10, width: "50%" }}>
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
                <View style={{ padding: 10, width: "50%" }}>
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

              {/* <View style={{ padding: 5, width: "100%" }}>
								<Label
									style={{
										paddingBottom: 10,
									}}
								>
									Password
								</Label>
								<Item regular style={{ borderRadius: 7 }}>
									<Input
										placeholder="********"
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
							</View> */}

              {/* <View
								style={{
									padding: 15,
								}}
							>
								<Text
									variant="caption"
									style={{ color: colors.brand.grey }}
								>
									Minimum of 8 characters composed of numbers
									and letters
								</Text>
							</View> */}
            </Form>
          </View>
        )}
      </ScrollViewContainer>

      <View
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "white",
        }}
      >
        <Button
          block
          warning
          onPress={() => {
            handleSaveInfo();
          }}
        >
          <ButtonTypes.PrimaryButtonText>Save</ButtonTypes.PrimaryButtonText>
        </Button>
      </View>
    </>
  );
};
