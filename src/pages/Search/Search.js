import React from 'react';
import Header from '../../components/header';
import { Container,IconButton, Box, Typography,Button, Grid } from '@mui/material';
import { FormControlLabel, RadioGroup, Radio} from '@mui/material';
import './styles.css';

export default function Search() {
    const [fareType, setFareType] = React.useState('regular');


    const changeFareType = (event) => {
      setFareType(event.target.value);
    };


  return (
      <div className='searchPage'>
        <Header headerDark={false} />
        <Container  maxWidth="lg" className='container'>
            <Box className="contentWrapper" component={'div'}>
                <Box  component="form" className='inputWrapper'>
                    <div className='bookingStripe_search'>
                        <div className='tripType booking_input'>
                            <Typography component="span" className='label'>Trip Type</Typography>
                            <Typography className='placefrom inputTitle'>One-Way</Typography>
                        </div>
                        <div className='inputFrom booking_input'>
                            <Typography component="span" className='label'>From</Typography>
                            <Typography className='placefrom inputTitle'>Coimbatore (CJB)</Typography>
                        </div>
                        
                        <div className='shiftfld'>
                            <IconButton aria-label="fingerprint" className='shiftbtn' color="secondary">
                            <img src={require('../../assets/icons/shiftarow.png')} alt={'Shift'} />
                            </IconButton>
                        </div>

                        <div className='inputFrom booking_input'>
                            <Typography component="span" className='label'>To</Typography>
                            <Typography className='placeto inputTitle'>Bengaluru (BLR)</Typography>
                        </div>

                        <div className='departure booking_input'>
                            <Typography component="span" className='label'>Departure</Typography>
                            <Typography className='placeto inputTitle'>6 May 22</Typography>
                        </div>

                        <div className='return booking_input'>
                            <Typography component="span" className='label'>Return</Typography>
                            <Typography className='placeto inputTitle'>8 May 222</Typography>
                        </div>

                        <div className='traverler booking_input'>
                            <Typography component="span" className='label'>Travellers & Class</Typography>
                            <Box component={'div'} sx={{ display : 'flex', columnGap : 1, alignItems : 'center' }}>
                                <Typography className='placeto inputTitle'>1 Adult</Typography>
                                <Typography className='inputTagline'>Economy</Typography>
                            </Box>
                        </div>
                        <div className='UpdateButtonGrp'>
                            <Button variant='contained'>Update Search</Button>
                        </div>
                    </div> 

                    <div className='fareType' style={{ display : 'flex', alignItems : 'center', columnGap : 20, marginTop : 20 }}>
                        <Typography style={{ color: '#fff', fontSize : 11 }}>Select A Fare Type : </Typography>
                        <RadioGroup row className="faretype_radio" 
                            value={fareType}
                            onChange={changeFareType} >
                            <FormControlLabel value="regular" control={<Radio sx={{ 
                                '& .MuiSvgIcon-root': {
                                fontSize: 15,
                                },
                                color: "#99999a",
                                '&.Mui-checked': {
                                color: "#f59625",
                                }, }}/>} label="Regular" />
                            <FormControlLabel value="armedforce" control={<Radio sx={{ 
                                '& .MuiSvgIcon-root': {
                                fontSize: 15,
                                },
                                color: "#99999a",
                                '&.Mui-checked': {
                                color: "#f59625",
                                }, }}/>} label="Armed Force" />
                            <FormControlLabel value="seniorcitizen" control={<Radio sx={{ 
                                '& .MuiSvgIcon-root': {
                                fontSize: 15,
                                },
                                color: "#99999a",
                                '&.Mui-checked': {
                                color: "#f59625",
                                }, }}/>} label="Senior Citizen" />
                            <FormControlLabel value="student" control={<Radio sx={{ 
                                '& .MuiSvgIcon-root': {
                                fontSize: 15,
                                },
                                color: "#99999a",
                                '&.Mui-checked': {
                                color: "#f59625",
                                }, }}/>} label="Student" />
                        </RadioGroup>
                    </div>
                </Box>


                <Grid container className='booking_row' spacing={4}> 
                    <Grid item md={3}>
                        <Box className='sidemenu'>
                            <Typography className='mainTitle'>Popular Filters</Typography>
                        </Box>
                    </Grid>
                    <Grid item  md={9} className="booking_col">
                        <Typography className='bookingCol_title'>Flights from Chandigarh to Chennai, and back</Typography>

                        <Box component={'div'} className='mainBookingrow'>
                            <Grid container>
                                <Grid item md={5}>
                                    <Typography className='depart_place'> Departure <span>.</span> Indigo  </Typography>
                                    <Box component={'div'} className="flight_timerow">
                                        <Box className='time'>
                                            <div className='icons'></div>
                                            <Typography className='start_time timeText'>07:10  </Typography>
                                            <Typography className='end_time timeText'>08:10</Typography>
                                        </Box>
                                        <Box className='price'>
                                            $ 6000
                                        </Box>
                                    </Box>
                                    <Typography className='details_text'> Flight Details </Typography>
                                </Grid>
                                <Grid item md={4} >
                                    <Typography className='retun_place'> Return <span>.</span> Indigo  </Typography>
                                    <Box component={'div'} className="flight_timerow">
                                        <Box className='time'>
                                            <div className='icons'></div>
                                            <Typography className='start_time timeText'>07:10 </Typography>
                                            <Typography className='end_time timeText'>08:10</Typography>
                                        </Box>
                                        <Box className='price'>
                                            $ 6000
                                        </Box>
                                    </Box>
                                    <Typography className='details_text'> Flight Details </Typography>
                                </Grid>
                                <Grid item md={3} >
                                    <Typography className='total_price'>$ 12,490</Typography>
                                    <Typography className='details_text'>Fare Details</Typography>
                                    <Button variant='contained' className='color_primary'>Book Now</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
      </div>
  )
}
