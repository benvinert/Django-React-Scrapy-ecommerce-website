import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "../Context/UserContext";
import { OrdersTable } from "./OrdersTable";
import { ACCESS_JWT_TOKEN } from "../Definitions/Keys";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { User } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    let token = localStorage.getItem(ACCESS_JWT_TOKEN);
    await fetch(`api/All/getOrdersByEmail/email=${User.email}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: JWT_PREFIX_TOKEN + token,
      },
    })
      .then((resp) => resp.json())
      .then((resp_json) => {
        setOrders(resp_json.products);
        console.log("yey");
        console.log(resp_json);
      });
    setLoading(false);
    console.log("blat");
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
