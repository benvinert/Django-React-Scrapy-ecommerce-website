import React, { useState,useEffect,useContext } from 'react'
import Grid from '@material-ui/core/Grid';
import Item from '../Items/Item';
import { Alert, AlertTitle } from '@material-ui/lab';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AlertMessage from './AlertMessage';
import { useHistory } from 'react-router';
import {CartContext} from '../Context/CartContext';



export default function Cart()
{
    
    const {cart} = useContext(CartContext)
    const { push } = useHistory();
    const [Loading,setLoading] = useState(true);
    const [cartItems,setCartItems] = useState([])
    const [totalSummary,setTotalSummary] = useState({totalPay : 0 , totalItems : 0,shiping : 2})
    const [showAlert,setShowAlert] = useState({flag : false, message : ""});
    const getCartItems = () => 
    {
        setCartItems(JSON.parse(localStorage.getItem("cart")))
        setLoading(false)
    }

    
    const SummaryAllDetails = () => 
    {
        let totalPay = 0;
        let shipingPrice = 0;
        cartItems.map((each) => {
           totalPay += each.price;
        })
        if(totalPay < 500)
        {
            shipingPrice = 2;
        }

        setTotalSummary((prevState) => {return {...prevState,totalPay : totalPay,shiping : shipingPrice}})
    }

    useEffect(() => {
        getCartItems()
        SummaryAllDetails()
        console.log(cartItems)
    }, [Loading,cartItems.length])

    return <>
        <Grid direction="row" container spacing={1}>
            <Grid   item xl={2} md={2} sm={4} xs={4}>
                <Grid container style={{background : "grey",borderRadius : "5%"}} >  
                    <h2>
                        Order Summary
                    </h2>
                    <Grid className="FiltersGrid" item xl={9} md={9} sm={8} xs={8}>
                        <h3>Subtotal:<br/> <span style={{color : 'white'}}>{totalSummary.totalPay.toFixed(2)} $</span></h3>
                        <h3>Shipping:<br/> <span style={{color : 'white'}}>{totalSummary.shiping} $</span></h3>
                        <h3>Amount:<br/> <span style={{color : 'white'}}>{cartItems.length}</span></h3>
                        <h3>Total Pay :<br/> <span style={{color : 'white'}}>{(totalSummary.totalPay + totalSummary.shiping).toFixed(2)} $</span></h3>
                        {totalSummary.shiping == 0 ?
                        null : 
                        <h5>You need add:<br/> <span style={{color : 'white'}}>{(500 - totalSummary.totalPay).toFixed(2)} $ to Get free Shiping</span></h5>}
                        {cartItems.length <= 0 ? null :  <div align='center'>
                            <Button  variant='contained' color='primary' onClick={() => push("/checkout")}>Checkout</Button>
                         </div>}

                        

                        
                    </Grid>
                </Grid>
            </Grid>
            <Grid style={{padding : "10px 10px 10px 10px"}}container spacing={3} xl={8} md={8} sm={8} xs={8}>
                <Grid container>
                    <AlertMessage showAlert={showAlert} payload={"Changes Saved on your Cart"}/>
                    <h1>Your Cart ({cartItems.length})</h1>
                </Grid>

                {cartItems.length == 0 ? <h1>You'r Cart is Empty</h1> : null}
                {Loading ? <h1>Loading....</h1> : <Item setcartitems={setCartItems} fromWhere={"cart"} items={cartItems} loading={Loading} setshowalert={setShowAlert} />}
            </Grid>
            <Grid item xl={1} md={1} sm={1} xs={1}>

            </Grid>

            




        </Grid>

    </>
}