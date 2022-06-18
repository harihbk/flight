import React from 'react'
import { IconButton, Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const primaryColor = '#f55a2a';
const grayColor = '#7e7e7e';

const filterTitle = {
    fontWeight: 500, 
    marginBottom : 5,
}
const filterSubTitle = {
    fontWeight: 300, 
    marginBottom : 5,
    fontSize: 14
}

export default function Searchmenuskeleton() {
  return (

    <Box className='sidemenu'>
    <Typography className='mainTitle'>Popular Filters</Typography>
    <Box className='price_slider'>
        <Typography component={'div'} className='' style={filterTitle}>{'One Way Price'}</Typography>
        <Skeleton count={1} /> 

    </Box>

    <Box className='filterType2 filter filterRow border'>
        <Typography component={'div'} className='' style={filterTitle}>{'Onward Journey'}</Typography>
           <Skeleton count={5} /> 
    </Box>

    <Box className='filterType2 filter filterRow border'>
        <Typography component={'div'} className='' style={filterTitle}>{'Depature'}</Typography>
           <Skeleton count={2} /> 
    </Box>

    <Box className='filterType2 filter filterRow border'>
        <Typography component={'div'} className='' style={filterTitle}>{'Arival'}</Typography>
           <Skeleton count={2} /> 
    </Box>

    <Box className='filterType2 filter filterRow border'>
        <Typography component={'div'} className='' style={filterTitle}>{'Airline'}</Typography>
           <Skeleton count={5} /> 
    </Box>
</Box>
  )
}
