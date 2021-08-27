import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@material-ui/lab";
import { UserContext } from "../Context/UserContext";
import { useHistory } from "react-router";
import EmailIcon from "@material-ui/icons/Email";
import {
  AUTHORIZATION,
  FRONT_END_SERVER_PATH,
  SERVER_PATH,
  USER_DATA,
} from "../Definitions/EndPoints";
import { ACCESS_JWT_TOKEN } from "../Definitions/Keys";
import { DefineRequest } from "../Definitions/DefineRequest";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={`${FRONT_END_SERVER_PATH}`}>
        Vinerfia.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const { User, setUser } = useContext(UserContext);
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm({
    reValidateMode: "onSubmit",
  });
  const { push } = useHistory();

  // Get User Details from Server
  const loadUser = async (user_access) => {
    console.log("U", user_access);
    localStorage.setItem(ACCESS_JWT_TOKEN, user_access);
    await fetch(
      `${SERVER_PATH}${USER_DATA.GET_USER_DATA}`,
      DefineRequest("GET", {
        "Content-Type": "application/json",
        Authorization: AUTHORIZATION.JWT_PREFIX_TOKEN + user_access,
      })
    )
      .then((resp) => resp.json())
      .then((resp_json) =>
        setUser((prevState) => {
          console.log("USERDE : ", resp_json);
          setTimeout(() => push("/"), 2000);
          return {
            ...prevState,
            name: resp_json.name,
            isAuthenticated: true,
            email: resp_json.email,
            is_staff: resp_json.is_staff,
          };
        })
      );
    setShow({ txt: "Login Succsesfully", status: true, class: "success" });
  };

  async function onSubmit(data) {
    const payload = {
      email: data.email,
      password: data.password,
    };
    const headers = { "Content-Type": "application/json" };
    // Create JWT token and put it on user LocalStorage
    await fetch(
      `${SERVER_PATH}${AUTHORIZATION.CREATE_JWT_TOKEN}`,
      DefineRequest("POST", headers, payload)
    ) // body data type must match "Content-Type" header
      .then((resp) => resp.json())
      .then((resp_json) => {
        console.log(resp_json);
        {
          resp_json.access
            ? loadUser(resp_json.access)
            : setShow({ txt: resp_json.detail, status: true, class: "error" });
        }
      });
  }
  // Alert Components //
  const [show, setShow] = useState({ txt: "", status: false });

  const Signupsucces = (props) => {
    return (
      <div className={classes.root}>
        <Alert severity={props.alertobj.class}>
          <AlertTitle>You're {props.alertobj.txt} </AlertTitle>
        </Alert>
      </div>
    );
  };
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
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          {show.status ? <Signupsucces alertobj={show} /> : null}
          <TextField
            inputRef={register({ required: true, minLength: 4 })}
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
            inputRef={register({ required: true, minLength: 6 })}
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
