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

    const req = await fetch(
      `${SERVER_PATH}${AUTHORIZATION.ACTIVATE_JWT_TOKEN}`,

      DefineRequest("POST", payload, { "Content-Type": "application/json" })
    ) // body data type must match "Content-Type" header
      .then((resp) => console.log("Respo : ", resp));
  };

  useEffect(() => {
    ActivateRequest();
    console.log("YESSS");
  }, []);

  return (
    <>
      <div align="center">
        <h1>Account Activated!</h1>
      </div>
    </>
  );
}
