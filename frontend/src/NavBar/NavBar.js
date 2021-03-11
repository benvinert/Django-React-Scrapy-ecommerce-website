import React,{ useState,useContext } from 'react'
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Proside from './Proside';
import { useHistory } from 'react-router';
import LogoVinerfia from '../LogoVinerfia.png';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import App from '../App.css';
import { UserContext } from '../Context/UserContext';
import DropDownButton from './DropDownButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function NavBar()
{
    const { push } = useHistory();
    const { User,setUser } = useContext(UserContext)
    const [SideBar,SetSideBar] = useState(false);
    
    //Remove Token and set Auth to false
    const Logout = () => {
        localStorage.removeItem("access")
        setUser((prevState) => {return {...prevState,isAuthenticated : false}})
        push("/")
    }
    return <>
    <Grid className="Navbar1" style={{position : 'fixed',zIndex : 1}} container>
        <Grid item xl={6} md={6} sm={6} xs={4}>
            <nav style={{marginLeft : "10px"}}>
                <img src={LogoVinerfia} width='50' height='50'/>
                <Link style={{color : "white"}}>
                    <MenuIcon style={{fontSize:"50px"}} fontSize='large' onClick={() => SetSideBar(!SideBar)}/>
                </Link>
                <div className={SideBar ? 'sidebar active' : 'sidebar'}>
                    <Proside CloseMenu={() => SetSideBar(!SideBar)}/>
                </div>
            </nav>
        </Grid>
        <Grid container item xl={4} md={6} sm={5} xs={7} spacing={1}>
            <Grid md={6}>
            
            </Grid>
            <Grid  item md={2} sm={6} xs={6}>
                {User.isAuthenticated ? <DropDownButton/> : <Button variant="contained" style={{marginTop : '0.3rem',width : "6.8rem"}} color="primary" 
                                                                onClick={() => push("/Register")}>
                                                                        Register
                                                            </Button>}
                        
            </Grid>
            <Grid item  md={1} sm={2} xs={2}>
            </Grid>
            <Grid  item  md={2} sm={1} xs={1}>
                {User.isAuthenticated ? <Button variant="contained" style={{marginTop : '0.3rem'}} 
                                        onClick={() => Logout()} color="primary">
                                            Logout
                                        </Button> : <Button variant="contained" style={{marginTop : '0.3rem'}} 
                                        onClick={() => push("/Login")} color="primary">
                                            Login
                                        </Button>}
            </Grid>
        </Grid>
    </Grid>
        
    
    </>
}



export default NavBar;



