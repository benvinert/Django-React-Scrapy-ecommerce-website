import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DefineRequest } from "../Definitions/DefineRequest";
import { SERVER_PATH, AUTHORIZATION } from "../Definitions/EndPoints";

export default function ActivateAccount() {
  const { uid, token } = useParams();

  const ActivateRequest = async () => {
    const payload = {
      uid: uid,
      token: token,
    };

    await fetch(
      `${SERVER_PATH}${AUTHORIZATION.ACTIVATE_JWT_TOKEN}`,

      DefineRequest("POST", { "Content-Type": "application/json" }, payload)
    ) // body data type must match "Content-Type" header
      .then((resp) => console.log("Respo : ", resp));
  };

  useEffect(() => {
    ActivateRequest();
  }, []);

  return (
    <>
      <div align="center">
        <h1>
          You're Account is Activated! you can go now to login and buy our
          products
        </h1>
        <h2>Have fun!</h2>
      </div>
    </>
  );
}
