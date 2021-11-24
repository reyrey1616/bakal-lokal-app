import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import {
  loginSuccess,
  loginFail,
  registerSuccess,
  registerFail,
  getUserSuccess,
  getUserFail,
  updateCartSuccess,
  updateCartFail,
  addOrderSuccess,
  addOrderFail,
  updateCustomerInfoSuccess,
  updateCustomerInfoFail,
  getAllOrderFail,
  getAllOrderSuccess,
} from "./auth.actions";
import { Alert } from "react-native";
import AuthActionTypes from "./auth.types";
import updateCartItem from "../../utils/updateCartItems";
import { asyncStoreRemove, asyncStoreSave } from "../utils";
import { verificationEmail } from "../../utils/sendMail";

function* signInAsync({ payload, callback }) {
  try {
    let loginRequest;
    let loginResponse;
    const loginCredentials = {
      email: payload?.email,
      password: payload?.password,
    };

    const url = `/auth/customer-login`;
    loginRequest = yield axios.post(url, loginCredentials);

    loginResponse = yield loginRequest.data;

    if (!loginRequest.token && loginResponse.error) {
      if (loginResponse.error === "Email not found") {
        Alert.alert("Email does not exists!");
      } else if (loginResponse.error === "Password not match") {
        Alert.alert("Password incorrect");
      }

      return;
    } else if (loginResponse.token) {
      yield put(
        loginSuccess({
          token: loginResponse?.token,
          user: loginResponse?.data,
        })
      );
      yield asyncStoreSave("token", loginResponse.token);
      yield callback(loginResponse.token);
    }
  } catch (error) {
    const errorResponse = error?.response?.data?.error;
    if (errorResponse) {
      yield put(loginFail(errorResponse));

      Alert.alert("Bakal Lokal", errorResponse);
    }
  }
}

function* signUpAsync({ payload, callback }) {
  try {
    const request = yield axios.post("/customers", payload);
    const response = yield request;

    if (response?.data?.success === true) {
      yield put(registerSuccess(response.data));

      const id = response?.data?.otherResp[0];
      const emailData = {
        service_id: "service_i2md4po",
        template_id: "template_bhh55j8",
        user_id: "user_BgbYodHJVW1sBGMlZrluD",
        template_params: {
          to_name: `${payload?.fname} ${payload?.lname}`,
          from_name: "Bakal Lokal",
          email: payload?.email,
          verification_link: `<a href = "https:/	/bakal-lokal.com/customer-verification/${id}">Confirm Your Email</a>`,
        },
      };

      console.log(emailData);

      // yield fetch(
      // 	"https://api.emailjs.com/api/v1.0/email/send",
      // 	emailData
      // )
      // 	.then((response) => {
      // 		console.log(response);
      // 		callback(response.data);
      // 	})
      // 	.catch((error) => {
      // 		console.log(error);
      // 		Alert.alert(
      // 			"Bakal Lokal",
      // 			"Verification email have failed to send. Please contact customer support of Bakal Lokal!"
      // 		);
      // 	});
    } else {
      throw Error;
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      const errorResponse = error.response.data.error;
      yield put(registerFail(errorResponse));
      // fireAlert(errorResponse, "error");
      if (errorResponse === "Duplicate value entered") {
        Alert.alert(
          "Bakal Lokal",
          "Email already exists, Please try another email."
        );
      } else {
        Alert.alert(
          "Bakal Lokal",

          "Error on signing up. Please try again later!"
        );
      }
    } else {
      yield put(registerFail(error.message));
      Alert.alert(
        "Bakal Lokal",
        "Error on signing up. Please try again later!"
      );
    }
  }
}

