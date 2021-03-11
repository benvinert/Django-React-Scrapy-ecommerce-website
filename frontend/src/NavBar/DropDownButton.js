import React,{useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { CartContext } from '../Context/CartContext';
import { UserContext } from '../Context/UserContext';
import { useHistory } from 'react-router';
import { LikeItemsContext } from '../Context/LikeItemsContext';
import { GrDeliver } from 'react-icons/gr';
import Badge from '@material-ui/core/Badge';
import EmailIcon from '@material-ui/icons/Email';
import PeopleIcon from '@material-ui/icons/People';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {likeItems , setLikeItems} = useContext(LikeItemsContext);
  const { User } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const { push } = useHistory();
  


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
//Client DropDown
  var DropDownDetailsClient = [
    {title : "Cart" , url : "/cart" , icon : <ShoppingCartIcon />,count : cart.length},
    {title : "Like list" , url : "/likesitems" , icon : <AccountBoxIcon fontSize="small" />,count : likeItems.length},
    {title : "Inbox" , url : "/likesitems" , icon :<InboxIcon fontSize="small" />},
    {title : "Order" , url : "/orders" , icon : <GrDeliver fontSize="small" />},
  ]
// Admin DropDown
  var DropDownDetailsAdmin = [
    {title : "Users" , url : "/users" , icon : <PeopleIcon/>},
    {title : "Send Email" , url : "/email_admin" , icon : <EmailIcon/>},
  ]

  var DowpDown = User.isAuthenticated && User.is_staff ? DropDownDetailsAdmin : DropDownDetailsClient

  return (
    <div>
      <Button
        style={{marginTop : '0.3rem', width : "6.8"}}
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        {User.is_staff ? "Admin" : "Profile"}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      
        {DowpDown.map((eachTab) => 
        {
          return <StyledMenuItem onClick={() => {push(eachTab.url); handleClose();}}>
            <ListItemIcon>
            {eachTab.count ? <StyledBadge badgeContent={eachTab.count} color="secondary">
                              {eachTab.icon}
                            </StyledBadge> : eachTab.icon}
            </ListItemIcon>
            <ListItemText primary={eachTab.title} />
          </StyledMenuItem>
        })}
      </StyledMenu>
    </div>
  );
}
