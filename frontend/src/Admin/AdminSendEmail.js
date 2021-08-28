import React, { useState, useRef, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { UserContext } from "../Context/UserContext";
import TableUsers from "./TableUsers";
import CircularProgress from "@material-ui/core/CircularProgress";
import AlertMessage from "../Components/AlertMessage";
import {
  SERVER_PATH,
  AUTHORIZATION,
  ADMIN_URLS,
} from "../Definitions/EndPoints";
import { ACCESS_JWT_TOKEN } from "../Definitions/Keys";
import { DefineRequest } from "../Definitions/DefineRequest";

export const AdminSendEmail = () => {
  const message = useRef();
  const { User, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [users, setUsers] = useState({});
  const [selectionModel, setSelectionModel] = useState([]);
  const [showAlert, setShowAlert] = useState({
    flag: false,
    message: "Message sends to all marked customers",
  });
  let token = localStorage.getItem(ACCESS_JWT_TOKEN);

  const sendMessage = async () => {
    setButtonLoading(true);

    var payload = {
      from: User.name,
      message: message.current["Message"].value,
      to: selectionModel,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: AUTHORIZATION.JWT_PREFIX_TOKEN + token,
    };
    try {
      await fetch(
        `${SERVER_PATH}${ADMIN_URLS.SEND_EMAIL}`,
        DefineRequest("POST", headers, payload)
      )
        .then((resp) => resp.json())
        .then((resp_json) =>
          resp_json.status == "success" ? setButtonLoading(false) : null
        );
      setShowAlert({
        flag: true,
        message: "Message sends to all marked customers",
      });
      setTimeout(() => {
        setShowAlert({
          flag: false,
          message: "Message sends to all marked customers",
        });
      }, 3000);
    } catch {
      setButtonLoading({ error: "error" });
    }
  };

  const getUsers = async () => {
    await fetch(`${SERVER_PATH}${ADMIN_URLS.GET_ALL_USERS}`, {
      headers: {
        Authorization: AUTHORIZATION.JWT_PREFIX_TOKEN + token,
      },
    })
      .then((resp) => resp.json())
      .then((resp_json) => {
        console.log(resp_json);
        //Because DataGrid give me only id on selection, so i want select emails,so
        //i swap between id and email
        let usersIdIsEmail = resp_json.Users.map((eachUser) => {
          let temp = eachUser.id;
          eachUser.id = eachUser.email;
          eachUser.email = temp;
          return eachUser;
        });
        setUsers(usersIdIsEmail);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {loading ? (
        <div align="center">
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xl={2} md={2} sm={2} xs={2}>
            <div style={{ fontSize: "1.6rem", marginLeft: 15 }}>
              Hey dear {User.name} ,
              <br /> here you can write your message to all Users
            </div>
          </Grid>
          <Grid item xl={8} md={8} sm={8} xs={8}>
            <form style={{ marginTop: "2.0rem" }} ref={message}>
              <TextField
                ref={message}
                label="Write the Email message"
                name="Message"
                multiline
                rows={3}
                fullWidth={true}
                defaultValue={"write your message here"}
                variant="outlined"
              />
              <AlertMessage showAlert={showAlert} />
              {buttonLoading.error && (
                <h3>Sorry have internal server problem</h3>
              )}
              {selectionModel.length > 0 ? (
                buttonLoading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={sendMessage}
                  >
                    Send
                  </Button>
                )
              ) : null}
            </form>
            <TableUsers
              users={users}
              selectiselectionModel={selectionModel}
              setSelectionModel={setSelectionModel}
            />
          </Grid>
          <Grid item xl={2} md={2} sm={2} xs={2}></Grid>
        </Grid>
      )}
    </>
  );
};