function* loadUserAsync({ callback }) {
  try {
    let request = yield axios.get(`/auth/get-customer`);
    let response = yield request.data;

    if (response.error && response.success === false) {
      yield asyncStoreRemove("token");
      return;
    } else if (response.success && response.data) {
      response.data.cartItems = updateCartItem(response.data);
      yield put(getUserSuccess(response?.data));
      yield callback(response?.data);
    }
  } catch (error) {
    const errorResponse = error?.response?.data?.error;
    if (errorResponse) {
      yield put(getUserFail(errorResponse));

      Alert.alert("Something went wrong! Please login your account again.");
    }
  }
}

function* updateCartAsync({ payload, callback }) {
  try {
    const resp = yield axios.post(`/customers/cart`, {
      actionType: payload?.actionType,
      product: payload?.product,
      variant: payload?.variant,
      quantity: payload?.quantity,
      variant_id: payload?.variant_id,
      variantDetails: payload?.variantDetails,
    });

    const data = yield resp.data.data;

    data.cartItems = updateCartItem(data);

    yield put(updateCartSuccess(data));
    callback();
  } catch (error) {
    if (error.response && error.response.data.error) {
      const errorResponse = error.response.data.error;
      yield put(updateCartFail(errorResponse));
      Alert.alert("Bakal Lokal", errorResponse);
    } else {
      yield put(updateCartFail(error.message));
      Alert.alert(
        "Bakal Lokal",
        "Error executing action. Please try again later!"
      );
    }
  }
}

function* addOrderAsync({ payload, callback }) {
  try {
    const {
      customer,
      cartItems,
      voucher,
      paymentMethod,
      subTotal,
      transactionFee,
      deliveryFee,
      discount,
      grandTotal,
      billing_fullAddress,
      billing_province,
      billing_city,
      billing_postcode,
      billing_destination,
      billing_baranggay,
      lat,
      lng,
      // email,
      // fullName,
      deliveryOption,
      contactNumber,
      // merchants,
      // orderDetailsContent,
      pickupDate,
      pickupTime,
    } = payload;
    const orderReq = yield axios.post(`/orders/${customer}`, {
      pickupDate,
      pickupTime,
      deliveryOption,
      customer,
      cartItems,
      voucher,
      paymentMethod,
      subTotal,
      transactionFee,
      deliveryFee,
      discount,
      grandTotal,
      billing_fullAddress,
      billing_province,
      billing_city,
      billing_postcode,
      billing_destination,
      billing_baranggay,
      lat,
      lng,
      contactNumber,

      // merchants,
      // orderDetailsContent,
      logistic: "Lihog",
      orderDate: new Date(Date.now()),
    });

    const orderRes = yield orderReq.data.data;

    // newOrderEmail({
    // 	to_name: fullName,
    // 	email: `${email}, bakallokal@gmail.com`,
    // 	orderNo: `BL-${orderRes.orderNumber}`,
    // 	amount: grandTotal,
    // 	orderDateTime: Date.now(),
    // 	deliveryOption,
    // 	subTotal,
    // 	discount,
    // 	deliveryFee,
    // 	transactionFee,
    // 	grandTotal,
    // 	contactNumber,
    // 	fullAddress: billing_fullAddress,
    // 	paymentMethod,
    // 	merchants,
    // 	orderDetailsContent,
    // });


    yield put(addOrderSuccess(orderRes));
    callback();
  } catch (error) {
    if (error.response && error.response.data.error) {
      const errorResponse = error.response.data.error;
      yield put(addOrderFail(errorResponse));
      Alert.alert(errorResponse, "error");
    } else {
      yield put(addOrderFail(error.message));
      Alert.alert("Error updated order", "error");
    }
  }
}

