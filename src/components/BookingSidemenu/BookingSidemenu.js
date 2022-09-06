import React, { memo , useContext } from 'react' 
// import { useNavigate } from "react-router-dom";
import { TextField, Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox, FormControl, IconButton } from '@mui/material';
import { Add, Close, Check } from '@mui/icons-material';
import TripinfoContext from "../../pages/BookingSteps/context"

import "./style.css";

let promoList = [
  {
    title : 'MMTSUPER',
    description : 'Congratulations! Promo Discount of Rs. 450 applied successfully.',
    terms : '',
    color : '#25465a',
  },
  {
    title : 'FLYMON',
    description : 'Congratulations! Promo Discount of Rs. 600 applied successfully.',
    terms : '',
    color : '#29afa0'
  },
  {
    title : 'FIRSTFLIGHT',
    description : 'Congratulations! Promo Discount of Rs. 1050 applied successfully.',
    terms : '',
    color : '#85868a'
  },
  {
    title : 'TRIP3',
    description : 'Congratulations! Promo Discount of Rs. 850 applied successfully.',
    terms : '',
    color : '#a12564'
  }
]

export default function BookingSidemenu() {

  const things = useContext(TripinfoContext)
  const [ fare , setFare ] = React.useState(things?.totalPriceInfo)

  console.log(things?.totalPriceInfo);


  return (
    <Box className='sidemenu booking'>
      <Box className='sidemenu_wrapper'>
        <Typography className='stitle'>{'Fare Summary'}</Typography>
        <Box className='faredetails'>
            <Box className='listitem'>
              <Box className='farelabel'>
                <Add className='iconplus'/>  {'Base Fare'}
              </Box>
              <Box className='fareprice'>
              ₹{ (fare?.totalFareDetail?.fC?.BF).toLocaleString() }
              </Box>
            </Box>
            <Box className='listitem'>
              <Box className='farelabel'>
                <Add className='iconplus'/>  {'Fees & Subcharges'}
              </Box>
              <Box className='fareprice'>
              ₹{ (fare?.totalFareDetail?.fC?.TAF).toLocaleString('en', { minimumFractionDigits: 2 }) }
              </Box>

            </Box>

           

            <Box>
                <Box style={{ display : 'flex',justifyContent:'space-between'}}>
                  <Typography className="tct">Airline GST</Typography>
                  <Typography className="tct">₹{ (fare?.totalFareDetail?.afC?.TAF?.AGST).toLocaleString('en', { minimumFractionDigits: 2 }) }</Typography>
                </Box>
                <Box style={{ display : 'flex',justifyContent:'space-between'}}>
                  <Typography className="tct">Management Fee</Typography>
                  <Typography className="tct">₹{ (fare?.totalFareDetail?.afC?.TAF?.MF).toLocaleString('en', { minimumFractionDigits: 2 }) }</Typography>
                </Box>
                <Box style={{ display : 'flex',justifyContent:'space-between'}}>
                  <Typography className="tct">Management Fee Tax</Typography>
                  <Typography className="tct">₹{ (fare?.totalFareDetail?.afC?.TAF?.MFT).toLocaleString('en', { minimumFractionDigits: 2 }) }</Typography>
                </Box>
                <Box style={{ display : 'flex',justifyContent:'space-between'}}>
                  <Typography className="tct">Other Taxes</Typography>
                  <Typography className="tct">₹{ (fare?.totalFareDetail?.afC?.TAF?.OT).toLocaleString('en', { minimumFractionDigits: 2 }) }</Typography>
                </Box>


              { fare?.totalFareDetail?.afC?.TAF?.YR && 
               <Box style={{ display : 'flex',justifyContent:'space-between'}}>
               <Typography className="tct">YR</Typography>
               <Typography className="tct">₹{ (fare?.totalFareDetail?.afC?.TAF?.YR).toLocaleString('en', { minimumFractionDigits: 2 }) }</Typography>
             </Box>

              }

              { fare?.totalFareDetail?.afC?.TAF?.YQ && 
               <Box style={{ display : 'flex',justifyContent:'space-between'}}>
               <Typography className="tct">YQ</Typography>
               <Typography className="tct">₹{ (fare?.totalFareDetail?.afC?.TAF?.YQ).toLocaleString('en', { minimumFractionDigits: 2 }) }</Typography>
             </Box>

              }
            </Box>

            <Box className='listitem bsolid' style={{ borderBottomStyle : 'solid' }}>
              <Box className='farelabel' style={{ fontWeight : '600' }}>
                 {'Total Amount'}
              </Box>
              <Box className='fareprice'  style={{ fontWeight : '600' }}>
              ₹{ (fare?.totalFareDetail?.fC?.TF).toLocaleString('en', { minimumFractionDigits: 2 }) } 
              </Box>
            </Box>
        </Box>

        <Typography className='stitle ucase' style={{ marginTop : 20 }}>{'Promo codes'}</Typography> 
        <FormControl className='promocodeinput' sx={{ width : '100%' }}>
            <TextField size='small' className='fullwidth' id="promocode" value={''} placeholder="Enter your Mobile Number" variant="outlined" sx={{
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

        <Box className='promo_cards'>
          { promoList && promoList.map(list => (
            <Box className='promo_item' style={{ backgroundColor : list.color }}>
              <Box className='actionButton'>
                <IconButton size='small' className='check'><Check /></IconButton>
                <IconButton size='small' className='delete'><Close /></IconButton>
              </Box>
              <Typography className='ptitle'>{ list.title }</Typography>
              <Typography className='pdescp'>{ list.description }</Typography>
              <Typography className='terms'>{ 'Terms & Conditions' }</Typography>
            </Box>
          )) }
        </Box>    
      </Box>
    </Box>
  )
}
