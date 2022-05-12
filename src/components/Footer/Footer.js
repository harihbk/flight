import React from 'react' 
import { Toolbar, IconButton, Box, Typography, AppBar, MenuItem, Menu, Button, Container } from '@mui/material';
import './Footer.css';
import { AccountCircle, Menu as MenuIcon, Luggage } from '@mui/icons-material';

 
export default function Footer() {

    
  return ( 
    <Box className='footerWrapper'>
        <Container>
            <Box className='footerStripe'>
                <Box className='footerCol copyright'>
                    <Typography>@ 2022 mytripe All Rights Recived</Typography>
                </Box>
                <Box className='payment footerCol'>
                    <img className='headerLogo' src={require('../../assets/payment/visa.jpg')} alt="visa" />
                    <img className='headerLogo' src={require('../../assets/payment/rupay.png')} alt="rupay" />
                    <img className='headerLogo' src={require('../../assets/payment/paypal.jpg')} alt="paypal" />
                    <img className='headerLogo' src={require('../../assets/payment/master.jpg')} alt="master" />
                    <img className='headerLogo' src={require('../../assets/payment/maestro.jpg')} alt="maestro" />
                </Box>
                <Box className='develop footerCol'>
                    <Typography>Development By : Asria Ideas</Typography>
                </Box>
            </Box>
        </Container>
    </Box>
  )
}