function* updateCustomerInfo({ payload, callback }) {
  try {
    let resp;
    if (payload.actionType === "checkout") {
      const {
        fname,
        mname,
        lname,
        contactNumber,
        email,
        billing_baranggay,
        billing_fullAddress,
        billing_city,
        billing_postcode,
        billing_municipality,
        billing_province,
        lat,
        lng,
      } = payload;

      resp = yield axios.put(`/customers`, {
        fname,
        mname,
        lname,
        contactNumber,
        email,
        billing_fullAddress,
        billing_city,
        billing_postcode,
        billing_municipality,
        billing_province,
        billing_baranggay,
        lat,
        lng,
        fullAddress: billing_fullAddress,
        baranggay: billing_baranggay,
        postcode: billing_postcode,
        city: billing_city,
        municipality: billing_municipality,
        province: billing_province,

        cartItems: [],
      });
    } else if (payload.actionType === "profile") {
      // const formData = new FormData();
      // // formData.append("image", payload?.image);
      // formData.append("fname", payload.fname);
      // formData.append("mname", payload.mname);
      // formData.append("contactNumber", payload.contactNumber);
      // formData.append("gender", payload.gender);
      // formData.append("bdate", payload.bdate);
      const data = {
        fname: payload?.fname,
        mname: payload?.mname,
        contactNumber: payload?.contactNumber,
        gender: payload?.gender,
        bdate: payload?.bdate,
      };
      resp = yield axios.put(`/customers/`, data);
    } else if (payload?.actionType === "billing_address") {
      resp = yield axios.put(`/customers`, {
        billing_fullAddress: payload?.fullAddress,
        billing_baranggay: payload?.baranggay,
        billing_postcode: payload?.postcode,
        billing_city: payload?.city,
        billing_province: payload?.province,
        fullAddress: payload?.fullAddress,
        baranggay: payload?.baranggay,
        city: payload?.city,
        province: payload?.province,
        postcode: payload?.postcode,
      });
    }
    const data = yield resp?.data?.data;

    yield put(updateCustomerInfoSuccess(data));
    callback();
  } catch (error) {
    // const errorResponse = error.response.data.error;
    // console.log(errorResponse);
    if (error.response && error.response.data.error) {
      const errorResponse = error.response.data.error;
      yield put(updateCustomerInfoFail(errorResponse));
      Alert.alert("Bakal Lokal", errorResponse);
    } else {
      yield put(updateCustomerInfoFail(error.message));
      Alert.alert(
        "Bakal Lokal",
        "Error executing action. Please try again later!"
      );
    }
  }
}

function* getAllOrdersAsync({ customer }) {
  try {
    let orderReq;
    orderReq = yield axios.get(`/orders/${customer}/all-orders`);
    const orderRes = yield orderReq.data.data;

    yield put(getAllOrderSuccess(orderRes));
  } catch (error) {
    if (error.response && error.response.data.error) {
      const errorResponse = error.response.data.error;
      yield put(getAllOrderFail(errorResponse));
      Alert.alert("Bakal Lokal", errorResponse);
    } else {
      yield put(getAllOrderFail(error.message));
      Alert.alert(
        "Bakal Lokal",
        "Error executing action. Please try again later!"
      );
    }
  }
}

function* addOrderStart() {
  yield takeLatest(AuthActionTypes.ADD_ORDER_START, addOrderAsync);
}

function* updateCartStart() {
  yield takeLatest(AuthActionTypes.UPDATE_CART_START, updateCartAsync);
}

function* loginStart() {
  yield takeLatest(AuthActionTypes.LOGIN_START, signInAsync);
}

function* registerStart() {
  yield takeLatest(AuthActionTypes.REGISTER_START, signUpAsync);
}

function* loadUserStart() {
  yield takeLatest(AuthActionTypes.GET_USER_START, loadUserAsync);
}

function* updateCustomerStart() {
  yield takeLatest(
    AuthActionTypes.UPDATE_CUSTOMER_INFO_START,
    updateCustomerInfo
  );
}
function* getAllOrdersStart() {
  yield takeLatest(AuthActionTypes.GET_ORDER_START, getAllOrdersAsync);
}

export default function* AuthSagas() {
  yield all([
    call(loginStart),
    call(loadUserStart),
    call(registerStart),
    call(updateCartStart),
    call(addOrderStart),
    call(updateCustomerStart),
    call(getAllOrdersStart),
  ]);
}
