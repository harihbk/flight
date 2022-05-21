import React, { memo } from 'react' 
import { useNavigate } from "react-router-dom";
import { Toolbar, IconButton, Box, Typography, AppBar, MenuItem, Menu, Button, Modal, Grid, TextField, FormGroup, FormControl } from '@mui/material';
import './header.css';
import { AccountCircle, Menu as MenuIcon, Luggage } from '@mui/icons-material';
import { ReactComponent as FlightsIcon } from '../assets/icons/Flights.svg'
import { ReactComponent as HotelsIcon } from '../assets/icons/Hotels.svg'
import { ReactComponent as HolidaysIcon } from '../assets/icons/Holidays.svg'

import { ReactComponent as HotelsIconDark } from '../assets/icons/HotelsDark.svg';
import { ReactComponent as HolidaysIconDark } from '../assets/icons/HolidaysDark.svg';
import { ReactComponent as VisaIcon } from '../assets/icons/visaicon.svg';
import { ReactComponent as LogoDark } from '../assets/LogoDark.svg';
import { ReactComponent as LogoLight } from '../assets/LogoLight.svg';



const pages = ['Flights', 'Hotels', 'Holidays'];


const  Header = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


    const { headerDark } = props;
    console.log(props);
    const navigate = useNavigate();
  
    const goHome = () => {
        navigate("/")
    }

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

    const HeaderIcon = (name) => {
      switch(name) {

        case "Flights":   return <FlightsIcon className='headericon' />;
        case "Hotels":   return <HotelsIcon  className='headericon' />;
        case "Holidays": return <HolidaysIcon  className='headericon' />; 

        default:      return ""
      }
    }

    const HeaderIcon1 = (name) => {
      switch(name) {

        case "Flights":   return <FlightsIcon className='headericon' />;
        case "Hotels":   return <HotelsIconDark  className='headericon' />;
        case "Holidays": return <HolidaysIconDark  className='headericon' />; 

        default:      return ""
      }
    }

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      bgcolor: 'background.paper',
      boxShadow: 24,
      maxWidth: 800,
    };

    const leftcolstyle = {
      backgroundColor: '#21325d',
      color: '#fff',
    }
  return (
    <div>
      <AppBar position="static" elevation={0} sx={{ bgcolor: HeaderBg  }}   >
          <Toolbar style={{ height: 75 }}>
              <IconButton sx={{ display: { xs: 'flex', md: 'none' } }}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit" >
                <MenuIcon />
              </IconButton>

              <Button style={{ padding : 0, marginRight : 5 }} onClick={() => goHome()}>
                {headerDark ?  
                  <LogoLight className='headerLogo Light'  /> : 
                  <LogoDark className='headerLogo dark'  /> 
                }
              </Button>
              
              
              <Box className={"headermenu " + (headerDark ? "dark" : "light")} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page, i) => (
                  <Button
                      className={'menuItem '  + (i == 0 ? 'active' : '')}
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color : (headerDark ? "#fff" : "#121e40") , display: 'block' }}
                  >
                    { headerDark ?  HeaderIcon(page) : HeaderIcon1(page)}
                      {page}
                  </Button>
                  ))}

                  <Button  sx={{ my: 2, color: 'white', display: 'flex' }}>
                    <VisaIcon style={{ height : 30 }}  />
                  </Button>
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
              <MenuItem onClick={handleCloseUserMenu}>  Profile</MenuItem>
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
                  <Button className='loginButton' onClick={handleOpen}>
                      <AccountCircle style={{ marginRight: 6 }}/> Login / Signup
                  </Button>
              </Box>
          </div>
        </Toolbar>
      </AppBar>
 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='loginpopup'>
          <Box className='loginBoxWrapper' component={'div'}>
            <Grid container >
                <Grid item md={5} style={leftcolstyle}>
                    <Box component={'div'} className='logininfo_col' >
                        <Box className='logo'  component={'div'}>
                            <img src={require('../assets/logo.png')} alt="Mytrippe" /> 
                        </Box>

                        <Box className='info_item' component={'div'}>
                            <Box className='icon' component={'div'}>
                              <img src={require('../assets/icons/security.png')} alt="Secure" /> 
                            </Box>
                            <Box className='text' component={'div'}> Trusted by over 100 million Indians </Box>
                        </Box>

                        <Box className='info_item' component={'div'}>
                            <Box className='icon' component={'div'}>
                              <img src={require('../assets/icons/secure_payment.png')} alt="Secure Payment" /> 
                            </Box>
                            <Box className='text' component={'div'}> Fast & Secure Payments</Box>
                        </Box>

                        <Box className='info_item' component={'div'}>
                            <Box className='icon' component={'div'}>
                              <img src={require('../assets/icons/savemoney.png')} alt="Save Money" /> 
                            </Box>
                            <Box className='text' component={'div'}>Save on every booking with my trippe money</Box>
                        </Box>

                        <Box className='info_item' component={'div'}>
                            <Box className='icon' component={'div'}>
                              <img src={require('../assets/icons/trips.png')} alt="Mange Trips" /> 
                            </Box>
                            <Box className='text' component={'div'}>Manage trips, get fare alerts & Predictions</Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={7} style={{ padding : 50, paddingLeft: 40, paddingRight : 40, backgroundColor : '#fff' }}>
                  <Box className='loginform'>
                    <Typography component={'h2'} className='login_title'>Login/Signup</Typography>

                    <FormControl className='form_control'>
                      <TextField id="mobileno" value={'+91'} label="Enter your Mobile Number" variant="outlined" sx={{
                          '& .MuiOutlinedInput-root': {
                            'fieldset' :{
                              borderColor: '#a9a9a9',
                            },
                            '&.Mui-focused fieldset': {
                            borderColor: '#21325d',
                          },
                        },
                        '& label.Mui-focused': {
                          color: '#21325d',
                        },
                      }}/>
                    </FormControl>

                    <Button className='loginButton color_primary' variant='contained' fullWidth="true">
                      Continue
                    </Button>

                    <Typography component={'div'} style={{ fontSize : 15, textAlign: 'center', fontWeight : '500', opacity : 0.7 }}>Or Login/Signup With</Typography>

                    <Box component={'div'} className='login_google'>
                        <Button className='googleButton'>
                         <img src={require('../assets/icons/google.png')} alt="google icon" style={{width : 20, marginRight : 10}} /> Login With Google
                        </Button>
                    </Box>

                    <Typography className='policy_text'>By proceeding, you agree to mytrippe Privacy Policy, User Agreement and Terms of Service</Typography>

                  </Box>
                </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default memo(Header);

