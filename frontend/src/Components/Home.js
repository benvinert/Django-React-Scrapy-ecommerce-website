import React, { useState } from 'react'
import HomePageCarusel from '../Carusel/HomePageCarusel';
import Grid from '@material-ui/core/Grid';

function Home(){
    


    return <div align='center'>
    <Grid container>
        <Grid item xs={1} lg={1} />
        
        <Grid item xs={10} lg={10}>
            <HomePageCarusel/>
        </Grid>

        <Grid item xs={1} lg={1}/>

        
        
    </Grid>
    
    </div>

}


export default Home;