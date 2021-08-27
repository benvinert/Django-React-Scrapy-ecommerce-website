import React, { useState, useContext, useEffect } from "react";
import {
  AUTHORIZATION,
  SERVER_PATH,
  USER_DATA,
} from "../Definitions/EndPoints";
import { UserContext } from "../Context/UserContext";
import { ACCESS_JWT_TOKEN } from "../Definitions/Keys";
import { DefineRequest } from "../Definitions/DefineRequest";

export default function Layout() {
  const { User, setUser } = useContext(UserContext);

  const loadUser = async (user_access) => {
    localStorage.setItem(ACCESS_JWT_TOKEN, user_access);
    const headers = {
      "Content-Type": "application/json",
      Authorization: AUTHORIZATION.JWT_PREFIX_TOKEN + user_access,
    };
    await fetch(
      `${SERVER_PATH}${USER_DATA.GET_USER_DATA}`,
      DefineRequest("GET", headers)
    )
      .then((resp) => resp.json())
      .then((resp_json) =>
        setUser((prevState) => {
          return {
            ...prevState,
            name: resp_json.name,
            isAuthenticated: true,
            email: resp_json.email,
            is_staff: resp_json.is_staff,
          };
        })
      );
  };

  useEffect(async () => {
    let token = localStorage.getItem(ACCESS_JWT_TOKEN);
    if (token) {
      await fetch(
        `${SERVER_PATH}${AUTHORIZATION.JWT_VERIFY}`,
        DefineRequest(
          "POST",
          { "Content-Type": "application/json" },
          { token: token }
        )
      ).then((resp) =>
        resp.status == 200
          ? loadUser(token)
          : console.log("Verify JWT not works FINE :)))))))")
      );
    } else {
      console.log("You Dont have User");
    }
  }, []);

  return <></>;
}
