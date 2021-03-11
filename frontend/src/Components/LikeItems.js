import React, { useState,useContext,useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { LikeItemsContext } from '../Context/LikeItemsContext';
import Item from '../Items/Item';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AlertMessage from './AlertMessage';


const LikeItems = () => 
{
    const {likeItems , setLikeItems} = useContext(LikeItemsContext);
    const [Loading,setLoading] = useState(true);
    const [showAlert,setShowAlert] = useState({flag : false , message : ""});


    
    const [state, setState] = React.useState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
      });
    
    const { vertical, horizontal, open } = state;


    useEffect(() => {
        setLoading(false);
    }, [Loading])


    const clearLikeItems = () => 
    {
        setLikeItems([])
        setShowAlert({flag : true , message : "All Items Cleared"})
        setTimeout(() => setShowAlert({flag : false , message : ""}),3000)
    }
    
    return <>
    <Grid container>
        <Grid item xl={2} md={2} sm={2} xs={2}>
            <Button variant='outlined' color='primary' onClick={clearLikeItems}>Clear All</Button>
        </Grid>

        <Grid container item xl={8} md={8} sm={8} xs={8} spacing={2}>
            <Grid container>
                <h1>Your Like List({likeItems.length})</h1>
            </Grid>
            <AlertMessage showAlert={showAlert}/>
            {likeItems.length == 0 ? <h1>You'r LikeList is Empty</h1> : null}
            {Loading ? <h1>Loading....</h1> : <Item fromWhere={"likelist"} items={likeItems} loading={Loading} setshowalert={setShowAlert} />}
        </Grid>
        
        <Grid item xl={2} md={2} sm={2} xs={2}>

        </Grid>


    </Grid>



    </>
}



export default LikeItems;