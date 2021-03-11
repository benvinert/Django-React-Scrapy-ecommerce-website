import { ProSidebar, Menu, MenuItem, SubMenu,  SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import LogoVinerfia from '../LogoVinerfia.png';
import { GiHoodie,GiMonclerJacket,GiHighHeel,GiSonicShoes , GiTennisRacket ,GiClothes, GiTrousers,
    GiHoodedFigure,
    GiShorts,    
    GiPoloShirt,GiConverseShoe} from 'react-icons/gi';
import { Link } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import { IoIosMan } from 'react-icons/io';
import { FaRunning , FaGolfBall , FaTshirt ,FaSocks} from 'react-icons/fa';
import { BiFootball, BiBasketball } from 'react-icons/bi';
import { CgBoy, CgGirl } from 'react-icons/cg';
import sidebar from './sidebar.css';
import { useHistory } from 'react-router';
import SearchAutoComplete from './SearchAutoComplete';



function Proside(props)
{
    const { push } = useHistory();

    const customPush = (URL) =>
    {
        props.CloseMenu()
        push(`${URL}`)
    }

    const serializeGenderOnUrl = (categories,gender,ageForKids) =>
    {
        if(gender == "women")
            categories = categories.map((eachCat) => {return {...eachCat,url : eachCat.url.replace("men","women")}})
        else if(gender == "girls" || gender == "boys")
        {
            categories = categories.map((eachCat) => { 
                let newURL = eachCat.url.replace("boys",gender)
                newURL = newURL.replace("toddler",ageForKids)
                return {...eachCat,url : newURL}
            })
        }
        return categories
    }

    var Shoescatergories = [
        {title : "All Shoes" ,url : "/men/shoe", icon : <GiConverseShoe/>},
        {title : "Running" ,url : "/men/shoes/style=run", icon : <FaRunning/>},
        {title : "Football" ,url : "/men/shoes/style=footbal", icon : <BiFootball/>},
        {title : "Basketball" ,url : "/men/shoes/style=basketbal", icon : <BiBasketball/>},
        {title : "Tennis" ,url : "/men/shoes/style=tenni", icon : <GiTennisRacket/>},
        {title : "Golf" ,url : "/men/shoes/style=golf", icon : <FaGolfBall/>},
        {title : "Slides" ,url : "/men/shoes/style=golf", icon : <GiSonicShoes/>},
    ]


    var ClothingCategories = [
        {title : "All Clothing" ,url : "/men/All", icon : <GiClothes/>},
        {title : "Hoodies and Sweatshirts" ,url : "/men/hoodie", icon : <GiHoodie/>},
        {title : "Top and T-Shirts" ,url : "/men/top", icon : <FaTshirt/>},
        {title : "Trousers and tights" ,url : "/men/trouser", icon : <GiTrousers/>},
        {title : "Tracksuits" ,url : "/men/tracksuit", icon : <GiHoodedFigure/>},
        {title : "Shorts" ,url : "/men/short", icon : <GiShorts/>},
        {title : "Jackets" ,url : "/men/jacket", icon : <GiMonclerJacket/>},
        {title : "Polos" ,url : "/men/polo", icon : <GiPoloShirt/>},
        {title : "Socks" ,url : "/men/sock", icon : <FaSocks/>},
    ]

    var subMenu = [{title : "Men" , icon : <IoIosMan alt="logo"/> ,subSubMenu : [{title : "Shoes",menuItems : serializeGenderOnUrl(Shoescatergories,"men")},{title : "Clothing" , menuItems : serializeGenderOnUrl(ClothingCategories,"men")}]},
    {title : "Women" , icon : <GiHighHeel alt="logo"/> ,subSubMenu : [{title : "Shoes",menuItems : serializeGenderOnUrl(Shoescatergories,"women")},{title : "Clothing" , menuItems : serializeGenderOnUrl(ClothingCategories,"women")}]}]


    // Kids Titles
    var kidsCategories = [{title : "All Shoes",url : "/kids/boys/toddler/shoe",icon : <GiSonicShoes/>},
                          {title : "All Clothing",url : "/kids/boys/toddler/All",icon : <GiSonicShoes/>}]

    var KidsMenu = [{title : "Boys" ,icon : <CgBoy  alt="logo"/>,subMenu : [{title : "Toddler 1-4 years",menuItems : serializeGenderOnUrl(kidsCategories,"boys","toddler")},
                                                                            {title : "Little 4-8 years",menuItems : serializeGenderOnUrl(kidsCategories,"boys","little")},
                                                                            {title : "Older 8-16 years",menuItems : serializeGenderOnUrl(kidsCategories,"boys","older")}]},

                    {title : "Girls" ,icon : <CgGirl  alt="logo"/>,subMenu : [{title : "Toddler 1-4 years",menuItems : serializeGenderOnUrl(kidsCategories,"girls","toddler")},
                                                                              {title : "Little 4-8 years",menuItems : serializeGenderOnUrl(kidsCategories,"girls","little")},
                                                                              {title : "Older 8-16 years",menuItems : serializeGenderOnUrl(kidsCategories,"girls","older")}]}]

    return <div >
        <ProSidebar >
            <Link style={{width : '30px',marginLeft : '1.5rem'}} onClick={props.CloseMenu} ><ClearIcon style={{fontSize:'50px'}}/></Link>
            <div style={{padding : "30px 30px 30px 30px "}}><SearchAutoComplete/></div>
            <div style={{marginLeft : '1.5rem'}}>
                <img width="60" height="60" src={LogoVinerfia} alt="logo"/>
            </div>
                <Menu  iconShape="circle">
                    <MenuItem icon={<img width="40" height="35" src={LogoVinerfia} alt="logo"/>} onClick={() => push("/")}>Home</MenuItem>
                    {/*  SubMenu */}
                    {subMenu.map((eachSubmenu) => (
                    <SubMenu title={eachSubmenu.title} icon={eachSubmenu.icon}>
                                {eachSubmenu.subSubMenu.map((eachSubSubMenu) => (
                                    <SubMenu title={eachSubSubMenu.title}>
                                    {eachSubSubMenu.menuItems.map((eachMenuItem) => (
                                        <MenuItem onClick={() => customPush(eachMenuItem.url)}>
                                            {eachMenuItem.icon} {eachMenuItem.title}
                                        </MenuItem>
                                        ))}
                                    </SubMenu>))}
                    </SubMenu>))}

                    {KidsMenu.map((eachKidMenu) => (
                        <SubMenu title={eachKidMenu.title} icon={eachKidMenu.icon}>
                                    {eachKidMenu.subMenu.map((subMenu) => (
                                       <SubMenu title={subMenu.title}>
                                                    {subMenu.menuItems.map((menuItem) => (
                                                        <MenuItem  onClick={() => customPush(menuItem.url)}>
                                                                {menuItem.icon} {menuItem.title}
                                                        </MenuItem>
                                                    ))}
                                        </SubMenu>))}
                        </SubMenu>))}
                    <MenuItem icon={<img width="40" height="35" src={LogoVinerfia} alt="logo"/>}>About</MenuItem>
                    <MenuItem icon={<img width="40" height="35" src={LogoVinerfia} alt="logo"/>}>Contact</MenuItem>
                </Menu>
                {/* <SidebarFooter>
                    Footer
                </SidebarFooter> */}
                
        </ProSidebar>
            </div>

            

    

}


export default Proside;