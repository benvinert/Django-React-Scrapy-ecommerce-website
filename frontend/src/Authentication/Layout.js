import React, { useState,useContext, useEffect } from 'react'
import {UserContext} from '../Context/UserContext';


export default function Layout()
{
    const {User , setUser } = useContext(UserContext);


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
        .then((resp_json) => setUser((prevState) => {return {...prevState,name : resp_json.name,isAuthenticated : true,email : resp_json.email,is_staff : resp_json.is_staff}}))
        
    }


    useEffect(async() => {
        let token = localStorage.getItem("access")
        if(token){
        const req = await fetch("/auth/jwt/verify/",
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
          body: JSON.stringify({"token" : token}) }) // body data type must match "Content-Type" header
          .then(resp => resp.status == 200 ? loadUser(token) : console.log("Verify JWT not works FINE :)))))))"))
        }else{
            console.log("You Dont have User")
        }
    }, [])


    return <>

    
    </>
}