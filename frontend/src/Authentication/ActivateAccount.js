import React, { useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom';
    
export default function ActivateAccount()
{
    
    const {uid,token} = useParams();

    const ActivateRequest = async() => 
    {
        const payload = {
            uid : uid,
            token : token
        }

        const req = await fetch("/auth/users/activation/",{
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
        .then((resp) => console.log("Respo : ", resp))
    }


    useEffect(() => {
    ActivateRequest();
        console.log("YESSS");
    }, [])


    return <>

    <h1>Account Activated!</h1>
    <h1>Account Activated!</h1>
    <h1>Account Activated!</h1>
    <h1>Account Activated!</h1>
    <h1>Account Activated!</h1>
    <h1>Account Activated!</h1>
    <h1>Account Activated!</h1>
    </>
}