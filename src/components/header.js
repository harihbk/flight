import React, { memo } from 'react' 
import { Toolbar, IconButton, Box, Typography, AppBar, MenuItem, Menu, Button } from '@mui/material';
import './header.css';
import { AccountCircle, Menu as MenuIcon, Luggage } from '@mui/icons-material';


const pages = ['Flights', 'Hotels', 'Holidays'];


const  Header = (props) => {
    const { headerDark } = props;
    
    const HeaderBg = headerDark ? '#21325d' : '#fff';
    const HeaderTextColor = headerDark ? '#fff' : '#21325d';

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    }; 

    
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: HeaderBg  }}   >
        <Toolbar style={{ height: 75 }}>
            <IconButton sx={{ display: { xs: 'flex', md: 'none' } }}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            ><MenuIcon /></IconButton>
            <img className='headerLogo' src={require('../assets/logo.png')} alt="Mytrip" />
            
            <Box className='headermenu' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                <Button
                    className='menuItem active'
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page}
                </Button>
                ))}
            </Box>
            <Menu 
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                display: { xs: 'block', md: 'none' },
                }}
            >
            <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
        </Menu> 
        <div>
            <Box className='headerRightMenu' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems : 'center' }}>
                <Button className='tripmanagement'>
                    <div>
                        <Luggage style={{ width : 35, height : 35, color : HeaderTextColor }}/>
                    </div>
                    <div>
                        <Typography sx={{ color : HeaderTextColor }}>My Trips</Typography>
                        <Typography sx={{ color : HeaderTextColor }} style={{ fontSize : 10 }}>Manage Bookings</Typography>
                    </div>
                </Button>
                <Button className='loginButton'>
                    <AccountCircle /> Login / Signup
                </Button>
            </Box>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default memo(Header);

