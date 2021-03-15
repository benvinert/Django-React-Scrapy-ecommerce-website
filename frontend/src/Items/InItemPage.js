import React,{useEffect,useState,useContext,useRef} from 'react'
import Grid from '@material-ui/core/Grid';
import ItemsCarusel from '../Carusel/ItemsCarusel';
import { useHistory,useLocation  } from 'react-router';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Alert, AlertTitle } from '@material-ui/lab';
import Slide from '@material-ui/core/Slide';
import { WhichButtonToShowUser } from './WhichButtonToShowUser';
import { ReviewItems } from './ReviewItems';





const InItemPage = (props) =>
{

    const location = useLocation();
    const matches = useMediaQuery('(max-width:600px)');
    const { User } = useContext(UserContext);
    const {push } = useHistory()
    const { cart,setCart } = useContext(CartContext);
    const [itemDetails , setItemDetails] = useState({ gender : "null" , name : "null" , Category : "null" , sizes : [] , price : "NULL" , images : [],postsProduct : []})
    const [checkFromWhere , setCheckFromWhere] = useState("")
    const [size,setSize] = useState("")
    const [circularShow,seCircularShow] = useState(false);
    const [showAlert,setShowAlert] = useState(false);
    const [changeSizeOn,setChangeSizeOn] = useState(false);
    const postContent = useRef();
    const [userPostLoading,setUserPostLoading] = useState(false);

    const requestGetItemById = async(product_code,idex) => 
    {
        try
        {
            await fetch(`api/All/getItemById/product_code=${product_code}`)
            .then((response) => response.json())
            .then((response_json) => {console.log(response_json) ; setItemDetails({...response_json,idex : idex})})
        }
        catch(error)
        {
            push("/errorpage");
        }
    }

    useEffect(() => {
        let product_code = location.pathname.split("=")[1]//"item=code" so we split them to ["item","code"] and take index 1
        var idex;
        if(location.state){
            setSize(location.state.it.sizes[0])
            console.log("check::" , location.state.it)
            setCheckFromWhere(location.state.check)
            idex = location.state.it.idex
        }
        requestGetItemById(product_code,idex);
        console.log("useEffect render")
    }, [userPostLoading])

    const deleteFromCart = (Product_idex_to_Remove) =>
    {
        let cartAfterFilter = JSON.parse(localStorage.getItem("cart")).filter((eachItemCart,index) => 
        {
            return index != Product_idex_to_Remove
        })
        localStorage.setItem("cart",JSON.stringify(cartAfterFilter))
        setCart(cartAfterFilter)
        push("/cart")
    }

    
    //////////if Media Query is TRUE(max-screen less than 600)/////
    const ImagesForMobile = () => 
    {
        return itemDetails.images.map((eachImage,index) => 
        {
            return <div>
                        <img src={eachImage} width="200" height="200"/>
                    </div>
        })
    }
    ////////////////////////////////////

    const addToCart = () =>
    {
        let itemAddedToCart = {...itemDetails}
        
        setCart((prevState) => {return [...prevState,{...itemAddedToCart,selectedSize : [size]}]})
        seCircularShow(true)
        setTimeout(() => {seCircularShow(false);
                          setShowAlert(true);},1000);
        setTimeout(() => setShowAlert(false),3000);
        
    }


    const handleChangeSize = (event) => 
    {
        let size = event.target.value;
        setSize(size)

    }


    const SaveChangeOnCart = (Product_idex) =>
    {
        let cart = JSON.parse(localStorage.getItem("cart"))
        let cartAfterFilter = cart.map((eachItem,index) => {
            if(index == Product_idex)
            {
                eachItem.selectedSize = [size];
            }
            return eachItem;
        })
        localStorage.setItem("cart",JSON.stringify(cartAfterFilter))
        setCart(cartAfterFilter)
        setCheckFromWhere("cart");

    }


    ///Alert Add Item To Cart
    const AlertShow = () => 
    {
        if(showAlert)
        {
            return  <Slide direction="right" in={showAlert} mountOnEnter unmountOnExit>
                        <Alert severity="success">
                            Item Added sucssefully to your'e Cart
                        </Alert>
                    </Slide>
        }
        return null;
    }

    const CheckIfNeedToDisabled = ({eachS}) =>
    {
        if(checkFromWhere == "cart")
        {
            return <FormControlLabel disabled value={eachS} control={<Radio />} label={eachS}/>
        }
        return <FormControlLabel value={eachS} control={<Radio />} label={eachS}/>;
    }

    const sendPost = async(whichOperator,postId) =>
    {
        let product_code = location.pathname.split("=")[1]
        let token = localStorage.getItem("access")
        let valOfPost = postContent.current
        console.log(valOfPost['PostContent'].value)
        var payload = {"author" : User.email,"content" : valOfPost['PostContent'].value,"product_code" : product_code}
        let method = "POST"
        if(postId)
        {
            payload = {...payload,_id : postId}
            method = "PUT"
        }
        console.log("sended Payload :: " , payload,"POSTIDD::" , postId)
        try
        {
        await fetch(`api/All/${whichOperator}`,{
            method: method, // *GET, POST, PUT, DELETE, etc.
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
            .then((resp) => {
                setUserPostLoading(true)
                setTimeout(() => setUserPostLoading(false),2000)
            }) // body data type must match "Content-Type" header)
        }

        catch
        {
            push("errorpage")
        }
    }

    return <>
    <Grid container xl={12} md={12} sm={12} xs={12}>
        <Grid item xl={3} md={3} sm={3} xs={6}>
            <div className="InfoBuyers">
                <h1>{itemDetails.gender} {itemDetails.Category}</h1>
                <h2>{itemDetails.name}</h2>
                
                    <RadioGroup value={size} onChange={handleChangeSize}>
                    <div className="FilterSizes">
                        <Grid item xl={12} md={6} sm={10} xs={12}>
                            {itemDetails.sizes.map((eachSize) => {
                                return <CheckIfNeedToDisabled eachS={eachSize}/>
                            })}
                            <Grid>
                            <h2>Size Selected </h2><FormControlLabel value={size} default control={<Radio />} label={size} />
                            {changeSizeOn ? <Button variant='outlined' color='primary'>Save</Button> : null}
                            {checkFromWhere == "cart" ? <Button variant='outlined' color='primary' onClick={() => setCheckFromWhere("changesize")}>Change size</Button>
                            :
                            null}
                            </Grid>
                        </Grid>
                    </div>
                    </RadioGroup>
                <h2>product code: {itemDetails.product_code}</h2>
                <h2>{itemDetails.price}$</h2>

                {User.isAuthenticated ? <WhichButtonToShowUser deleteFromCart={deleteFromCart} SaveChangeOnCart={SaveChangeOnCart} addToCart={addToCart} checkFromWhere={checkFromWhere} itemDetails={itemDetails} circularShow={circularShow} /> : <Button variant="outlined" onClick={() => push("/login")} color="primary">
                                            <b>
                                                Sign in to buy
                                            </b>
                                            </Button>}
            </div>

            <AlertShow/>
            
        </Grid>
        <Grid item xl={7} md={9} sm={9} xs={6}>
            <ItemsCarusel images={itemDetails.images}/>
            {matches && <ImagesForMobile />}
        </Grid>
    </Grid>
    <ReviewItems itemDetails={itemDetails} userPostLoading={userPostLoading} postContent={postContent} sendPost={sendPost} />
    </>
}

export default InItemPage;

    
