import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { OrderDetailsContext } from "../Context/OrderDetailsContext";
import { CartContext } from "../Context/CartContext";
import Image from "material-ui-image";
import Container from "@material-ui/core/Container";
import { useHistory, useParams } from "react-router-dom";
import { ACCESS_JWT_TOKEN } from "../Definitions/Keys";
import {
  AUTHORIZATION,
  ORDERS_URLS,
  SERVER_PATH,
} from "../Definitions/EndPoints";
import { DefineRequest } from "../Definitions/DefineRequest";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export const SeeOrder = () => {
  var products = [
    { images: ["Null"], name: "null", category: "null", price: 0 },
  ];
  const { orderid } = useParams();
  const [order, setOrder] = useState({
    orderDetails: { subtotal: 0, shipping: 0, total: 0 },
    products: products,
  });
  const getOrderById = async () => {
    let token = localStorage.getItem(ACCESS_JWT_TOKEN);
    const headers = {
      "Content-Type": "application/json",
      Authorization: AUTHORIZATION.JWT_PREFIX_TOKEN + token,
    };
    await fetch(
      `${SERVER_PATH}${ORDERS_URLS.GET_ONE_ORDER_BY_ORDER_NUMBER}${orderid}`,
      DefineRequest("GET", headers)
    )
      .then((resp) => resp.json())
      .then((resp_json) => setOrder(resp_json));
  };
  useEffect(() => {
    getOrderById();
  }, []);

  const orderPrices = [
    { title: "SubTotal", price: order.orderDetails.subtotal },
    { title: "Shipping Price", price: order.orderDetails.shipping },
    { title: "Total", price: order.orderDetails.total },
    { title: "Quantity", price: order.orderDetails.quantity },
  ];
  const classes = useStyles();

  const AllPrices = () => {
    return orderPrices.map((eachCalcPrice) => {
      return (
        <ListItem className={classes.listItem}>
          <ListItemText primary={eachCalcPrice.title} />
          <Typography variant="subtitle1" className={classes.total}>
            {eachCalcPrice.price}
          </Typography>
        </ListItem>
      );
    });
  };
  return (
    <>
      <Container
        component="main"
        maxWidth="md"
        style={{ backgroundColor: "lightgray", borderRadius: 5 }}
      >
        <Typography variant="h6" gutterBottom>
          Order Details of {order.orderDetails.orderNumber}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Shipping
            </Typography>
            <Typography gutterBottom>{`${order.orderDetails.name}`}</Typography>
            <Typography
              gutterBottom
            >{`${order.orderDetails.address} ${order.orderDetails.city}`}</Typography>
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom className={classes.title}>
          Costs
        </Typography>
        <AllPrices />
        <List disablePadding>
          {order.products.map((item, index) => (
            <ListItem key={index} className={classes.listItem}>
              <div style={{ width: "100px", height: "100px" }}>
                <Image
                  imageStyle={{ width: "100%", height: "100%" }}
                  src={item.image}
                />
              </div>
              <ListItemText
                primary={item.name}
                secondary={"CODE: " + item.product_code}
              />

              <Typography variant="body2">${item.price}</Typography>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};
