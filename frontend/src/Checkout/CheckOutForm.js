import React,{useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {OrderDetailsContext} from '../Context/OrderDetailsContext';
import { useForm } from 'react-hook-form';
import { AiOutlineDeliveredProcedure } from 'react-icons/ai';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CheckOut(props) {
  const classes = useStyles();
  const {handleSubmit,register,errors} = useForm({reValidateMode : "onSubmit"});
  const {orderDetailsState,setOrderDetailsState} = useContext(OrderDetailsContext);

  const onSubmit = (data) =>
  {
    setOrderDetailsState(data);
    props.setStepOfCheckOut((prev) => prev += 1);
  }
  return (
    <>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AiOutlineDeliveredProcedure/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Please fill Order Details
        </Typography>
        <Container component="main" maxWidth="sm">
          <form className={classes.form} noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  inputRef={register({required:true,minLength:3})}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputRef={register({required:true,minLength:3})}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={register({required:true,minLength:3})}
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="address"
                  name="address"
                  autoComplete="address-line"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={register({required:true,minLength:3})}
                  variant="outlined"
                  required
                  fullWidth
                  name="city"
                  label="City"
                  type="city"
                  id="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid container justify='center' item xs={12} md={12}>
                  <b>Payment</b>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={register({required:true,minLength:3})}
                  variant="outlined"
                  required
                  fullWidth
                  name="nameofcard"
                  label="Name of Card"
                  type="nameofcard"
                  id="nameofcard"
                  autoComplete="nameofcard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={register({required:true,minLength:3})}
                  variant="outlined"
                  required
                  fullWidth
                  name="cardnumber"
                  label="Card Number"
                  type="cardnumber"
                  id="cardnumber"
                  autoComplete="cardnumber"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              >
              Next
            </Button>
          </form>
        </Container>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </>
  );
}