import React, { useState,useContext } from 'react'
import CheckOutForm from './CheckOutForm';
import { ItemListReview } from './ItemListReview';
import PlaceOrder from './PlaceOrder';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { OrderDetailsContext }  from '../Context/OrderDetailsContext';
import {CartContext} from '../Context/CartContext';
import { UserContext } from '../Context/UserContext';
import { useHistory } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';

const CheckOut = () =>
{
    const { push } = useHistory();
    const [stepOfCheckOut,setStepOfCheckOut] = useState(1);
    const [orderDetailsState,setOrderDetailsState] = useState({})// All details of where to shipping the order
    const { User } = useContext(UserContext);
    const { cart,setCart } = useContext(CartContext);   
    let subtotal = 0;
    cart.map((eachItem) => subtotal += parseFloat(eachItem.price))
    subtotal = subtotal.toFixed(2)
    let shipping = subtotal > 500 ? 0 : 2
    let total = parseFloat(subtotal)  + parseFloat(shipping)
    


    const addOrder = async() =>
    {
        
        const payload = {email : User.email,...orderDetailsState,name : orderDetailsState.firstName}
        console.log(User)
        console.log(payload)
        try
        {       
            let token = localStorage.getItem("access")
            await fetch("/api/All/addtohistoryorders", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json',
            'Authorization' : "JWT " + token
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(payload)})
            .then((resp) => {
                if(resp.status == 200)
                {
                    setStepOfCheckOut((prev) => prev+=1);
                    setCart([])
                }
                console.log(resp)
            }) // body data type must match "Content-Type" header
            
        }catch
        {
            console.log("Purchase Failed!!!")
        }
        console.log("USER::::" , User)
    }

    const acceptPurchase = () => 
    {
        setStepOfCheckOut((prev) => prev+=1);
        var productsPayload = []
        cart.map((eachProduct) => 
        {
            eachProduct.price = parseFloat(eachProduct.price)
            eachProduct.size = eachProduct.selectedSize[0]
            eachProduct.image = eachProduct.images[0]
            productsPayload.push(eachProduct)
        })

        setOrderDetailsState((prevState) => {return {...prevState,products : productsPayload,
            subtotal : subtotal , shipping : shipping , total : total,quantity : cart.length}});
        console.log("PayloadProducts :: "  , productsPayload)
    }
    const CheckFormStatus = () =>
    {
        if(stepOfCheckOut == 1)
        {
            return <div><CheckOutForm setStepOfCheckOut={setStepOfCheckOut}/></div>;
        }
        else if(stepOfCheckOut == 2)
        {

            return <div><ItemListReview subtotal={subtotal} shipping={shipping} total={total} quantity={cart.length}/><Button variant='contained' color='primary' onClick={acceptPurchase}>Place Order</Button></div>
        }
        else if(stepOfCheckOut == 3)
        {
            addOrder();
            return <div>
                        <CircularProgress/>
                        <h1>
                            Loading...if it take more than 5 min,<br/> so go try again because Purchase is not succsefull
                        </h1>
                   </div>
        }
        else if(stepOfCheckOut == 4)
        {
            return <div><PlaceOrder orderDetailsState={orderDetailsState} /><Button variant='contained' color='primary' onClick={() => push("/")}>Go to homepage</Button></div>
        }
    }
 

    return  <Container component="main" maxWidth="md">
                <OrderDetailsContext.Provider value={{orderDetailsState,setOrderDetailsState}}>
                    <CheckFormStatus/>
                </OrderDetailsContext.Provider>
            </Container>
}
export default CheckOut;