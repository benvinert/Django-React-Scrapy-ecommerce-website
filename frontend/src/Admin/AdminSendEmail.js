import React, { useState,useRef,useContext,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {UserContext} from '../Context/UserContext';
import TableUsers from './TableUsers';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertMessage from '../Components/AlertMessage';


export const AdminSendEmail = () =>
{
    const message = useRef();
    const {User , setUser } = useContext(UserContext);
    const [loading,setLoading] = useState(true);
    const [buttonLoading,setButtonLoading] = useState(false)
    const [users,setUsers] = useState({})
    const [selectionModel, setSelectionModel] = useState([]);
    const [showAlert,setShowAlert] = useState({flag : false,message : "Message sends to all marked customers"});
    let token = localStorage.getItem("access")

    const sendMessage = async() => 
    {
        setButtonLoading(true)
        
        var payload = {'from' : User.name , 'message' : message.current['Message'].value,"to" : selectionModel}
        try
        {
            await fetch("api/Admin/sendEmail",{
                method : "POST",
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : "JWT " + token
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(payload) })
                .then((resp) => resp.json())
                .then((resp_json) => resp_json.status == "success" ? setButtonLoading(false) : null)
                setShowAlert({flag : true,message : "Message sends to all marked customers"})
                setTimeout(() => {
                    setShowAlert({flag : false,message : "Message sends to all marked customers"})
                }, 3000);

        }catch
        {
            setButtonLoading({"error" : "error"})
        }

    }

    const getUsers = async() =>
    {
        await fetch("api/Admin/getAllUsers",{
            headers : {
                "Authorization" : "JWT " + token
            }
        })          
        .then((resp) => resp.json())
        .then((resp_json) => {
            console.log(resp_json);
            //Because DataGrid give me only id on selection, so i want select emails,so
            //i swap between id and email
            let usersIdIsEmail = resp_json.Users.map((eachUser) => {
                let temp = eachUser.id
                eachUser.id = eachUser.email;
                eachUser.email = temp;
                return eachUser
            })
            setUsers(usersIdIsEmail);
            setLoading(false);
        })
    }


    useEffect(() => {
        getUsers()
        console.log("dsa")
    }, [])


    

    return <>
    {loading ? <div align='center'><CircularProgress/></div> :
    <Grid container spacing={2}>
        <Grid item xl={2} md={2} sm={2} xs={2} >
            <div style={{fontSize : "1.6rem"}}>here you can write your message to all Users</div>
        </Grid>
        <Grid item xl={8} md={8} sm={8} xs={8}>
            <form style={{marginTop: "2.0rem"}}ref={message}><TextField
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
            {buttonLoading.error && <h3>Sorry have internal server problem</h3>}
            {selectionModel.length > 0 ? buttonLoading ? <CircularProgress/> : <Button variant="contained" color="primary" onClick={sendMessage}>Send</Button> : null}
            </form>
            <TableUsers users={users} selectiselectionModel={selectionModel} setSelectionModel={setSelectionModel}/>
        </Grid>
        <Grid item xl={2} md={2} sm={2} xs={2}></Grid>
    </Grid>}
    </>
}