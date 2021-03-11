import React, { useEffect } from 'react'


const PlaceOrder = (props) =>
{
    const Message = () => 
    {
    // Sended the request to add this order to history orders
    console.log("from Place Order",props.purchaseStatus)
    return <div><h1>Thank you for your Purchase ,You will recive on your email All order Details</h1></div>
    

}

    return <>
        <div aling='center'>
            <Message/>  

        </div>

    </>
    
}

export default PlaceOrder;