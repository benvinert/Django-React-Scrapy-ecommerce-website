import React, { Component } from 'react'
import { Link as ReactScroll } from 'react-scroll'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export const WhichButtonToShowUser = ({checkFromWhere,itemDetails,circularShow,SaveChangeOnCart,deleteFromCart,addToCart}) =>
{
    console.log("WhichButtonToShow :::" , itemDetails)
    if(checkFromWhere == "cart"){
        return <Button variant="outlined" onClick={() => deleteFromCart(itemDetails.idex)} color="secondary">
        <b> 
            Remove from cart
        </b>
    </Button> 
    }
    
    else if(checkFromWhere == "changesize") 
    {
        return <Button variant="outlined" onClick={() => SaveChangeOnCart(itemDetails.idex)} color="primary">
        <b> 
            Save
        </b>
    </Button> 
    }      
    else{
    return <>
    <div>
        {circularShow ? <CircularProgress color="secondary"/> : <Button variant="outlined" onClick={() => addToCart()} color="primary">
            <b>
                Add to cart
            </b>
        </Button>}
        <ReactScroll to="UserPost" spy={true} smooth={true}>
            <Button variant="contained" color="secondary">
                Add Post
            </Button>
        </ReactScroll>
    </div>
    </> 

    }
}