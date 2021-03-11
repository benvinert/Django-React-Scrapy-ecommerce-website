import React,{useState,useEffect} from 'react';
import './App.css';
import { Switch,Route, BrowserRouter as Router, useParams, Redirect } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Grid from '@material-ui/core/Grid';
import Home from './Components/Home';
import Register from './Components/Register';
import ItemsPage from './Items/ItemsPage';
import InItemPage from './Items/InItemPage';
import { UserContext } from './Context/UserContext';
import { CartContext } from './Context/CartContext';
import { LikeItemsContext } from './Context/LikeItemsContext';
import Login from './Authentication/Login';
import ActivateAccount from './Authentication/ActivateAccount';
import Layout from './Authentication/Layout';
import Cart from './Components/Cart';
import LikeItems from './Components/LikeItems';
import ErrorPage from './Components/ErrorPage';
import { Orders }  from './Orders/Orders';
import CheckOut from './Checkout/CheckOut';
import { SeeOrder }  from './Orders/SeeOrder';
import {ScrollToTop} from './Components/ScrollToTop';
import {AdminUsers} from './Admin/AdminUsers';
import {AdminSendEmail} from './Admin/AdminSendEmail';


function App() 
{
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || []
  const LikeItemsFromLocalStorage = JSON.parse(localStorage.getItem("likelist")) || []

  const [User,setUser] = useState({
    name : "Null",
    isAuthenticated : false,
    is_staff : false,
  })

  
  const [likeItems,setLikeItems] = useState(LikeItemsFromLocalStorage)
  const [cart,setCart] = useState(cartFromLocalStorage)

  useEffect(() => {
    localStorage.setItem("cart",JSON.stringify(cart))
    localStorage.setItem("likelist",JSON.stringify(likeItems))
  }, [cart,likeItems])

  const ProtectedRoute = ({component : Component , ...rest}) => 
  {
    return <Route {...rest}
    render={(props) => {
      return User.isAuthenticated & User.is_staff ? <Component/> : <Redirect to="/login"/>
    }}/>
  }

  return (
    <div>
      <Router>
        <UserContext.Provider value={{User,setUser}}>
          <CartContext.Provider value={{cart,setCart}}>
            <LikeItemsContext.Provider value={{likeItems,setLikeItems}}>
              <ScrollToTop/>
                <Grid>
                  <Layout/>
                      <NavBar/>
                      <br></br>
                      <br></br>
                      <br></br>
                      <Switch>
                        <Route path="/" exact={true} component={Home}/>
                        <Route path="/Login" exact={true} component={Login}/>
                        <Route path="/register" exact={true} component={Register}/>
                        <Route path="/cart" exact={true} component={Cart}/>
                        <Route path="/likesitems" exact={true} component={LikeItems}/>
                        <Route path="/errorpage" exact={true} component={ErrorPage}/>
                        <Route path="/checkout" exact={true} component={CheckOut}/>
                        <Route path="/orders" exact={true} component={Orders}/>
                        <Route path="/seeorderbyid=:orderid" exact={true} component={SeeOrder}/>
                        <ProtectedRoute path="/users" exact={true} component={AdminUsers} />
                        <ProtectedRoute path="/email_admin" exact={true} component={AdminSendEmail} />
                        
                        
                        <Route path="/activate/:uid/:token" exact={true}> 
                          <ActivateAccount/>
                        </Route>

                        <Route path="/search_item/search=:searchparam" exact={true}> 
                          <ItemsPage/>
                        </Route>

                        <Route path="/:gender/:cat" exact={true}> 
                          <ItemsPage/>
                        </Route>
                      
                        <Route path="/:gender/:cat/style=:style" exact={true}> 
                          <ItemsPage/>
                        </Route>

                        <Route path="/:gender/:cat/filter=:param" exact={true}> 
                          <ItemsPage/>
                        </Route>

                        <Route path="/:gender/:kids_gender/:style/:cat" exact={true}> 
                          <ItemsPage/>
                        </Route>

                        <Route path="/item=:id" exact={true}> 
                          <InItemPage/>
                        </Route>
                      </Switch>
                </Grid>
              
            </LikeItemsContext.Provider>
          </CartContext.Provider>
        </UserContext.Provider>
      </Router>
      <br/>
      <br/>
      <br/>
    </div>
  );
}

export default App;
