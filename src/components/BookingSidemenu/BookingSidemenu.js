import React, { memo } from 'react' 
// import { useNavigate } from "react-router-dom";
import { TextField, Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox, FormControl, IconButton } from '@mui/material';
import { Add, Close, Check } from '@mui/icons-material';
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
                {'14,000'}
              </Box>
            </Box>
            <Box className='listitem'>
              <Box className='farelabel'>
                <Add className='iconplus'/>  {'Fees & Subcharges'}
              </Box>
              <Box className='fareprice'>
                {'1,857'}
              </Box>
            </Box>
            <Box className='listitem bsolid' style={{ borderBottomStyle : 'solid' }}>
              <Box className='farelabel' style={{ fontWeight : '600' }}>
                 {'Total Amount'}
              </Box>
              <Box className='fareprice'  style={{ fontWeight : '600' }}>
                {'16,407'}
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
