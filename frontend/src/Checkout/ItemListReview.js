import React,{useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {OrderDetailsContext} from '../Context/OrderDetailsContext';
import {CartContext} from '../Context/CartContext';
import Image from 'material-ui-image';

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

export const ItemListReview = ({subtotal , shipping, total,quantity}) =>{
    const { cart } = useContext(CartContext);
    const {orderDetailsState,setOrderDetailsState} = useContext(OrderDetailsContext);
    
    console.log(cart)
    const classes = useStyles();
    console.log(orderDetailsState)

    const payments = [
      { name: 'Card type', detail: 'Visa' },
      { name: 'Card holder', detail: orderDetailsState.nameofcard },
      { name: 'Card number', detail: orderDetailsState.cardnumber },
    ];


    const orderPrices = [
        {title : "SubTotal" , price : subtotal + " $"},
        {title : "Shipping Price" , price : shipping + " $"},
        {title : "Total" , price : total + " $"},
        {title : "quantity" , price : quantity}
    ]

    const AllPrices = () => 
      {
        return orderPrices.map((eachCalcPrice) => {
            return <ListItem className={classes.listItem}>
                        <ListItemText primary={eachCalcPrice.title} />
                        <Typography variant="subtitle1" className={classes.total}>
                            {eachCalcPrice.price}
                        </Typography>
                    </ListItem>
        })

      }


  return (
        <>
        <Typography variant="h6" gutterBottom>
            Order summary
        </Typography>
        <List disablePadding>
            {cart.map((item,index) => (
            <ListItem key={index} className={classes.listItem}>
                <div style={{width : "100px" , height : "100px"}}><Image imageStyle={{width : "100%" , height : "100%"}} src={item.images[0]}/></div>
                <ListItemText primary={item.name} secondary={item.category} />
                <Typography variant="body2">${item.price}</Typography>
            </ListItem>
            ))}
            <AllPrices/>
            
        </List>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                  Shipping
              </Typography>
              <Typography gutterBottom>{`${orderDetailsState.firstName} ${orderDetailsState.lastName}`}</Typography>
              <Typography gutterBottom>{`${orderDetailsState.address} ${orderDetailsState.city}`}</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                  Payment details
              </Typography>
              <Grid container>
                  {payments.map((payment,index) => (
                  <React.Fragment key={index}>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.detail}</Typography>
                      </Grid>
                  </React.Fragment>
                  ))}
              </Grid>
            </Grid>
        </Grid>
        </>
  );
}