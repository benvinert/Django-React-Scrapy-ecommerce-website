import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Carusel1 from '../Carusel1.jpg';
import Carusel2 from '../Carusel2.jpg';
import { useHistory,useLocation  } from 'react-router';
import Grid from '@material-ui/core/Grid';

function ItemsCarusel(props)
{
    var items = props.images

    return (
        <Carousel className="carusel">
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    const {push} = useHistory();

    return (
        <Paper>
            <img src={props.item} className="ImageCenter" height="780" alt="photos"/>
        </Paper>
    )
}


export default ItemsCarusel;