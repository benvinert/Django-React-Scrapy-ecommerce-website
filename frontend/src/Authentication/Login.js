import React , {useState , useContext} from 'react';
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
import {useForm} from 'react-hook-form';
import { Alert, AlertTitle } from '@material-ui/lab';
import {UserContext} from '../Context/UserContext';
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {

  const { User ,setUser } = useContext(UserContext);
  const classes = useStyles();
  const {handleSubmit,register,errors} = useForm({reValidateMode : "onSubmit"});


  // Get User Details from Server
  const loadUser = async(user_access) => {
    localStorage.setItem("access",user_access)
    const req = await fetch("/auth/users/me",{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : "JWT " + user_access
      }
    })
    .then((resp) => resp.json())
    .then((resp_json) => setUser((prevState) => {console.log("USERDE : " , resp_json); return {...prevState,name : resp_json.name,isAuthenticated : true,email : resp_json.email,is_staff : resp_json.is_staff}}))
    setShow({txt : "Login Succsesfully",status : true,class: "success",})

  }

  async function onSubmit(data){
    const payload = {
      email : data.email,
      password : data.password
    }
    // Create JWT token and given it to user on LocalStorage
    const req = await fetch("/auth/jwt/create/",
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(payload) }) // body data type must match "Content-Type" header
      .then(resp => resp.json())
      .then((resp_json) => {
      console.log(resp_json)
      {resp_json.access ? loadUser(resp_json.access) : setShow({txt : resp_json.detail,status : true,class: "error",}) }
        
      })
  }
// Alert Components //
  const [show,setShow] = useState({txt : "",status : false })

  const Signupsucces = (props) => {
    return <div className={classes.root}>
    <Alert severity={props.alertobj.class}>
      <AlertTitle>You're {props.alertobj.txt} </AlertTitle>
    </Alert>
    </div>
  }
/////////////////

  return (
    <Container className="ContainerClass" component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>
        {show.status ? <Signupsucces alertobj={show}/> : null}
          <TextField
            inputRef={register({required:true,minLength:4})}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            inputRef={register({required:true,minLength:6})}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}