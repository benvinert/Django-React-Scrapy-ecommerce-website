import React,{ useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useHistory } from 'react-router'
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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {useForm} from 'react-hook-form';


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
    zIndex : -2
  },
  avatar: { 
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color : "black",
    backgroundColor : '#99BFAA',
  },
  form: {
    zIndex : 0,
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const emailpattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function Register() {



  const {push} = useHistory();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const {handleSubmit,register,errors} = useForm({reValidateMode : "onSubmit"});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const classes = useStyles();

  


  const [show,setShow] = useState({txt : "",status : false })

  const Signupsucces = (props) => {
    return <div className={classes.root}>
    <Alert severity={props.alertobj.class}>
      <AlertTitle>You're {props.alertobj.txt} </AlertTitle>
    </Alert>
    </div>
  }

  var User = {}

  async function onSubmit(data)
  {
    if(data.password == data.re_password)
    {
      User = JSON.stringify(data);
      const response = await fetch("auth/users/", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: User }) // body data type must match "Content-Type" header
        .then(response => response.json())
        .then(data => {
          data.email && setShow({txt : "Email is Already Exists",status : true,class: "error",})
          data.password && setShow({txt : "Password to short It must contain at least 8 characters (letters and numbers)",status : true,class: "error",})
          data.id && setShow({txt : "Registered Succsesfully. Go to your Email to Activation Account",status : true,class: "success",})
        }
        )
      push("/Register");
    }
    else
    {
      console.log(data)
      setShow({txt : "Passwords are not the same",status : true,class: "error",})
    }
  }





  return (
    <Container  className="ContainerClass"component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
            {show.status ? <Signupsucces alertobj={show}/> : null}
            <br></br>
            {errors.name && <div className="required">field required</div>}
              <TextField
                inputRef={register({required:true,minLength:4})}
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
            {errors.email && <div className="required">field required</div>}
              <TextField
                inputRef={register({required:true,minLength:3,pattern:emailpattern})}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <br></br>
            <Grid>
            {errors.birthday && <div className="required">field required</div>}
            <TextField
              style={{marginLeft : '1.1rem'}}
              id="date"
              label="Birthday"
              type="date"
              defaultValue="none"
              name="birthday"
              InputProps={{ inputProps: { max: "2012-01-01" } }}
              className={classes.textField}
              inputRef={register({required:true})}
              InputLabelProps={{
                shrink: true,
              }}
              />
            </Grid>
            <Grid item xs={12}>
            {errors.password && <div className="required">field required</div>}
              <TextField
                inputRef={register({required:true,minLength:7})}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
            {errors.re_password && <div className="required">field required</div>}
              <TextField
                inputRef={register({required:true,minLength:7})}
                variant="outlined"
                required
                fullWidth
                name="re_password"
                label="ConfirmPassword"
                type="password"
                id="re_password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{backgroundColor : '#5C3D46'}}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

