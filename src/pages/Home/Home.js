import React from 'react'
import Header from '../../components/header';
import { Container, Toolbar, IconButton, Box, Typography, AppBar, MenuItem, Menu, Button, Grid } from '@mui/material';
import { FormControl, FormControlLabel, RadioGroup, Radio, FormLabel, TextField  } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './style.css';  
import Footer from '../../components/Footer/Footer';
 
export default function Home() {
  const [tripOpt, setTripOpt] = React.useState("oneway");
  const [preferedAirline, setPreferedAirline] = React.useState('none');
  const [fareType, setFareType] = React.useState('regular');

  const colorsRadio = {
    color: "#99999a",
    '&.Mui-checked': {
      color: "#f59625",
    },
  }

  const handleRadioChange = (event)=> {
    setTripOpt(event.target.value);
    console.log(tripOpt);
  } 

  const handleChange = (event) => {
    setPreferedAirline(event.target.value);
  };

  const changeFareType = (event) => {
    setFareType(event.target.value);
  };

  return (
    <div>
      <Header  headerDark={true}  />
      <div className='bannerBg'  >
        <div className='bannerInner'>
          <Container maxWidth="lg" className='bannerrow'> 
            <Typography className='title' style={{ textAlign : 'center', color : '#fff', fontSize : 30, marginBottom: 20 }}>Best Deals for Flight Booking in mytrippe</Typography>
          
            <Box className='bookingSlot'>
              <RadioGroup className='tripselect_option'
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={tripOpt}
                  onChange={handleRadioChange} >
                  <FormControlLabel value="oneway" control={<Radio sx={{ 
                    color: "#99999a",
                    '&.Mui-checked': {
                      color: "#f59625",
                    }, }}/>} label="One Way" />
                  <FormControlLabel value="rondtrip" control={<Radio sx={{ 
                    color: "#99999a",
                    '&.Mui-checked': {
                      color: "#f59625",
                    }, }}/>} label="Round Trip" />
                  <FormControlLabel value="multicity" control={<Radio sx={{ 
                    color: "#99999a",
                    '&.Mui-checked': {
                      color: "#f59625",
                    }, }}/>} label="Multi City" />
                </RadioGroup>

                <Box  component="form" className='inputWrapper'>
                  <div className='bookingStripe'>
                    <div className='inputFrom booking_input'>
                        <img src={require('../../assets/icons/flight.png')} className='flight_icon' />
                        <Typography component="span" className='label'>From</Typography>
                        <Typography className='placefrom inputTitle'>Coimbatore (CJB)</Typography>
                        <Typography className='inputTagline'>CJB, Coimbatore Airport</Typography>
                    </div>
                    
                    <div className='shiftfld'>
                      <IconButton aria-label="fingerprint" className='shiftbtn' color="secondary">
                        <img src={require('../../assets/icons/shiftarow.png')}  />
                      </IconButton>
                    </div>

                    <div className='inputFrom booking_input'>
                        <img src={require('../../assets/icons/flight.png')} className='flight_icon down' />
                        <Typography component="span" className='label'>To</Typography>
                        <Typography className='placeto inputTitle'>Bengaluru (BLR)</Typography>
                        <Typography className='inputTagline'>BLR, Bangaluru International Airport</Typography>
                    </div>

                    <div className='departure booking_input'>
                        <Typography component="span" className='label'>Departure</Typography>
                        <Typography className='placeto inputTitle'>6 May 22</Typography>
                        <Typography className='inputTagline'>Friday</Typography>
                    </div>

                    <div className='return booking_input'>
                        <Typography component="span" className='label'>Return</Typography>
                        <Typography className='placeto inputTitle'>8 May 222</Typography>
                        <Typography className='inputTagline'>Sunday</Typography>
                    </div>

                    <div className='traverler booking_input'>
                        <Typography component="span" className='label'>Travellers & Class</Typography>
                        <Typography className='placeto inputTitle'>1 Adult</Typography>
                        <Typography className='inputTagline'>Economy</Typography>
                    </div>
                  </div> 

                  {/* fare type and prefered row */}
                  <Box className='preferedStripe'>
                    <div className='leftBox' style={{ display : 'flex', flexDirection : 'row', alignItems: 'center' }}>
                      <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard" className='prefred_select'>
                        <Select
                          labelId="demo-simple-select-error-label"
                          id="demo-simple-select-error"
                          value={preferedAirline}
                          onChange={handleChange}
                        >
                          <MenuItem value={"none"}> Select Prefered Airline </MenuItem>
                          <MenuItem value={"ac"}>Ac</MenuItem>
                          <MenuItem value={"nonac"}>Non Ac</MenuItem>
                          <MenuItem value={"sleeper"}>Sleeper</MenuItem>
                        </Select>
                      </FormControl>
                      <RadioGroup row value={"directflight"}>
                        <FormControlLabel value="directflight" control={<Radio sx={{ 
                            '& .MuiSvgIcon-root': {
                              fontSize: 15,
                            },
                            color: "#99999a",
                            '&.Mui-checked': {
                              color: "#f59625",
                            }, }}/>} label="Direct Flight" />
                      </RadioGroup>
                    </div>  

                    <div className='rightBox'>
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
                  {/* END fare type and prefered row */}


                  {/* recent searches */}
                  <Box className='recentSearchrow'> 
                      <Typography className='label'>Recent Searches : </Typography> 

                      <div className='searchItem'>
                        <div className='textRow'>
                          <Typography component={"span"}>Coimbatore</Typography>
                          <img style={{ width  : 18, marginLeft: 5, marginRight : 5 }} src={require('../../assets/icons/shiftarow.png')} className='arrowicon'/>
                          <Typography component={"span"}>Bangaluru</Typography>
                        </div>
                        <Typography className='date'>6 May 22 - 8 May 22</Typography>
                      </div>

                      <div className='searchItem'>
                        <div className='textRow'>
                          <Typography component={"span"}>Bangaluru </Typography>
                          <img style={{ width  : 18, marginLeft: 2, marginRight : 2 }} src={require('../../assets/icons/shiftarow.png')} className='arrowicon'/>
                          <Typography component={"span"}>Coimbatore</Typography>
                        </div>
                        <Typography className='date'>6 May 22 - 8 May 22</Typography>
                      </div>

                      <div className='searchItem'>
                        <div className='textRow'>
                          <Typography component={"span"}>Coimbatore</Typography>
                          <img style={{ width  : 18, marginLeft: 2, marginRight : 2 }} src={require('../../assets/icons/shiftarow.png')} className='arrowicon'/>
                          <Typography component={"span"}>Bangaluru</Typography>
                        </div>
                        <Typography className='date'>6 May 22 - 8 May 22</Typography>
                      </div>

                      <div className='searchItem'>
                        <div className='textRow'>
                          <Typography component={"span"}>Coimbatore</Typography>
                          <img style={{ width  : 18, marginLeft: 2, marginRight : 2 }} src={require('../../assets/icons/shiftarow.png')} className='arrowicon'/>
                          <Typography component={"span"}>Bangaluru</Typography>
                        </div>
                        <Typography className='date'>6 May 22 - 8 May 22</Typography>
                      </div>

                      <div className='searchItem'>
                        <div className='textRow'>
                          <Typography component={"span"}>Coimbatore</Typography>
                          <img style={{ width  : 18, marginLeft: 2, marginRight : 2 }} src={require('../../assets/icons/shiftarow.png')} className='arrowicon'/>
                          <Typography component={"span"}>Bangaluru</Typography>
                        </div>
                        <Typography className='date'>6 May 22 - 8 May 22</Typography>
                      </div>
                  </Box>
                  {/* END recent searches */}
                </Box>

                <Box className='boxAction'> 
                  <Button className='searchButton' variant='contained'>Search Flights</Button>
                </Box>
            </Box>
          </Container>
        </div>
      </div>


      {/* background empty */}
      <Box className='emptyBoxBanner'>

      </Box>

      <Box className='discountSection'>
          <Container >
            <Typography className='discount_title'>Flight Discounts For You</Typography>
            <Grid container spacing={2} direction="row">
              <Grid item  className="discount_card">
                <Box className='card_inner'>
                  <Box component={'div'} className={'logo'}></Box>
                    <Typography className='discount_cont'>Grab flat 15% on domestic flights</Typography>
                    <Typography className='subtitle'>Grab flat 15% on domestic flights</Typography>
                    <Button className='promoCodeBtn' fullWidth={true}>Use Code: <Typography className='promoCode'>mmmtaxmex</Typography></Button>
                </Box>
              </Grid>
              <Grid item  className="discount_card">
                <Box className='card_inner'>
                  <Box component={'div'} className={'logo'}></Box>
                    <Typography className='discount_cont'>Grab flat 15% on domestic flights</Typography>
                    <Typography className='subtitle'>Grab flat 15% on domestic flights</Typography>
                    <Button className='promoCodeBtn'>Use Code: <Typography className='promoCode'>mmmtaxmex</Typography></Button>
                </Box>
              </Grid>
              <Grid item  className="discount_card">
                <Box className='card_inner'>
                  <Box component={'div'} className={'logo'}></Box>
                    <Typography className='discount_cont'>Grab flat 15% on domestic flights</Typography>
                    <Typography className='subtitle'>Grab flat 15% on domestic flights</Typography>
                    <Button className='promoCodeBtn'>Use Code: <Typography className='promoCode'>mmmtaxmex</Typography></Button>
                </Box>
              </Grid>
              <Grid item  className="discount_card">
                <Box className='card_inner'>
                  <Box component={'div'} className={'logo'}></Box>
                    <Typography className='discount_cont'>Grab flat 15% on domestic flights</Typography>
                    <Typography className='subtitle'>Grab flat 15% on domestic flights</Typography>
                    <Button className='promoCodeBtn'>Use Code: <Typography className='promoCode'>mmmtaxmex</Typography></Button>
                </Box>
              </Grid>
              <Grid item  className="discount_card add_discount">
                <Box className='card_inner'> 
                    <Typography className='offersCount'>+ 20</Typography>
                    <Typography className='moreoffer'>More Offers</Typography> 
                </Box>
              </Grid>
            </Grid>
          </Container>
      </Box>


      <Box className='contentSection'>
          <Container>
            <Typography style={{ textTransform : 'uppercase' }} className='title' component={'div'}>Product Offering</Typography>
            <Typography className=''>Flights, International Flights, Charter Flights, Hotels, International Hotels, Homestays and Villas, Activities, Holidays In India, International Holidays, Book Hotels From UAE, myBiz for SME Travel, Book Flights
From US, Book Flights From UAE, Trip Planner, Gift Cards, Trip Money, Trip Ideas, Travel Blog.</Typography>
            
            <Box className='faqSection'>
              <Typography className='title' component={'div'}>Q. FAQs on Online Flight Booking</Typography>
              <Typography className='subitle'>Q. How can I book a cheap flight on mytrippe?</Typography>
              <Typography >A: Head to Yatra’s Flights section and choose whether it is a one-way, round-trip or multi-city trip. Enter your departure city and arrival city, followed by the date of travel, return date in case relevant, number
of passengers and select your chosen class of travel, and then search flights. In the subsequent page you will be able to see all flights for your dates. In the filter panel on top, you can adjust the price bar
and apply filters. The following page will give you flights that fall within your budget across airlines. Check the tariff, compare schedule and zero in on the one you would like to book. Choose from economy
and best value fare, with the best value fare letting you make free cancellation. Click the fare you prefer and book it. Further, enter the passenger details, and land on the payment gateway to make the
payment. When the payment is successful, your e-ticket is sent to your registered email id by the Yatra team.</Typography>

              <Typography className='subitle'>Q. How can I book a cheap flight on mytrippe?</Typography>
              <Typography >A: In light of the pandemic, the government has made it mandatory to do your web check-in ahead of arriving at the airport to catch your flight, for both domestic and international. This is to minimise contact,
and propagate safer travels. To do your web check-in you can head to the airline’s web check-in page, enter the booking reference number, date of travel and begin the check-in process. Enter the passenger
names you would like to check-in. Select the seats from the seat map. Once the seats are allocated to you, you can save the summary in your mailbox or take a print-out of the same.</Typography>
              
              <Typography className='subitle'>Q. Is it mandatory to show an RT-PCR report at the airport before flying?</Typography>
              <Typography >A: For both domestic and international travels, it is mandatory to do an RT-PCR test typically 48 hours ahead of your flight’s scheduled departure. You need to furnish the negative report at the origin airport
ahead of boarding your flight. For various international destinations, you would have to submit the RT-PCR report complete with a QR code. All reports need to be signed and stamped by an ICMR-approved
laboratory.</Typography>

              <Typography className='subitle'>Q. How can I claim a flight refund on mytrippe?</Typography>
              <Typography >A: There are two conditions to claim a refund. First, if the airline directly cancels the flight, and second, if the passenger has cancelled his flight directly with the airline. If the airline cancels the flight you can
claim a full refund. But if the passenger cancels the flight on his own, then airline and Yatra will both charge the same amount of penalty. The refund claiming process is fairly simple. Sign in and head to the
My Bookings page and in the dashboard you can select the claim refund option. Click on claim refund and check the flight for which you wish to claim refund. Further, select the reason for your claim. Go
through the refund details, and click ‘submit’. You can even claim refund for just one passenger among a set of passengers. Just select the passenger details, the sector, and cancel the ticket.</Typography>
            </Box>
          </Container>
      </Box>


      <Footer />
    </div>
  )
}
