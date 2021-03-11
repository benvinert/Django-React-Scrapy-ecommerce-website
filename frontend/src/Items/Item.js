import React,{useContext, useEffect,useState} from 'react'
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import Itemstyles from '../styles/Itemstyles.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { CartContext } from '../Context/CartContext';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { LikeItemsContext } from '../Context/LikeItemsContext';
import 'semantic-ui-css/semantic.min.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { UserContext } from '../Context/UserContext';

const Item = ({fromWhere,items,loading,setcartitems,setshowalert}) => {
    const { User } = useContext(UserContext);
    const { push,location } = useHistory();
    const { cart,setCart } = useContext(CartContext);
    const {likeItems , setLikeItems} = useContext(LikeItemsContext);
    const [checked, setChecked] = useState(true);
    if(loading)
    {
        return <h2>Loading...</h2>
    }

    
    // Check if second image exists because we wouldn't want a error
    function checkIfSecondImageExists(arrayImages)
    {
        
        if(arrayImages[1] != undefined)
        {
            return arrayImages[1]
        }
        else
        {
            return arrayImages[0]
        }
    }


    const deleteFromList = (Product_idex_to_Remove,fromWhereParam) =>
    {
        let cartAfterFilter = JSON.parse(localStorage.getItem(fromWhereParam)).filter((eachItemCart,index) => 
        {
            return index != Product_idex_to_Remove
        })
        localStorage.setItem(fromWhereParam,JSON.stringify(cartAfterFilter))
        if(fromWhereParam == "cart")
        {
            setCart(cartAfterFilter);
            setcartitems(cartAfterFilter);
        }
        else if(fromWhereParam == "likelist")
        {
            setLikeItems(cartAfterFilter)
        }
            
        setshowalert({flag : true , message : "Item Removed Succsessfuly from " + fromWhereParam});
        setTimeout(() => setshowalert({flag : false , message : ""}),3000)
    }

    const addToLikesItems = (ItemLike) => 
    {
        console.log(ItemLike)
        setLikeItems((prevState) => {return [...prevState,{...ItemLike}]})
        setshowalert({flag : true , message : "Item Added to LikeList"})
        setTimeout(() => setshowalert({flag : false , message : ""}),3000)
    }



    const CheckFromWhereComponent = ({fromWhere,index}) =>
    {
        if(fromWhere == "cart" || fromWhere == "likelist")
        {
            return <Link onClick={() => deleteFromList(index,fromWhere)}><HighlightOffIcon style={{transition : '0.3s'}}className="buttonLike" color="error" fontSize="large"/></Link>
        }
        else
        {
            return null;
        }
    }


    const NavLikeImage = ({each}) => 
    {
        // take index of localStorage "likelist" and send it to removeItem Function
        let likeEntered = {entered : false, index : 0};
        likeItems.map((eachLikeItem,index) => 
        {
            if(eachLikeItem.name == each.name && eachLikeItem.color == each.color)
            {
                likeEntered = {entered : true , index : index};
            }
        })
        if(fromWhere == "likelist")
        {
            return null;
        }
        else
        {
            return <div>
                        <Grid container>
                            <Grid item xl={7} md={7} sm={7} xs={7}>
                                <Link>
                                    {likeEntered.entered ? <FavoriteIcon fontSize="large" style={{transition : '0.3s'}} className="buttonLike"onClick={() => deleteFromList(likeEntered.index , "likelist")}/>
                                    :  
                                    <FavoriteBorderIcon fontSize="large"  style={{transition : '0.3s'}} className="buttonLike" onClick={() => addToLikesItems(each)}/>}
                                </Link>
                            </Grid>
                            {fromWhere == "cart" ?  <Grid item xl={5} md={5} sm={5} xs={5}>
                                                        <span>Size:{each.selectedSize}</span>
                                                    </Grid> : null}
                        </Grid>
                    </div>
        }
    }

    return (
        <>
        
        {items.map((each,index) => 
        {
            return <Grid item xl={3} md={3} sm={6} xs={6} >
                        <Grid key={index}>
                            <Link to={{pathname : "/item=" + each.product_code,state : {it : {...each,idex : index} ,check : fromWhere}}}>
                                {each.images && <Image  
                                imageStyle={{width : "100%" , height : "100%"}}
                                onMouseOver={e => (e.currentTarget.src=checkIfSecondImageExists(each.images))}
                                onMouseOut={e => (e.currentTarget.src=each.images[0])}
                                src={each.images[0]}/>}<br></br>
                            </Link>

                        </Grid>
                        {User.isAuthenticated ?  <NavLikeImage each={each}/> : null}
                    <div className="item-title">
                        <Grid>
                            <Link style={{textDecoration : "none",color : "black"}}>
                                <span>{each.name}</span>
                            </Link>
                        </Grid>
                        <Grid> 
                            <div>{each.which_style}</div>
                        </Grid>
                        <Grid>
                            <div>{each.color}</div>
                        </Grid>
                        <Grid>
                            <div>{each.price}$ <CheckFromWhereComponent fromWhere={fromWhere} index={index}/> </div>

                        </Grid>
                    </div>
                    
                    </Grid>
                
        })}
        </>
    )
}

export default Item;


