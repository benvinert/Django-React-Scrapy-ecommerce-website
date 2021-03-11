import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';


const AlertMessage = ({showAlert,payload}) => 
{
    
    const [state, setState] = React.useState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
      });
    
    const { vertical, horizontal, open } = state;

    const AlertShow = () => 
    {
        if(showAlert.flag)
        {
            return <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            message={showAlert.message}
            key={vertical + horizontal}
            />
        }
        return null;
        
    }



    return <AlertShow/>;
}

export default AlertMessage;