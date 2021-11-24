import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeArea } from "../components/utils/safe-area.component";
import { ScrollView, View, Alert } from "react-native";
import { Spinner } from "native-base";
import BLHeader from "../components/header/header.component";
import styled from "styled-components";
import { colors } from "../infra/theme/colors";
import {
  selectCurrentUser,
  selectOrdersLoading,
  selectOrders,
} from "../services/auth/auth.selectors";
import OrdersTable from "../components/orders/orders-table.component";
import { OrderSearch } from "../components/orders/order-search.component";
import { getAllOrderStart } from "../services/auth/auth.actions";
import { useNavigation } from "@react-navigation/core";
const ScrollViewContainer = styled(ScrollView)`
  background-color: #fff;
  height: auto;
`;

const CustomerOrdersScreen = ({ route }) => {
  // const { previousScreen } = route?.params;
  // const page = useRoute();
  // const navigation = useNavigation();

  const currentUser = useSelector(selectCurrentUser);
  const [selectedSortField, setSelectedSortField] = useState("");
  const [searchText, setSearchText] = useState("");
  const loading = useSelector(selectOrdersLoading);
  const orders = useSelector(selectOrders);
  const [ordersState, setOrderState] = useState([]);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  console.log(loading);

  function compare(a, b, field) {
    if (a[field] < b[field]) {
      return -1;
    }
    if (a[field] > b[field]) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (currentUser) {
        dispatch(getAllOrderStart(currentUser?._id));
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      setOrderState(orders);
    }
  }, [orders]);

  const onSort = (val) => {
    setSelectedSortField(val);

    ordersState?.sort((a, b) =>
      a[val] < b[val] ? 1 : b[val] < a[val] ? -1 : 0
    );
  };

  const onTextSearch = (val) => {
    setSearchText(val);

    if (val === "") {
      setOrderState(orders && orders);
    }

    if (!val) return;

    let filtered = ordersState?.filter((data) => {
      return data?.orderNumber.toString().includes(val?.toLowerCase());
    });
    setOrderState(filtered);
  };

  return (
    <SafeArea>
      <BLHeader title="My orders" previousScreen={"Home"} />

      {loading ? (
        <Spinner color="orange" />
      ) : (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <ScrollViewContainer
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: colors.brand.dirtywhite,
              flexDirection: "column",
              padding: 10,
            }}
          >
            <OrderSearch
              onSort={onSort}
              onTextSearch={onTextSearch}
              selectedSortField={selectedSortField}
              searchText={searchText}
            />

            <OrdersTable data={orders && ordersState} />
          </ScrollViewContainer>
        </View>
      )}
    </SafeArea>
  );
};

export default CustomerOrdersScreen;
