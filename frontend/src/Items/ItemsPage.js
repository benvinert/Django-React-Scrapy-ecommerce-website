import React, { useState,useEffect,useContext,useRef } from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {useHistory, useParams} from 'react-router-dom';
import Item from './Item';
import Pagination from '../Components/Pagination';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FilterListIcon from '@material-ui/icons/FilterList';
import { UserContext } from '../Context/UserContext';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import AlertMessage from '../Components/AlertMessage';
import { ViewArray } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';


export default function Shoes()
{
    const {push,location } = useHistory();
    const [locState,setLocState] = useState(null)
    const [Allitems,setAllitems] = useState({Products : [],maxPrice : 0 , minPrice : 0 , colours : "" , sizes : [42,43,44]});
    const [showItems,setShowItems] = useState({Products : []});
    const {gender,cat,style,searchparam,filter,kids_gender} = useParams();
    const [currentPage,setCurrentPage] = useState(1);
    const [postPerPage,setPostsPerPage] = useState(20);
    const [Loading,setLoading] = useState(false);
    const [filterState,setFilterState] = useState({maxPrice : 0 , minPrice : 0 , colours : "" , size : ""})
    const [showFilterMenu,setShowFilterMenu] = useState({doSpaceGrid : false,visibility : false});
    const matches = useMediaQuery('(max-width:960px)');
    const { User } = useContext(UserContext);
    const [showAlert,setShowAlert] = useState({flag : false , message : ""});
    const inputRef = useRef("")
    
    console.log("LOCATION ::: " , location)
    // Input : list = [{title : "category : shoes"},{title : "gender:men}]
    // function serialize all this list to different arrays to make query easyest way
    const serializeAllQuerySearchParams = (allParams) =>
    {
        let parametersSearch = {
            category : [],
            style : [],
            gender : [],
            color : [],
            brand : []
          }

        allParams.map((eachVal) => {
            if(eachVal.title.startsWith("cat")){
              parametersSearch.category.push(eachVal)
            }
            else if(eachVal.title.startsWith("sty")){
              parametersSearch.style.push(eachVal)
            }
            else if(eachVal.title.startsWith("gend")){
              parametersSearch.gender.push(eachVal)
            }
            else if(eachVal.title.startsWith("col")){
              parametersSearch.color.push(eachVal)
            }
            else if(eachVal.title.startsWith("bran")){
                parametersSearch.brand.push(eachVal)
            }
        })
        console.log("CAT" , parametersSearch.category ,"STYLE", parametersSearch.style , "GENDER", parametersSearch.gender , "COLOR" , parametersSearch.color)
        return parametersSearch
    }


    const showFilter = () => 
    {
        setShowFilterMenu({visibility :!showFilterMenu.visibility ,doSpaceGrid : !showFilterMenu.doSpaceGrid});
    }
    const getItems = async() => 
    {
        
        let URL = `/api/All`
        if(searchparam)
        {
            let searchparamJson = JSON.parse(searchparam)
            setLocState(searchparamJson)
            let queryParams = serializeAllQuerySearchParams(searchparamJson)
            let URL = `/api/All/searchItem/params=${JSON.stringify(queryParams)}`
            try{
                await fetch(URL).then((resp) => resp.json()).then((jsonReponse) => {
                    setLoading(false);
                    setAllitems(jsonReponse);// set Items
                    setShowItems(jsonReponse)
                    setFilterState({maxPrice : jsonReponse.maxPrice , minPrice : jsonReponse.minPrice,colours : "" , size : ""})
                })
            }catch(e)
            {
                push("/errorpage")
                console.log("Server is down.")
            }

        }
        else if(gender)
        {
            //  Send Request to backEnd //
            URL += `/gender=${gender}`;
            if(gender != "kids")
            {
                URL += `/category=${cat}`;
                if(style)
                {
                    URL += `/style=${style}`
                }
            }
            else
            {
                URL += `/kids_gender=${kids_gender}/style=${style}/category=${cat}`
            }
            try{
                await fetch(URL).then((response) =>
                {
                    return response.json()
                }
                ).then((resp_json) => {
                    setLoading(false);
                    setAllitems(resp_json);// set Items
                    setShowItems(resp_json)
                    setFilterState({maxPrice : resp_json.maxPrice , minPrice : resp_json.minPrice,colours : "" , size : ""})
                })
            }catch(e)
            {
                push("/errorpage")
                console.log("Server is down.")
            }

        }
        setCurrentPage(1)
    }
    useEffect(() => 
    {
        getItems();
        setCurrentPage(1)// if we change url we need to be on first page
    }, [gender,cat,style,location.querySearchParams]);


    //Pagination//
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = showItems.Products.slice(indexOfFirstPost,indexOfLastPost);

    //Change Page//
    const paginate = (pageNumber) => 
    {
        setCurrentPage(pageNumber)
        window.scroll(0,0)
    }
    ////////////

    const [color,setColor] = useState('All')
    

    const handleChangeColor = (event) => 
    {
        let color = "";
        if(event.target.value)
            color = event.target.value;
        else 
            color = inputRef.current.value;
        
        setColor(color)
        let afterFilter = Allitems.Products.filter((each) => 
        {   ///return array of boolean if one cell is true so we can show it
            let ifSizeExists = each.sizes.map((each) => each.includes(filterState.size))
            if(ifSizeExists.includes(true))
            {
                ifSizeExists = true;
            }
            else
            {
                ifSizeExists = false;
            }
            return each.price <= filterState.maxPrice && each.color.toLowerCase().includes(color.toLowerCase()) 
            && ifSizeExists
        })
        setShowItems({...showItems,Products : afterFilter})
        setFilterState({...filterState,colours : color})
        window.scroll(0,0)
      };

    const [value, setValue] = useState('None');
    const handleChangePrice = (event) => 
    {
        let pricelevel = event.target.value;
        let price = 0;
        setValue(pricelevel);
        if(pricelevel == "min")
        {
            price = Allitems.minPrice+ 10
        }
        else if(pricelevel == "mid")
        {
            price = (Allitems.maxPrice + Allitems.minPrice)/2
        }
        else if(pricelevel == "max")
        {
            price = Allitems.maxPrice
        }
        else// if it's None
        {
            price = Allitems.maxPrice
        }
        let afterFilter = Allitems.Products.filter((each) => 
        {
                ///return array of boolean if one cell is true so we can show it
            let ifSizeExists = each.sizes.map((each) => each.includes(filterState.size))

            ifSizeExists = ifSizeExists.includes(true) ? true : false;

            return each.price <= price && each.color.includes(filterState.colours)
            &&  ifSizeExists
           
        })
        setShowItems({...showItems,Products : afterFilter})
        setFilterState({...filterState,maxPrice : price,minPrice : 0})
        window.scroll(0,0)
    };

    function filterBySize(whichSize)
    {
        let afterFilter = Allitems.Products.filter((each) => 
        {
            let ifSizeExists = each.sizes.map((each) => each.includes(whichSize))
            ifSizeExists = ifSizeExists.includes(true) ? true : false;
            return each.price <= filterState.maxPrice && each.color.includes(filterState.colours) && ifSizeExists
                
        })
        console.log("After: " , afterFilter)
        setShowItems({...showItems,Products : afterFilter})
        setFilterState({...filterState,size : whichSize})
        window.scroll(0,0)
    }


    const Colooors = [
        "Black",
        "Yellow",
        "Green",
        "Purple",
        "Blue",
    ]

    const checkScreenSize = () => 
    {
        if(matches)
        {
            if(showFilterMenu.visibility)
            {
                return "visible"
            }
            else
            {
                return "hidden"
            }
        }
        return "visible"
    }

    return <>
    <Grid container>
        
        <Grid style={{visibility : checkScreenSize()}} className="GridFilters" item xl={2} md={2} sm={showFilterMenu.doSpaceGrid ? 7 : 1} xs={showFilterMenu.doSpaceGrid ? 7 : 1}>
            <h2>{gender} {style} {cat}</h2>
            <br></br>
            {showFilterMenu.doSpaceGrid ?<Button variant="outlined" color="primary" onClick={showFilter}> See results</Button> : null}
            <h3>Filter By Price</h3>
            <h3>Lower than</h3>
            <RadioGroup value={value} onChange={handleChangePrice}>
                <FormControlLabel value="min" control={<Radio />} label={(Allitems.minPrice + 10).toFixed(2)}  />
                <FormControlLabel value="mid" control={<Radio />} label={((Allitems.maxPrice + Allitems.minPrice)/2).toFixed(2)}/>
                <FormControlLabel value="max" control={<Radio />} label={Allitems.maxPrice} />
                <FormControlLabel value="None" default control={<Radio />} label="None" />
            </RadioGroup>
            <h3>Filter By Colours</h3>
            <TextField
                variant="outlined"
                id="searchColor"
                label="Enter One Color"
                name="searchColor"
                autoComplete="searchColor"
                inputRef={inputRef}
            />
            <Button style={{marginTop : '0.5rem'}}variant="outlined" color="primary" onClick={handleChangeColor}>Search</Button>
            <div className="FiltersGrid">

                <RadioGroup value={color} onChange={handleChangeColor}>
                    {Colooors.map((eachColor) =>
                        {
                            return <>
                            <div style={{width : "20px", height : "20px" , background : `${eachColor}`}}/>
                            <FormControlLabel value={eachColor} control={<Radio />} label={eachColor}/>
                            </>
                        }
                        )}
                        <FormControlLabel value="" default control={<Radio />} label="All" />
                </RadioGroup>
                <h3>Filters By sizes</h3>
                <div className="FilterSizes">
                    {Allitems.sizes.map((eachSize) => 
                    <Link style={{
                        textDecoration : "none",
                        color : "black",
                        border : "0.5px solid",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center"}} 
                        onClick={() => filterBySize(eachSize)}>
                        {eachSize}
                    </Link>)}
                </div>
            <Button onClick={() => filterBySize("")} style={{marginTop : '0.8rem'}} variant='contained' color='primary' >All Sizes</Button>
            </div>

        </Grid>
        <Grid item xl={10} md={10} sm={showFilterMenu.doSpaceGrid ? 5 : 10} xs={showFilterMenu.doSpaceGrid ? 5 : 10}>
        
            <Container  style={{borderRadius : '0%'}}  component="main" maxWidth="xl">
                <div className="Top">
                    <AlertMessage showAlert={showAlert}/>
                    Items <br/><br/>{matches ? <div>Filters<Link><FilterListIcon fontSize="large" onClick={showFilter}/></Link></div> : null}
                </div>
                <Grid style={{padding : '15px 15px 15px 15px'}}container spacing={5}>
                    <Item loading={Loading} items={currentPosts} setshowalert={setShowAlert}/>
                </Grid>
                <div  align='center' className="Pagination">
                    <Pagination  postsPerPage={postPerPage} totalPosts={showItems.Products.length} paginate={paginate}/>
                </div>
                
            </Container>
        </Grid>
        
    </Grid>
    </>
}