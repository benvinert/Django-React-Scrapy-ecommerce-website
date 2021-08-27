import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "../Context/UserContext";
import { OrdersTable } from "./OrdersTable";
import { ACCESS_JWT_TOKEN } from "../Definitions/Keys";
import {
  AUTHORIZATION,
  ORDERS_URLS,
  SERVER_PATH,
} from "../Definitions/EndPoints";
import { DefineRequest } from "../Definitions/DefineRequest";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { User } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    let token = localStorage.getItem(ACCESS_JWT_TOKEN);
    const headers = {
      "Content-Type": "application/json",
      Authorization: AUTHORIZATION.JWT_PREFIX_TOKEN + token,
    };
    await fetch(
      `${SERVER_PATH}${ORDERS_URLS.GET_ORDERS_BY_EMAIL}${User.email}`,
      DefineRequest("GET", headers)
    )
      .then((resp) => resp.json())
      .then((resp_json) => {
        setOrders(resp_json.products);
        console.log(resp_json);
      });
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={2} md={2}></Grid>
        <Grid item xs={8} md={8}>
          <h1>Orders page ({orders.length})</h1>
          {loading ? <h1>Loadinggg....</h1> : <OrdersTable orders={orders} />}
        </Grid>
      </Grid>
    </>
  );
};
